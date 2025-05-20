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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-300">
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
                <p className="mt-3 text-sm text-gray-600 whitespace-pre-line">
                    {description}
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                        취소
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md text-sm bg-danger1 text-white hover:bg-danger2 cursor-pointer"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}