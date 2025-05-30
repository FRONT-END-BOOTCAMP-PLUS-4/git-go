"use client";

import Button from "@/app/components/Button";
import WithdrawButton from "@/app/components/WithdrawButton";
import { GitBranch, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import SettingsSkeleton from "../stats/components/SettingsSkeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AlertDialog from "../components/AlertDialog";

export default function Settings() {
    const { setTheme } = useTheme();

    const [selectedTheme, setSelectedTheme] = useState("light");
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
    const [initialTheme, setInitialTheme] = useState("light");

    const isSaveDisabled =
        branchSetting === initialBranchSetting &&
        selectedTheme === initialTheme;
    const [isLoading, setIsLoading] = useState(true);

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
            setInitialTheme(selectedTheme);
            setTheme(selectedTheme);

            setAlertContent({
                title: "저장 완료",
                description: "설정이 성공적으로 저장되었습니다.",
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
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            setSelectedTheme(savedTheme);
            setInitialTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        const fetchSetting = async () => {
            const res = await fetch("/api/settings/commits");
            if (res.ok) {
                const data = await res.json();
                const setting = data.isDefaultOnly ? "default" : "all";
                setBranchSetting(setting);
                setInitialBranchSetting(setting);
            }
            setIsLoading(false);
        };
        fetchSetting();
    }, []);

    if (isLoading) {
        return <SettingsSkeleton />;
    }

    return (
        <div className="flex justify-center">
            <div className="border-border-primary1 bg-bg-member1 m-4 w-full max-w-[880px] rounded-md border">
                <div className="border-border-primary1 border-b p-4 text-xl font-semibold">
                    설정
                </div>

                <div className="p-6">
                    {/* 테마 설정 */}
                    <div className="border-border-primary1 border-b pb-4">
                        <p className="mb-3 text-[16px] font-normal">
                            테마 설정
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2 ${
                                    selectedTheme === "light"
                                        ? "bg-hover-primary1 text-text-select1 border-border-primary1"
                                        : "bg-bg-member1 border-border-primary1"
                                } `}
                                onClick={() => setSelectedTheme("light")}
                            >
                                {/* <Image
                                    src={
                                        selectedTheme === "light"
                                            ? "/light-mode-blue.svg"
                                            : "/light-mode.svg"
                                    }
                                    alt="light mode"
                                    width={20}
                                    height={20}
                                /> */}
                                <Sun size={18} />
                                라이트 모드
                            </button>

                            <button
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2 ${
                                    selectedTheme === "dark"
                                        ? "bg-hover-primary1 text-text-select1 border-border-primary1"
                                        : "bg-bg-member1 border-border-primary1"
                                }`}
                                onClick={() => setSelectedTheme("dark")}
                            >
                                {/* <Image
                                    src={
                                        selectedTheme === "dark"
                                            ? "/dark-mode-blue.svg"
                                            : "/dark-mode.svg"
                                    }
                                    alt="dark mode"
                                    width={20}
                                    height={20}
                                /> */}
                                <Moon size={18} />
                                다크 모드
                            </button>
                        </div>
                    </div>

                    {/* 커밋 가져오기 설정 */}
                    <div className="border-border-primary1 border-b py-4">
                        <p className="mb-3 text-[16px] font-normal">
                            커밋 가져오기 설정
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setBranchSetting("default")}
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2 ${
                                    branchSetting === "default"
                                        ? "bg-hover-primary1 text-text-select1 border-border-primary1"
                                        : "bg-bg-member1 border-border-primary1"
                                }`}
                            >
                                {/* <Image
                                    src={
                                        branchSetting === "default"
                                            ? "/branch-blue.svg"
                                            : "/branch.svg"
                                    }
                                    alt="branch"
                                    width={20}
                                    height={20}
                                /> */}
                                <GitBranch size={18} />
                                기본 브랜치만
                            </button>
                            <button
                                onClick={() => setBranchSetting("all")}
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2 ${
                                    branchSetting === "all"
                                        ? "bg-hover-primary1 text-text-select1 border-border-primary1"
                                        : "bg-bg-member1 border-border-primary1"
                                }`}
                            >
                                {/* <Image
                                    src={
                                        branchSetting === "all"
                                            ? "/branch-blue.svg"
                                            : "/branch.svg"
                                    }
                                    alt="branch"
                                    width={20}
                                    height={20}
                                /> */}
                                <GitBranch size={18} />
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
