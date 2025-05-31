"use client";

import * as React from "react";

import type { TPlaceholderElement } from "@udecode/plate-media";
import type { PlateElementProps } from "@udecode/plate/react";

import { PlateElement, useEditorPlugin, withHOC } from "@udecode/plate/react";
import { ImageIcon, Loader2Icon } from "lucide-react";
import { useFilePicker } from "use-file-picker";

import { useS3Upload } from "@/hooks/useS3Upload";
import { cn } from "@/lib/utils";
import {
    FilePlugin,
    ImagePlugin,
    PlaceholderPlugin,
    PlaceholderProvider,
    updateUploadHistory,
} from "@udecode/plate-media/react";
import Image from "next/image";

const CONTENT: Record<
    string,
    {
        accept: string[];
        content: React.ReactNode;
        icon: React.ReactNode;
    }
> = {
    [ImagePlugin.key]: {
        accept: ["image/*"],
        content: "Add an image",
        icon: <ImageIcon />,
    },
};

export const MediaPlaceholderElement = withHOC(
    PlaceholderProvider,
    function MediaPlaceholderElement(
        props: PlateElementProps<TPlaceholderElement>
    ) {
        const { editor, element } = props;
        const { api } = useEditorPlugin(PlaceholderPlugin);

        // useS3Upload 훅 사용
        const {
            isUploading,
            progress,
            uploadedFile,
            uploadFile,
            uploadingFile,
        } = useS3Upload({
            onUploadError: (err) => {
                console.error("업로드 중 에러 발생:", err);
            },
        });

        const loading = isUploading && !!uploadingFile;
        const currentContent = CONTENT[element.mediaType];
        const isImage = element.mediaType === ImagePlugin.key;
        const imageRef = React.useRef<HTMLImageElement>(null);

        const { openFilePicker } = useFilePicker({
            accept: currentContent.accept,
            multiple: true,
            onFilesSelected: ({ plainFiles: updatedFiles }) => {
                const firstFile = updatedFiles[0];
                const restFiles = updatedFiles.slice(1);

                replaceCurrentPlaceholder(firstFile);
                if (restFiles.length > 0) {
                    editor
                        .getTransforms(PlaceholderPlugin)
                        .insert.media(restFiles);
                }
            },
        });

        // 플레이스홀더 자리에 파일을 업로드하고, 편집기 플레이스홀더 API에도 등록
        const replaceCurrentPlaceholder = React.useCallback(
            (file: File) => {
                void uploadFile(file);
                api.placeholder.addUploadingFile(element.id as string, file);
            },
            [api.placeholder, element.id, uploadFile]
        );

        // 업로드가 완료되면, placeholder 노드를 실제 이미지/미디어 노드로 교체
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

        // React Strict Mode에서 effect가 두 번 실행되는 것을 방지
        const isReplaced = React.useRef(false);
        React.useEffect(() => {
            if (isReplaced.current) return;
            isReplaced.current = true;

            const currentFiles = api.placeholder.getUploadingFile(
                element.id as string
            );
            if (!currentFiles) return;
            replaceCurrentPlaceholder(currentFiles);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isReplaced]);

        return (
            <PlateElement className="my-1" {...props}>
                {/* “파일 선택” UI */}
                {(!loading || !isImage) && (
                    <div
                        className={cn(
                            "bg-muted hover:bg-primary/10 flex cursor-pointer items-center rounded-sm p-3 pr-9 select-none"
                        )}
                        onClick={() => !loading && openFilePicker()}
                        contentEditable={false}
                    >
                        <div className="text-muted-foreground/80 relative mr-3 flex [&_svg]:size-6">
                            {currentContent.icon}
                        </div>
                        <div className="text-muted-foreground text-sm whitespace-nowrap">
                            <div>
                                {loading
                                    ? uploadingFile?.name
                                    : currentContent.content}
                            </div>
                            {/* 이미지가 아닌 파일(MediaPlugin.key != ImagePlugin.key)인 경우, 진행률을 표시 */}
                            {loading && !isImage && (
                                <div className="mt-1 flex items-center gap-1.5">
                                    <div>
                                        {formatBytes(uploadingFile?.size ?? 0)}
                                    </div>
                                    <div>–</div>
                                    <div className="flex items-center">
                                        <Loader2Icon className="text-muted-foreground mr-1 size-3.5 animate-spin" />
                                        {progress ?? 0}%
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 이미지 업로드 중에 미리보기 + 진행률 표시 */}
                {isImage && loading && (
                    <ImageProgress
                        file={uploadingFile!}
                        imageRef={imageRef}
                        progress={progress}
                    />
                )}

                {/* 실제 placeholder / 미디어 노드를 렌더링 */}
                {props.children}
            </PlateElement>
        );
    }
);

export function ImageProgress({
    className,
    file,
    imageRef,
    progress = 0,
}: {
    file: File;
    className?: string;
    imageRef?: React.RefObject<HTMLImageElement | null>;
    progress?: number;
}) {
    const [objectUrl, setObjectUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        const url = URL.createObjectURL(file);
        setObjectUrl(url);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    if (!objectUrl) return null;
    return (
        <div className={cn("relative", className)} contentEditable={false}>
            <Image
                ref={imageRef}
                className="h-auto w-full rounded-sm object-cover"
                alt={file.name}
                src={objectUrl}
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
    );
}

export function formatBytes(
    bytes: number,
    opts: { decimals?: number; sizeType?: "accurate" | "normal" } = {}
) {
    const { decimals = 0, sizeType = "normal" } = opts;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];

    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
        sizeType === "accurate" ? accurateSizes[i] : sizes[i]
    }`;
}
