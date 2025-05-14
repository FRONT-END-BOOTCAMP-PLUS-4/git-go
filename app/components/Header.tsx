"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import LoginWithGitHubButton from "./LoginWithGitHubButton";

export default function Header() {
    const { data: session, status } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="border-border-primary1 sticky top-0 z-50 flex h-[65px] flex-row items-center justify-between border-b bg-white px-24">
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
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                        {session?.user?.image ? (
                            <Image
                                src={session.user.image}
                                alt="profile"
                                width={30}
                                height={30}
                                className="rounded-full w-[30px] h-[30px]"
                            />
                        ) : (
                            <div className="w-[30px] h-[30px] rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-bold">
                                {session?.user?.name?.charAt(0).toUpperCase() ?? "U"}
                            </div>
                        )}
                        <div className="ml-1">{session?.user?.name ?? "사용자"}</div>
                        <Image src="/down-arrow.svg" alt="down arrow" width={13} height={13} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-full">
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="w-full text-red-500 text-sm px-4 py-2 flex items-center gap-2 hover:bg-red-50"
                            >
                                <Image src="/logout.svg" alt="logout icon" width={16} height={16} />
                                로그아웃
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
