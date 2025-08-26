// components/FilterBox.tsx
"use client";

import { useId } from "react";
import { useFilterStore } from "@/store/useFilterStore";

type FilterType = "all" | "commits" | "pullRequests";

export default function CommitPrFilter() {
    const filterType = useFilterStore((s) => s.filterType);
    const setFilterType = useFilterStore((s) => s.setFilterType);
    const groupName = useId();

    return (
        <div className="flex gap-x-2 md:block">
            <div className="shrink-0 text-sm font-normal sm:text-base md:mb-2">
                필터
            </div>
            <div className="flex items-center gap-x-2 text-xs sm:text-sm md:block md:space-y-2">
                {(["all", "commits", "pullRequests"] as FilterType[]).map(
                    (type) => {
                        const id = `${groupName}-${type}`;
                        return (
                            <div
                                key={type}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="radio"
                                    id={id}
                                    className="form-radio cursor-pointer"
                                    name={groupName} // ← 여기만 바뀜
                                    value={type}
                                    checked={filterType === type}
                                    onChange={() => setFilterType(type)}
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
                    }
                )}
            </div>
        </div>
    );
}
