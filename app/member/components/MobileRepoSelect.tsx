"use client";

interface MobileRepoSelectProps {
    repoSelectOpen: boolean;
    setRepoSelectOpen: (open: boolean) => void;
}

export default function MobileRepoSelect({
    repoSelectOpen,
    setRepoSelectOpen,
}: MobileRepoSelectProps) {
    return (
        <div className="relative w-full max-w-50 min-w-25">
            <button
                className="border-border-primary1 bg-bg-member1 mb-2 flex w-full items-center gap-x-6 rounded-md border px-3 py-2.5 text-sm md:mb-6 md:hidden"
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
                <ul className="border-border-primary1 bg-bg-member1 absolute top-11 left-0 z-10 w-full overflow-auto rounded-md border shadow-lg">
                    <li className="hover:bg-bg-primary1 cursor-pointer truncate px-2 py-2 text-sm">
                        저장소 목록 리스트
                    </li>
                </ul>
            )}
        </div>
    );
}
