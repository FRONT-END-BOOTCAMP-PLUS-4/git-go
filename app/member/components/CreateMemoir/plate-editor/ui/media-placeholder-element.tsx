import AlertDialog from "@/app/member/components/AlertDialog";
import { IMAGE_MAX_SIZE } from "@/constants/imageSize";
import { useS3Upload } from "@/hooks/useS3Upload";
import { cn } from "@/lib/utils";
import type { TPlaceholderElement } from "@udecode/plate-media";
import {
    FilePlugin,
    ImagePlugin,
    PlaceholderPlugin,
    PlaceholderProvider,
    updateUploadHistory,
} from "@udecode/plate-media/react";
import type { PlateElementProps } from "@udecode/plate/react";
import { PlateElement, useEditorPlugin, withHOC } from "@udecode/plate/react";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useFilePicker } from "use-file-picker";

const CONTENT = {
    [ImagePlugin.key]: {
        accept: ["image/*"],
        content: "Add an image",
        icon: <></>,
    },
};

export const MediaPlaceholderElement = withHOC(
    PlaceholderProvider,
    function MediaPlaceholderElement(
        props: PlateElementProps<TPlaceholderElement>
    ) {
        const { editor, element } = props;
        const { api } = useEditorPlugin(PlaceholderPlugin);

        // 여기에 DEMO MODE 여부 추가
        // 예시: url이 'demo'이거나, 별도 환경변수, prop 등
        // 아래는 간단히 element.url === "demo"인 경우로 처리
        // 실제론 prop/setting/context 등에서 받아서 전달하는 것이 베스트
        const isDemoMode =
            typeof window !== "undefined" &&
            window.location.pathname.startsWith("/demo");

        // 훅에 DEMO MODE 전달
        const {
            isUploading,
            progress,
            uploadedFile,
            uploadFile,
            uploadingFile,
            errorMessage,
            isError,
            setIsError,
        } = useS3Upload({
            onUploadError: (err) => {
                console.error("업로드 중 에러 발생:", err);
            },
            uploadMode: isDemoMode ? "demo" : "s3",
        });

        const loading = isUploading && !!uploadingFile;
        const currentContent =
            CONTENT[element.mediaType as keyof typeof CONTENT];
        const isImage = element.mediaType === ImagePlugin.key;
        const imageRef = React.useRef<HTMLImageElement>(null);

        const replaceCurrentPlaceholder = React.useCallback(
            (file: File) => {
                api.placeholder.addUploadingFile(element.id as string, file);
                void uploadFile(file);
            },
            [api.placeholder, element.id, uploadFile]
        );

        const { clear } = useFilePicker({
            accept: currentContent.accept,
            multiple: false,
            limitFilesConfig: {
                maxSize: IMAGE_MAX_SIZE,
                maxNumberOfFiles: 1,
            },
            onFilesSelected: ({ plainFiles: updatedFiles }) => {
                const firstFile = updatedFiles[0];
                if (!firstFile) {
                    return;
                }
                const isImg = firstFile.type.startsWith("image/");
                if (isImg && firstFile.size > IMAGE_MAX_SIZE) {
                    alert(
                        "이미지 용량이 4MB를 초과했습니다.\n4MB 이하의 이미지만 업로드해주세요."
                    );
                    const path = editor.api.findPath(element);
                    editor.tf.removeNodes({ at: path });
                    clear();
                    return;
                }
                replaceCurrentPlaceholder(firstFile);
            },
            onFilesDismissed: () => {
                alert(
                    "4MB 이하의 이미지 파일만 업로드할 수 있습니다.\n다시 선택해주세요."
                );
                const path = editor.api.findPath(element);
                editor.tf.removeNodes({ at: path });
                clear();
            },
        });

        React.useEffect(() => {
            if (!uploadedFile) return;
            const path = editor.api.findPath(element);
            editor.tf.withoutSaving(() => {
                editor.tf.removeNodes({ at: path });
                const node = {
                    children: [{ text: "" }],
                    initialHeight: imageRef.current?.height,
                    initialWidth: imageRef.current?.width,
                    isUpload: true,
                    name:
                        element.mediaType === FilePlugin.key
                            ? uploadedFile.name
                            : "",
                    placeholderId: element.id as string,
                    type: element.mediaType!,
                    url: uploadedFile.url,
                };
                editor.tf.insertNodes(node, { at: path });
                updateUploadHistory(editor, node);
            });
            api.placeholder.removeUploadingFile(element.id as string);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [uploadedFile, element.id]);

        const isReplaced = React.useRef(false);
        React.useEffect(() => {
            if (isReplaced.current) return;
            isReplaced.current = true;
            const currentFiles = api.placeholder.getUploadingFile(
                element.id as string
            );
            if (!currentFiles) return;
            replaceCurrentPlaceholder(currentFiles as File);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isReplaced]);

        return (
            <PlateElement className="my-1" {...props}>
                {isError && errorMessage && (
                    <AlertDialog
                        open={!!errorMessage}
                        title="업로드 실패"
                        description={errorMessage}
                        onClose={() => setIsError(false)}
                    />
                )}
                {isImage && loading && (
                    <div className={cn("relative")} contentEditable={false}>
                        <Image
                            ref={imageRef}
                            className="h-auto w-full rounded-sm object-cover"
                            alt={uploadingFile?.name ?? ""}
                            src={URL.createObjectURL(uploadingFile!)}
                            fill
                        />
                        {progress < 100 && (
                            <div className="absolute right-1 bottom-1 flex items-center space-x-2 rounded-full bg-black/50 px-1 py-0.5">
                                <Loader2Icon className="text-muted-foreground size-3.5 animate-spin" />
                                <span className="text-xs font-medium text-white">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                        )}
                    </div>
                )}
                {props.children}
            </PlateElement>
        );
    }
);
