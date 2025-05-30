"use client";

import { useState } from "react";

export default function Page() {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(Array.from(e.target.files || []));
        setImageUrls([]);
    };

    const handleUpload = async () => {
        if (files.length === 0) return;
        setUploading(true);

        try {
            const formData = new FormData();
            files.forEach((file) => formData.append("files", file));

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            // data.urls 에 업로드된 각 이미지 URL 배열이 담겨있다고 가정
            setImageUrls(data.urls);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);
            alert(err.message || "업로드 중 오류 발생");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-[1280px] bg-red-200 p-5">
            <h1 className="mb-5 text-2xl font-semibold">
                이미지 업로드 테스트 페이지
            </h1>

            <div className="flex items-center space-x-4">
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    파일 선택
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                />

                <button
                    onClick={handleUpload}
                    disabled={files.length === 0 || uploading}
                    className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
                >
                    {uploading ? "업로드 중…" : "업로드 하기"}
                </button>
            </div>

            {files.length > 0 && (
                <ul className="mt-2 text-sm">
                    {files.map((f) => (
                        <li key={f.name + f.lastModified}>
                            선택된 파일:{" "}
                            <span className="font-medium">{f.name}</span>
                        </li>
                    ))}
                </ul>
            )}

            {imageUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {imageUrls.map((url) => (
                        <img
                            key={url}
                            src={url}
                            alt="uploaded"
                            className="max-w-xs rounded shadow"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
