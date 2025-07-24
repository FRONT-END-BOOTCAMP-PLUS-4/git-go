// components/FilterBox.tsx
"use client";

import { useFilterStore } from "@/store/useFilterStore";

export default function CommitPrFilter() {
    const { filterType, setFilterType } = useFilterStore();

    return (
        <div className="flex gap-x-2 md:block">
            <div className="shrink-0 text-sm font-normal sm:text-base md:mb-2">
                필터
            </div>
            <div className="flex items-center gap-x-2 text-xs sm:text-sm md:block md:space-y-2">
                {["all", "commits", "pullRequests"].map((type) => {
                    const id = `filter-${type}`;
                    return (
                        <div key={type} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={id}
                                className="form-radio cursor-pointer"
                                name="filterType"
                                value={type}
                                checked={filterType === type}
                                onChange={() => setFilterType(type as any)}
                            />
                            <label htmlFor={id} className="cursor-pointer">
                                {type === "all"
                                    ? "전체보기"
                                    : type === "commits"
                                      ? "Commits"
                                      : "Pull Requests"}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
