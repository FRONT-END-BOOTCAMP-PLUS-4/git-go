"use client";

import { MEMBER_URL } from "@/constants/url";
import { useLocale } from "@/hooks/useLocale";
import { Languages, LayoutDashboard, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoginWithGitHubButton from "./LoginWithGitHubButton";

export default function Header() {
    const { data: session, status } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const { id } = useParams();
    const isFullPage = pathname.endsWith("/memoir") || id;

    // 언어 설정
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);
    const { currentLocale, changeLocale } = useLocale();
    // 1920

    const moveToMyPage = () => {
        setDropdownOpen(false);
        router.push(MEMBER_URL.commits);
    };
    const moveToSettingsPage = () => {
        setDropdownOpen(false);
        router.push(MEMBER_URL.settings);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // 사용자 드롭다운 외부 클릭 시
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }

            // 언어 드롭다운 외부 클릭 시
            if (
                langDropdownRef.current &&
                !langDropdownRef.current.contains(event.target as Node)
            ) {
                setLangDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="border-border-primary1 bg-bg-header1 text-text-primary1 sticky top-0 z-50 h-[65px] w-full border-b">
            <div
                className={`mx-auto flex h-[65px] ${isFullPage ? "max-w-[1980px]" : "max-w-[1280px]"} flex-row items-center justify-between px-4`}
            >
                <div
                    className="flex cursor-pointer items-center justify-center"
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    <Image
                        className="mr-3"
                        src="/logo.png"
                        alt="logo"
                        width={45}
                        height={45}
                    />
                    <div className="font-semibold">GITGO</div>
                </div>

                <div className="flex items-center gap-5">
                    {/* 언어 드랍다운 */}
                    <div className="relative" ref={langDropdownRef}>
                        <div
                            className="text-primary7 hover:bg-hover-gray1 cursor-pointer rounded-full p-3"
                            onClick={() =>
                                setLangDropdownOpen(!langDropdownOpen)
                            }
                        >
                            <Languages />
                        </div>
                        {langDropdownOpen && (
                            <div className="border-border-primary1 bg-bg-primary1 absolute right-0 z-50 mt-2 w-25 overflow-hidden rounded-md border shadow-lg">
                                <button
                                    onClick={() => changeLocale("ko")}
                                    className={`hover:bg-hover-primary1 w-full cursor-pointer px-3 py-2 text-left ${
                                        currentLocale === "ko"
                                            ? "font-bold"
                                            : ""
                                    }`}
                                >
                                    Korean
                                </button>
                                <button
                                    onClick={() => changeLocale("en")}
                                    className={`hover:bg-hover-primary1 w-full cursor-pointer px-3 py-2 text-left ${
                                        currentLocale === "en"
                                            ? "font-bold"
                                            : ""
                                    }`}
                                >
                                    English
                                </button>
                            </div>
                        )}
                    </div>

                    {status === "loading" ? null : status ===
                      "unauthenticated" ? (
                        <LoginWithGitHubButton />
                    ) : (
                        <div
                            className="relative inline-block text-left"
                            ref={dropdownRef}
                        >
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="hover:bg-bg-primary2 flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition"
                            >
                                {session?.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt="profile"
                                        width={30}
                                        height={30}
                                        className="h-[30px] w-[30px] rounded-full border"
                                        style={{
                                            borderColor:
                                                "var(--color-border-primary1)",
                                        }}
                                    />
                                ) : (
                                    <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-400 text-sm font-bold text-white">
                                        {session?.user?.name
                                            ?.charAt(0)
                                            .toUpperCase() ?? "U"}
                                    </div>
                                )}
                                <div className="ml-1">
                                    {session?.user?.name ?? "사용자"}
                                </div>
                                <Image
                                    src="/down-arrow.svg"
                                    alt="down arrow"
                                    width={13}
                                    height={13}
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="bg-bg-primary1 border-border-primary1 absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-md border shadow-lg">
                                    <button
                                        onClick={moveToMyPage}
                                        className="text-text-primary1 hover:bg-hover-primary1 flex w-full cursor-pointer items-center justify-center gap-2 px-2 py-3 text-sm"
                                    >
                                        <LayoutDashboard
                                            width={16}
                                            height={16}
                                            className="mr-auto ml-2 shrink-0"
                                        />
                                        <span className="flex-1 text-center whitespace-nowrap">
                                            대시보드
                                        </span>
                                    </button>
                                    <button
                                        onClick={moveToSettingsPage}
                                        className="text-text-primary1 hover:bg-hover-primary1 flex w-full cursor-pointer items-center justify-center gap-2 px-2 py-3 text-sm"
                                    >
                                        <User
                                            width={16}
                                            height={16}
                                            className="mr-auto ml-2 shrink-0"
                                        />
                                        <span className="flex-1 text-center whitespace-nowrap">
                                            마이페이지
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            signOut({ callbackUrl: "/" })
                                        }
                                        className="hover:bg-hover-secondary1 flex w-full cursor-pointer items-center justify-center gap-2 px-2 py-3 text-sm text-red-500"
                                    >
                                        <Image
                                            className="mr-auto ml-2 shrink-0"
                                            src="/logout.svg"
                                            alt="logout icon"
                                            width={16}
                                            height={16}
                                        />
                                        <span className="flex-1 text-center whitespace-nowrap">
                                            로그아웃
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
