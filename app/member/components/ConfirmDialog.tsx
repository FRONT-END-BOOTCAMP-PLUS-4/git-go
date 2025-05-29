"use client";

import Button from "@/app/components/Button";
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
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70">
            <div className="bg-bg-primary2 relative w-full max-w-md rounded-xl p-6 shadow-xl">
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

                <h2 className="text-text-primary1 text-lg font-semibold">
                    {title}
                </h2>
                <p className="text-text-secondary2 mt-3 text-sm whitespace-pre-line">
                    {description}
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <Button onClick={onCancel} type="lined">
                        취소
                    </Button>
                    <Button onClick={onConfirm} type="danger">
                        확인
                    </Button>
                </div>
            </div>
        </div>
    );
}
