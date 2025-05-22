"use client";

import { useState } from "react";

export function useConfirm(onConfirmCallback: () => Promise<void> | void) {
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleDeleteClick = () => {
        setOpenConfirm(true);
    };

    const handleCancel = () => {
        setOpenConfirm(false);
    };

    const handleConfirm = async () => {
        try {
            await onConfirmCallback(); // 여기서 API 호출
        } catch (err) {
            console.error(err);
        } finally {
            setOpenConfirm(false);
        }
    };

    return { openConfirm, handleDeleteClick, handleCancel, handleConfirm };
}
