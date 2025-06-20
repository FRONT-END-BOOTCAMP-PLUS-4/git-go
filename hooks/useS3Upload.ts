import { IMAGE_MAX_SIZE } from "@/constants/imageSize";
import { useState } from "react";

export function useS3Upload({
    onUploadComplete,
    onUploadError,
    onUploadProgress,
    uploadMode = "s3", // <== 's3' | 'demo'
}: {
    onUploadComplete?: (f: {
        key: string;
        url: string;
        name: string;
        size: number;
        type: string;
    }) => void;
    onUploadError?: (e: unknown) => void;
    onUploadProgress?: (p: { progress: number }) => void;
    uploadMode?: "s3" | "demo";
} = {}) {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState<{
        key: string;
        url: string;
        name: string;
        size: number;
        type: string;
    } | null>(null);
    const [uploadingFile, setUploadingFile] = useState<File | null>(null);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function uploadFile(file: File) {
        const isImage = file.type.startsWith("image/");

        if (isImage && file.size > IMAGE_MAX_SIZE) {
            setErrorMessage("이미지는 4MB 이하만 업로드할 수 있습니다.");
            setIsError(true);
            return;
        }

        setIsUploading(true);
        setUploadingFile(file);

        try {
            // 1. demo 분기 (S3 업로드 X)
            if (uploadMode === "demo") {
                const blobUrl = URL.createObjectURL(file);
                const fakeResult = {
                    key: "",
                    url: blobUrl, // blob url만 반환
                    name: file.name,
                    size: file.size,
                    type: file.type,
                };
                setUploadedFile(fakeResult);
                onUploadComplete?.(fakeResult);
                return fakeResult;
            }

            // 2. 실제 S3 업로드 (원래 코드)
            const result = await putWithProgressToApi(file);
            setUploadedFile(result);
            onUploadComplete?.(result);
            return result;
        } catch (error) {
            onUploadError?.(error);
            setIsError(true);
            throw error;
        } finally {
            setIsUploading(false);
            setProgress(0);
            setUploadingFile(null);
        }
    }

    function putWithProgressToApi(file: File) {
        return new Promise<{
            key: string;
            url: string;
            name: string;
            size: number;
            type: string;
        }>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/upload");
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const p = (e.loaded / e.total) * 100;
                    setProgress(p);
                    onUploadProgress?.({ progress: p });
                }
            };
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = JSON.parse(xhr.responseText) as {
                            urls: string[];
                        };
                        if (!data.urls || data.urls.length === 0) {
                            throw new Error("유효한 URL을 받지 못했습니다.");
                        }
                        const fullUrl = data.urls[0];
                        const pathname = new URL(fullUrl).pathname;
                        const key = pathname.startsWith("/")
                            ? pathname.slice(1)
                            : pathname;

                        resolve({
                            key,
                            url: fullUrl,
                            name: file.name,
                            size: file.size,
                            type: file.type,
                        });
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject(new Error(`업로드 실패: ${xhr.status}`));
                }
            };
            xhr.onerror = () => reject(new Error("네트워크 오류"));
            const fd = new FormData();
            fd.append("files", file);
            xhr.send(fd);
        });
    }

    return {
        isUploading,
        progress,
        uploadingFile,
        uploadedFile,
        uploadFile,
        errorMessage,
        isError,
        setIsError,
    };
}
