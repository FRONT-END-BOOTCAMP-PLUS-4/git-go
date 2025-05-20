"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import LoginWithGitHubButton from "./LoginWithGitHubButton";

export default function Header() {
    const { data: session, status } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="border-border-primary1 sticky top-0 z-50 w-full border-b bg-white">
            <div className="layout-flex mx-0 flex h-[65px] flex-row items-center justify-between px-4 xl:mx-auto xl:max-w-screen-xl">
                <div className="flex items-center justify-center">
                    <Image
                        className="mr-3"
                        src="/logo.svg"
                        alt="logo"
                        width={45}
                        height={45}
                    />
                    <div className="font-semibold">GITGO</div>
                </div>

                {status === "loading" ? null : status === "unauthenticated" ? (
                    <LoginWithGitHubButton />
                ) : (
                    <div className="relative inline-block text-left">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 rounded-lg py-2 transition hover:bg-gray-200"
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
                            <div className="absolute right-0 z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                                <button
                                    onClick={() =>
                                        signOut({ callbackUrl: "/" })
                                    }
                                    className="flex w-full items-center gap-2 py-2 text-sm text-red-500 hover:bg-red-50 px-2"
                                >
                                    <Image
                                        src="/logout.svg"
                                        alt="logout icon"
                                        width={16}
                                        height={16}
                                    />
                                    로그아웃
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
