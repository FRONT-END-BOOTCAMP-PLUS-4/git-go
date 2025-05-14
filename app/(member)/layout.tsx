"use client";
import PageTap from "@/app/(member)/components/PageTab";
import RepoSelectModal from "@/app/(member)/components/RepoSelectModal";
import SideBar from "@/app/(member)/components/SideBar";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MemberLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    const pathname = usePathname();
    console.log(pathname);

    // memoir 페이지(작성)가 아닐 때만 사이드바와 탭을 보여줌
    if (!pathname.endsWith("memoir")) {
        return (
            <div className="layout-padding bg-bg-primary1 flex gap-x-6 py-6">
                <RepoSelectModal open={open} onClose={() => setOpen(false)} />
                <SideBar setOpen={setOpen} />

                <div className="w-full">
                    <PageTap status="commit" />
                    {children}
                </div>
            </div>
        );
    } else {
        // 작성 페이지는 사이드바 탭 미표시
        return <>{children}</>;
    }
}
