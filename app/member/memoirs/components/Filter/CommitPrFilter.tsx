// components/FilterBox.tsx
"use client";

import { useFilterStore } from "@/store/useFilterStore";

export default function CommitPrFilter() {
    const { filters, toggleFilter } = useFilterStore();

    return (
        <div className="border-border-primary1 shadow-sms rounded-lg border-1 bg-white p-4">
            <div className="mb-2 text-base font-normal">필터</div>
            <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                    <input
                        className="form-checkbox cursor-pointer"
                        type="checkbox"
                        checked={filters.commits}
                        onChange={() => toggleFilter("commits")}
                    />
                    <div>Commits</div>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        className="form-checkbox cursor-pointer"
                        type="checkbox"
                        checked={filters.pullRequests}
                        onChange={() => toggleFilter("pullRequests")}
                    />
                    <div>Pull Requests</div>
                </div>
            </div>
        </div>
    );
}
