"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import AlertDialog from "../member/components/AlertDialog";
import ConfirmDialog from "../member/components/ConfirmDialog";
import Button from "./Button";

export default function WithdrawButton() {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleWithdraw = async () => {
        const res = await fetch("/api/auth/withdraw", { method: "PATCH" });

        if (res.ok) {
            setShowAlert(true);
        } else {
            alert("탈퇴에 실패했습니다.");
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpenConfirm(true)}
                type="danger"
                // className="bg-danger1 hover:bg-danger2 flex cursor-pointer items-center gap-2 rounded px-4 py-2 font-semibold text-white"
            >
                <Image
                    src={"/sign-out.svg"}
                    alt={"sign out"}
                    width={20}
                    height={20}
                />
                회원 탈퇴
            </Button>

            <ConfirmDialog
                open={openConfirm}
                title="회원 탈퇴"
                description={
                    "정말 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제됩니다."
                }
                imageSrc="/withdraw.png"
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() => {
                    setOpenConfirm(false);
                    handleWithdraw();
                }}
            />

            <AlertDialog
                open={showAlert}
                title="탈퇴 완료"
                description={
                    "정상적으로 탈퇴되었습니다.\n그동안 이용해주셔서 감사합니다."
                }
                imageSrc="/bye.png"
                onClose={() => {
                    setShowAlert(false);
                    signOut({ callbackUrl: "/" });
                }}
            />
        </>
    );
}
