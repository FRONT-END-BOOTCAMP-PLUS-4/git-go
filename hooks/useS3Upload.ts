import { useState } from "react";

/**
 * S3 업로드 전용 훅
 * - 파일을 `/api/upload`로 전송
 * - 업로드 진행률 추적
 * - 서버에서 반환한 S3 URL 파싱
 * - 업로드 상태와 결과 반환
 * - 이미지 파일 용량 5MB 이하만 허용 (초과 시 alert 후 업로드 중단)
 */
export function useS3Upload({
    onUploadComplete,
    onUploadError,
    onUploadProgress,
}: {
    // 업로드 완료 시 호출, 업로드된 파일 정보(key, url, name, size, type) 전달
    onUploadComplete?: (f: {
        key: string;
        url: string;
        name: string;
        size: number;
        type: string;
    }) => void;
    // 업로드 실패 시 호출
    onUploadError?: (e: unknown) => void;
    // 업로드 진행률(0~100) 콜백
    onUploadProgress?: (p: { progress: number }) => void;
} = {}) {
    // 업로드 중 여부
    const [isUploading, setIsUploading] = useState(false);
    // 진행률(0~100)
    const [progress, setProgress] = useState(0);
    // 업로드 완료 후 파일 정보 저장
    const [uploadedFile, setUploadedFile] = useState<{
        key: string;
        url: string;
        name: string;
        size: number;
        type: string;
    } | null>(null);
    // 현재 업로드 중인 File 객체
    const [uploadingFile, setUploadingFile] = useState<File | null>(null);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    /**
     * 실제 XHR 요청으로 `/api/upload`에 FormData 전송
     * - 업로드 진행률 이벤트 처리
     * - 서버 응답(JSON { urls: [...] }) 파싱 후 결과 객체 반환
     */
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

            // 업로드 진행률 계산
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const p = (e.loaded / e.total) * 100;
                    setProgress(p);
                    onUploadProgress?.({ progress: p });
                }
            };

            // 업로드 완료 후 서버 응답 처리
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
                        // URL에서 S3 key 추출
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

            // 네트워크 오류
            xhr.onerror = () => reject(new Error("네트워크 오류"));

            // FormData에 파일 첨부 후 전송
            const fd = new FormData();
            fd.append("files", file);
            xhr.send(fd);
        });
    }

    /**
     * 외부에서 호출하는 업로드 함수
     * - 이미지 5MB 이하만 업로드 허용 (초과 시 alert 후 중단)
     * - 상태 업데이트(isUploading, uploadingFile)
     * - putWithProgressToApi 호출
     * - 성공 시 onUploadComplete, 실패 시 onUploadError
     */
    async function uploadFile(file: File) {
        // 이미지 파일인지 확인 (필요 시)
        const isImage = file.type.startsWith("image/");
        // 최대 허용 크기: 5MB
        const MAX_SIZE = 1 * 1024 * 1024;

        // 이미지이고 크기가 5MB 초과하면 경고 후 중단
        if (isImage && file.size > MAX_SIZE) {
            setErrorMessage("이미지는 5MB 이하만 업로드할 수 있습니다.");
            setIsError(true);
            // alert("이미지는 5MB 이하만 업로드할 수 있습니다.");
            return;
        }

        setIsUploading(true);
        setUploadingFile(file);

        try {
            // XHR로 파일 전송 → 결과 객체 반환
            const result = await putWithProgressToApi(file);

            // 업로드 성공 시 상태 저장 및 콜백 호출
            setUploadedFile(result);
            onUploadComplete?.(result);
            return result;
        } catch (error) {
            onUploadError?.(error);
            setIsError(true);
            throw error;
        } finally {
            // 항상 상태 초기화
            setIsUploading(false);
            setProgress(0);
            setUploadingFile(null);
        }
    }

    // 훅에서 반환하는 값과 메서드
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
