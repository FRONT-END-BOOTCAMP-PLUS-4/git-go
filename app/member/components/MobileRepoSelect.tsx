"use client";

import Button from "@/app/components/Button";
import { Plus } from "lucide-react";

interface MobileRepoSelectProps {
    repoSelectOpen: boolean;
    setRepoSelectOpen: (repoSelectOpen: boolean) => void;
    setOpen: (open: boolean) => void;
}

export default function MobileRepoSelect({
    repoSelectOpen,
    setRepoSelectOpen,
    setOpen,
}: MobileRepoSelectProps) {
    return (
        <div className="relative w-full max-w-50 min-w-25 md:hidden">
            <button
                className="border-border-primary1 bg-bg-member1 mb-2 flex w-full items-center gap-x-6 rounded-md border px-3 py-2.5 text-sm md:mb-6"
                onClick={() => setRepoSelectOpen(!repoSelectOpen)}
            >
                <span>저장소</span>
                <img
                    className="ml-auto h-4 w-4"
                    src="/down-arrow.svg"
                    alt="Down arrow"
                />
            </button>
            {repoSelectOpen && (
                <div className="border-border-primary1 bg-bg-member1 absolute top-11 left-0 z-10 w-full overflow-auto rounded-md border shadow-lg">
                    <ul>
                        <li className="hover:bg-bg-primary1 cursor-pointer truncate p-3 text-sm">
                            저장소 목록 리스트
                        </li>
                    </ul>
                    <section className="border-border-primary1 border-t p-2">
                        <Button
                            type="lined"
                            size="full"
                            onClick={() => setOpen(true)}
                        >
                            {/* <Image
                            src="/plus-gray.svg"
                            width={10.5}
                            height={16}
                            alt="저장소 추가 아이콘"
                        /> */}
                            <Plus size={18} />
                            저장소 추가
                        </Button>
                    </section>
                </div>
            )}
        </div>
    );
}
