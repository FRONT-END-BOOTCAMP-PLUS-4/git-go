"use client";

import { useRouter } from "next/navigation";

export default function WithdrawButton() {
    const router = useRouter();

    const handleWithdraw = async () => {
        const confirmed = confirm("정말 탈퇴하시겠습니까?");
        if (!confirmed) return;

        const res = await fetch("/api/auth/withdraw", { method: "PATCH" });

        if (res.ok) {
            alert("탈퇴되었습니다.");
            router.push("/");
        } else {
            alert("탈퇴에 실패했습니다.");
        }
    };

    return (
        <button
            onClick={handleWithdraw}
            className="w-full text-sm text-gray-400 hover:text-gray-600 cursor-pointer py-2 px-3 rounded-md transition mt-2"
        >
            회원 탈퇴
        </button>
    );
}