"use client";

import * as React from "react";

import type { TPlaceholderElement } from "@udecode/plate-media";
import type { PlateElementProps } from "@udecode/plate/react";

import { PlateElement, useEditorPlugin, withHOC } from "@udecode/plate/react";
import { Loader2Icon } from "lucide-react";
import { useFilePicker } from "use-file-picker";

import AlertDialog from "@/app/member/components/AlertDialog";
import { IMAGE_MAX_SIZE } from "@/constants/imageSize";
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
        icon: <></>, // 아이콘 자체도 출력하지 않습니다.
    },
};

export const MediaPlaceholderElement = withHOC(
    PlaceholderProvider,
    function MediaPlaceholderElement(
        props: PlateElementProps<TPlaceholderElement>
    ) {
        const { editor, element } = props;
        const { api } = useEditorPlugin(PlaceholderPlugin);

        // ① useS3Upload 훅 (업로드 진행률, 완료 콜백 등)
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
        });

        const loading = isUploading && !!uploadingFile;
        const currentContent = CONTENT[element.mediaType];
        const isImage = element.mediaType === ImagePlugin.key;
        const imageRef = React.useRef<HTMLImageElement>(null);

        /**
         * ③ replaceCurrentPlaceholder
         *    “용량 검사 → 플레이스홀더 추가 → uploadFile 호출” 순으로 실행
         */
        const replaceCurrentPlaceholder = React.useCallback(
            (file: File) => {
                api.placeholder.addUploadingFile(element.id as string, file);
                void uploadFile(file);
            },
            [api.placeholder, element.id, uploadFile]
        );

        /**
         * ④ useFilePicker 설정
         *    - onFilesSelected 내부에서 용량 검사 후, 통과하면 replaceCurrentPlaceholder 호출
         *    - 용량 검사 실패 시 해당 플레이스홀더 노드를 제거
         */
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

                // ⑤ 직접 용량 검사 (5MB 이하만 통과)
                const isImg = firstFile.type.startsWith("image/");
                if (isImg && firstFile.size > IMAGE_MAX_SIZE) {
                    alert(
                        "이미지 용량이 5MB를 초과했습니다.\n5MB 이하의 이미지만 업로드해주세요."
                    );

                    // 해당 플레이스홀더 노드를 제거
                    const path = editor.api.findPath(element);
                    editor.tf.removeNodes({ at: path });

                    clear(); // useFilePicker 내부 상태 초기화
                    return;
                }

                // 정상 용량인 경우 플레이스홀더 삽입
                replaceCurrentPlaceholder(firstFile);
            },

            onFilesDismissed: () => {
                // limitFilesConfig 단계(파일 dialog 레벨)에서 걸러질 때 경고
                alert(
                    "5MB 이하의 이미지 파일만 업로드할 수 있습니다.\n다시 선택해주세요."
                );

                // 혹시 남아있는 플레이스홀더 노드를 제거
                const path = editor.api.findPath(element);
                editor.tf.removeNodes({ at: path });

                clear();
            },
        });

        /**
         * ⑥ 업로드 완료 시, 플레이스홀더를 실제 이미지 노드로 교체
         */
        React.useEffect(() => {
            if (!uploadedFile) return;
            const path = editor.api.findPath(element);

            editor.tf.withoutSaving(() => {
                // 1) 플레이스홀더 노드 제거
                editor.tf.removeNodes({ at: path });

                // 2) 실제 이미지 노드 삽입
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

        /**
         * ⑦ React Strict Mode에서 effect가 두 번 실행되는 것을 방지
         */
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
                {/*
          (4) errorMessage가 있을 때, 최상단에 <Alert>를 렌더합니다.
          onClose 핸들러에서는 예시로 페이지를 리로드했지만,
          실제로는 훅에 ‘errorMessage 초기화 함수(clearError 등)’를 만들어
          호출하는 것이 더 깔끔합니다.
        */}
                {isError && errorMessage && (
                    <AlertDialog
                        open={!!errorMessage}
                        title="업로드 실패"
                        description={errorMessage}
                        onClose={() => setIsError(false)}
                    />
                )}

                {/* 이미지 업로드 중 미리보기 + 진행률 */}
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

                {/* 실제 placeholder / 미디어 노드를 렌더링 */}
                {props.children}
            </PlateElement>
        );
    }
);

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
