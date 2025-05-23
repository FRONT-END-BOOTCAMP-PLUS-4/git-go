"use client";
import PageTap from "@/app/member/components/PageTab";
import RepoSelectModal from "@/app/member/components/RepoSelectModal";
import SideBar from "@/app/member/components/SideBar";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import SearchFilter from "./memoirs/components/Filter/SearchFilter";

export default function MemberLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    const pathname = usePathname();
    const status = pathname.split("/").pop() || "commits";

    const { id, memoirId } = useParams();

    // memoir 페이지(작성)가 아닐 때만 사이드바와 탭을 보여줌
    if (pathname.endsWith("memoir") || id || memoirId) {
        // 작성 페이지는 사이드바 탭 미표시
        return <>{children}</>;
    } else {
        return (
            <div className="layout-padding bg-bg-primary1 flex gap-x-6 py-6">
                <RepoSelectModal open={open} onClose={() => setOpen(false)} />
                <div className="sticky top-[89px] h-[calc(100vh-89px)] w-fit overflow-y-auto pr-10">
                    <SideBar setOpen={setOpen} />
                </div>

                <div className="w-full">
                    <div className="flex justify-between">
                        <PageTap status={status} />
                        {pathname.includes("memoirs") && <SearchFilter />}
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}
