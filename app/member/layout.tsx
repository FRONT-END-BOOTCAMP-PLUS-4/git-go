"use client";

import PageTap from "@/app/member/components/PageTab";
import RepoSelectModal from "@/app/member/components/RepoSelectModal";
import SideBar from "@/app/member/components/SideBar";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SearchFilter from "./memoirs/components/Filter/SearchFilter";
import MobilePageTab from "@/app/member/components/MobilePageTab";
import TimeFilter from "@/app/member/components/TimeFilter";
import CommitPrFilter from "@/app/member/memoirs/components/Filter/CommitPrFilter";
import TagFilter from "@/app/member/memoirs/components/Filter/TagFilter";
import MobileRepoSelect from "@/app/member/components/MobileRepoSelect";
import { useRepoStore } from "@/store/useRepoStore";
import { Filter, X } from "lucide-react";
import Button from "../components/Button";

export default function MemberLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false); // RepoSelectModal
    const [repoTags, setRepoTags] = useState<string[]>([]);
    const [repoSelectOpen, setRepoSelectOpen] = useState(false);

    // ✅ 모바일 필터 모달 상태
    const [filterOpen, setFilterOpen] = useState(false);

    const pathname = usePathname();
    const status = pathname.split("/").pop() || "commits";
    const { id, memoirId } = useParams();

    const { selectedRepo } = useRepoStore();

    useEffect(() => {
        if (!selectedRepo) return;

        const fetchTags = async () => {
            try {
                const res = await fetch(
                    `/api/memoirs/tags?repo=${selectedRepo.dbId}`
                );
                const tags: string[] = await res.json();
                setRepoTags(tags);
            } catch (err) {
                console.error("태그 로딩 실패", err);
                setRepoTags([]);
            }
        };

        fetchTags();
    }, [selectedRepo]);

    // ✅ 모바일 모달: ESC 닫기 + 바디 스크롤 잠금
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setFilterOpen(false);
        };
        if (filterOpen) {
            document.addEventListener("keydown", onKey);
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.removeEventListener("keydown", onKey);
                document.body.style.overflow = prev;
            };
        }
    }, [filterOpen]);

    // memoir 작성/상세/설정 페이지는 사이드바/탭 숨김
    if (
        pathname.endsWith("memoir") ||
        id ||
        memoirId ||
        pathname.endsWith("settings")
    ) {
        return <>{children}</>;
    }

    return (
        <>
            <div className="layout-padding mb-14 gap-x-6 py-4 md:mb-0 md:flex md:py-6">
                <RepoSelectModal open={open} onClose={() => setOpen(false)} />

                {/* PC 전용 사이드바 */}
                <div className="sticky top-[81px] hidden min-w-fit overflow-x-hidden overflow-y-auto md:block md:h-[calc(100vh-113px)]">
                    <SideBar setOpen={setOpen} />
                </div>

                <div className="w-full md:min-w-0">
                    {/* 상단 탭 + (모바일) 오른쪽 유틸 영역 */}
                    <div className="flex flex-col justify-between md:flex-row md:gap-x-2">
                        <PageTap status={status} />

                        <section className="flex items-center gap-x-2">
                            {/* 모바일 저장소 선택 */}
                            <MobileRepoSelect
                                repoSelectOpen={repoSelectOpen}
                                setRepoSelectOpen={setRepoSelectOpen}
                                setOpen={setOpen}
                            />

                            {/* ✅ 모바일 전용: 검색, 필터 버튼 → 모달 */}
                        </section>
                        {pathname.includes("memoirs") && (
                            <div className="mb-2 flex items-center gap-2 md:mb-0">
                                <div className="flex w-full min-w-0 md:ml-0">
                                    <SearchFilter />
                                </div>

                                <div className="ml-auto md:hidden">
                                    <Button
                                        type="lined"
                                        htmlType="button"
                                        size="full"
                                        onClick={setFilterOpen}
                                    >
                                        <Filter size={16} />
                                        필터
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    {children}
                </div>
            </div>

            {/* 하단 고정 모바일 탭 */}
            <MobilePageTab status={status} />

            {/* ✅ 모바일 필터 모달 (바텀시트) */}
            {filterOpen && pathname.includes("memoirs") && (
                <div
                    className="fixed inset-0 z-[9999] md:hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="filters-title"
                >
                    {/* Dimmed */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setFilterOpen(false)}
                    />

                    {/* Bottom Sheet 패널 */}
                    <div className="bg-bg-member1 absolute inset-x-0 bottom-0 mx-auto w-full max-w-md rounded-t-2xl p-4">
                        <div className="mb-3 flex items-center">
                            <h2
                                id="filters-title"
                                className="text-base font-bold"
                            >
                                필터
                            </h2>
                            <button
                                onClick={() => setFilterOpen(false)}
                                className="ml-auto cursor-pointer rounded-md p-2 hover:bg-black/10"
                                aria-label="필터 닫기"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* 내용: 기간 + 커밋/PR + 태그 */}
                        <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <TimeFilter
                                options={[
                                    { value: "all", label: "전체 기간" },
                                    { value: "7days", label: "지난 7일" },
                                    { value: "30days", label: "지난 30일" },
                                ]}
                            />
                            <div className="border-border-primary1 rounded-md border p-3">
                                <CommitPrFilter />
                                <TagFilter tags={repoTags} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
