"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AlertDialog from "../components/AlertDialog";
import WithdrawButton from "@/app/components/WithdrawButton";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";

export default function Settings() {
    const [theme, setTheme] = useState("light");
    const [branchSetting, setBranchSetting] = useState<
        "default" | "all" | null
    >(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState<{
        title: string;
        description: string;
        imageSrc?: string;
    }>({
        title: "",
        description: "",
    });
    const router = useRouter();
    const [initialBranchSetting, setInitialBranchSetting] = useState<
        "default" | "all" | null
    >(null);
    const isSaveDisabled = branchSetting === initialBranchSetting;

    const handleSave = async () => {
        const res = await fetch("/api/settings/commits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                isDefaultOnly: branchSetting === "default",
            }),
        });

        if (res.ok) {
            setInitialBranchSetting(branchSetting);
            setAlertContent({
                title: "저장 완료",
                description: "커밋 가져오기 설정이 성공적으로 저장되었습니다.",
                imageSrc: "/success.png",
            });
            setAlertOpen(true);
        } else {
            setAlertContent({
                title: "저장 실패",
                description: "설정 저장에 실패했습니다. 다시 시도해주세요.",
            });
            setAlertOpen(true);
        }
    };

    useEffect(() => {
        const fetchSetting = async () => {
            const res = await fetch("/api/settings/commits");
            if (res.ok) {
                const data = await res.json();
                const setting = data.isDefaultOnly ? "default" : "all";
                setBranchSetting(setting);
                setInitialBranchSetting(setting);
            }
        };
        fetchSetting();
    }, []);

    useEffect(() => {
        const fetchSetting = async () => {
            const res = await fetch("/api/settings/commits");
            if (res.ok) {
                const data = await res.json();
                setBranchSetting(data.isDefaultOnly ? "default" : "all");
            }
        };
        fetchSetting();
    }, []);

    return (
        <div className="flex justify-center">
            <div className="border-border-primary1 m-4 w-full max-w-[880px] items-center justify-center rounded-lg border-1 bg-white">
                <div className="border-border-primary1 border-b-1 p-4 text-xl text-[18px] font-semibold">
                    설정
                </div>

                <div className="p-6">
                    {/* 테마 설정 */}
                    <div className="border-border-primary1 border-b-1 pb-4">
                        <p className="mb-3 text-[16px] font-normal">
                            테마 설정
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2 ${
                                    theme === "light"
                                        ? "bg-primary1 text-primary7 border-border-primary1"
                                        : "border-gray-200 bg-white"
                                }`}
                                onClick={() => setTheme("light")}
                            >
                                <Image
                                    src={
                                        theme === "light"
                                            ? "/light-mode-blue.svg" // 선택된 경우 -blue.svg
                                            : "/light-mode.svg" // 선택되지 않은 경우 기본 이미지
                                    }
                                    alt={"light mode"}
                                    width={20}
                                    height={20}
                                />
                                라이트 모드
                            </button>

                            {/* 다크 모드 버튼 */}
                            <button
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2 ${
                                    theme === "dark"
                                        ? "bg-primary1 text-primary7 border-border-primary1"
                                        : "border-gray-200 bg-white"
                                }`}
                                onClick={() => setTheme("dark")}
                            >
                                <Image
                                    src={
                                        theme === "dark"
                                            ? "/dark-mode-blue.svg" // 선택된 경우 -blue.svg
                                            : "/dark-mode.svg" // 선택되지 않은 경우 기본 이미지
                                    }
                                    alt={"dark mode"}
                                    width={20}
                                    height={20}
                                />
                                다크 모드
                            </button>
                        </div>
                    </div>

                    {/* 커밋 가져오기 설정 */}
                    <div className="border-border-primary1 border-b-1 py-4">
                        <p className="mb-3 text-[16px] font-normal">
                            커밋 가져오기 설정
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setBranchSetting("default")}
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2 ${
                                    branchSetting === "default"
                                        ? "bg-primary1 text-primary7 border-border-primary1"
                                        : "border-gray-200 bg-white"
                                }`}
                            >
                                <Image
                                    src={
                                        branchSetting === "default"
                                            ? "/branch-blue.svg" // 선택된 경우 -blue.svg
                                            : "/branch.svg" // 선택되지 않은 경우 기본 이미지
                                    }
                                    alt={"branch"}
                                    width={20}
                                    height={20}
                                />
                                기본 브랜치만
                            </button>
                            <button
                                onClick={() => setBranchSetting("all")}
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2 ${
                                    branchSetting === "all"
                                        ? "bg-primary1 text-primary7 border-border-primary1"
                                        : "border-gray-200 bg-white"
                                }`}
                            >
                                <Image
                                    src={
                                        branchSetting === "all"
                                            ? "/branch-blue.svg" // 선택된 경우 -blue.svg
                                            : "/branch.svg" // 선택되지 않은 경우 기본 이미지
                                    }
                                    alt={"branch"}
                                    width={20}
                                    height={20}
                                />
                                모든 브랜치
                            </button>
                        </div>
                    </div>

                    {/* 계정 관리 */}
                    <div className="py-4">
                        <p className="mb-2 text-[16px] font-normal">
                            계정 관리
                        </p>
                        <WithdrawButton />
                        <p className="text-text-gray1 mt-2 text-[14px]">
                            회원 탈퇴 시 모든 데이터가 영구적으로 삭제됩니다.
                        </p>
                    </div>

                    {/* 저장 버튼 */}
                    <div className="flex justify-end gap-3">
                        <div className="flex justify-end gap-3">
                            <Button
                                type="lined"
                                onClick={() => router.back()}
                                label="취소"
                            />

                            <Button
                                type={isSaveDisabled ? "disabled" : "default"}
                                onClick={handleSave}
                                label="저장"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <AlertDialog
                open={alertOpen}
                title={alertContent.title}
                description={alertContent.description}
                imageSrc={alertContent.imageSrc}
                onClose={() => setAlertOpen(false)}
            />
        </div>
    );
}
