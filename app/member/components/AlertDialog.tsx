"use client";

import Image from "next/image";

interface AlertDialogProps {
    open: boolean;
    title: string;
    description: string;
    onClose: () => void;
    imageSrc?: string;
}

export default function AlertDialog({
    open,
    title,
    description,
    onClose,
    imageSrc,
}: AlertDialogProps) {
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
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}