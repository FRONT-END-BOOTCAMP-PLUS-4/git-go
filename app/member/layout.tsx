"use client";
import PageTap from "@/app/member/components/PageTab";
import RepoSelectModal from "@/app/member/components/RepoSelectModal";
import SideBar from "@/app/member/components/SideBar";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import SearchFilter from "./memoirs/components/Filter/SearchFilter";
import MobilePageTab from "@/app/member/components/MobilePageTab";
import TimeFilter from "@/app/member/components/TimeFilter";
import CommitPrFilter from "@/app/member/memoirs/components/Filter/CommitPrFilter";
import TagFilter from "@/app/member/memoirs/components/Filter/TagFilter";
import MobileRepoSelect from "@/app/member/components/MobileRepoSelect";

export default function MemberLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [repoTags, setRepoTags] = useState<string[]>([]);
    const [repoSelectOpen, setRepoSelectOpen] = useState(false);

    const pathname = usePathname();
    const status = pathname.split("/").pop() || "commits";

    const { id, memoirId } = useParams();

    // memoir 페이지(작성)가 아닐 때만 사이드바와 탭을 보여줌
    if (
        pathname.endsWith("memoir") ||
        id ||
        memoirId ||
        pathname.endsWith("settings")
    ) {
        // 작성 페이지는 사이드바 탭 미표시
        return <>{children}</>;
    } else {
        return (
            <>
                <div className="layout-padding mb-14 gap-x-6 md:mb-0 md:flex">
                    <RepoSelectModal
                        open={open}
                        onClose={() => setOpen(false)}
                    />
                    <div className="sticky top-[81px] hidden min-w-fit overflow-x-hidden overflow-y-auto md:block md:h-[calc(100vh-113px)]">
                        <SideBar setOpen={setOpen} />
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col justify-between md:flex-row md:gap-x-2">
                            <PageTap status={status} />
                            <section className="flex items-center gap-x-2">
                                <MobileRepoSelect
                                    repoSelectOpen={repoSelectOpen}
                                    setRepoSelectOpen={setRepoSelectOpen}
                                    setOpen={setOpen}
                                />
                                {pathname.includes("memoirs") && (
                                    <SearchFilter />
                                )}
                            </section>
                            {pathname.includes("memoirs") && (
                                <div>
                                    <div className="md:hidden">
                                        <TimeFilter
                                            options={[
                                                {
                                                    value: "all",
                                                    label: "전체 기간",
                                                },
                                                {
                                                    value: "7days",
                                                    label: "지난 7일",
                                                },
                                                {
                                                    value: "30days",
                                                    label: "지난 30일",
                                                },
                                            ]}
                                        />
                                        <div className="border-border-primary1 bg-bg-member1 my-2 rounded-md border p-4">
                                            <CommitPrFilter />
                                            <TagFilter tags={repoTags} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {children}
                    </div>
                </div>
                <MobilePageTab status={status} />
            </>
        );
    }
}
