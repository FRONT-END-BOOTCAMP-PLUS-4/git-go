// components/FilterBox.tsx
"use client";

import { useFilterStore } from "@/store/useFilterStore";

export default function CommitPrFilter() {
    const { filterType, setFilterType } = useFilterStore();

    return (
        <div>
            <div className="mb-2 text-base font-normal">필터</div>
            <div className="space-y-2 text-sm">
                {["all", "commits", "pullRequests"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            className="form-radio cursor-pointer"
                            checked={filterType === type}
                            onChange={() => setFilterType(type as any)}
                        />
                        <div>
                            {type === "all"
                                ? "전체보기"
                                : type === "commits"
                                    ? "Commits"
                                    : "Pull Requests"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
