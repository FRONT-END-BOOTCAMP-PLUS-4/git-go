"use client";

import { useState } from "react";
import ConfirmDialog from "../member/components/ConfirmDialog";
import { signOut } from "next-auth/react";

export default function WithdrawButton() {
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleWithdraw = async () => {
        const res = await fetch("/api/auth/withdraw", { method: "PATCH" });

        if (res.ok) {
            alert("탈퇴되었습니다.");
            signOut({ callbackUrl: "/" });
        } else {
            alert("탈퇴에 실패했습니다.");
        }
    };

    return (
        <>
            <button
                onClick={() => setOpenConfirm(true)}
                className="w-full text-sm text-gray-400 hover:text-gray-600 cursor-pointer py-2 px-3 rounded-md transition mt-2"
            >
                회원 탈퇴
            </button>

            <ConfirmDialog
                open={openConfirm}
                title="회원 탈퇴"
                description={"정말 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제됩니다."}
                imageSrc="/withdraw.png"
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() => {
                    setOpenConfirm(false);
                    handleWithdraw();
                }}
            />
        </>
    );
}