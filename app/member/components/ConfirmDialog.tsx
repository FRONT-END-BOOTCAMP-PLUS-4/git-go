"use client";

import Image from "next/image";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
    imageSrc?: string;
}

export default function ConfirmDialog({
    open,
    title,
    description,
    onConfirm,
    onCancel,
    imageSrc,
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-md rounded-xl border border-gray-300 bg-white p-6 shadow-xl">
                {imageSrc && (
                    <div className="absolute top-4 right-4">
                        <Image
                            src={imageSrc}
                            alt="알림 이미지"
                            width={90}
                            height={90}
                        />
                    </div>
                )}

                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <p className="mt-3 text-sm whitespace-pre-line text-gray-600">
                    {description}
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        취소
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-danger1 hover:bg-danger2 cursor-pointer rounded-md px-4 py-2 text-sm text-white"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
