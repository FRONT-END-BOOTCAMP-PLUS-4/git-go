"use client";
import { useFilterStore } from "@/store/useFilterStore";
import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchFilter() {
    const {
        searchKeyword,
        setSearchKeyword,
        resetSearch,
        setFilterType,
        setTimePeriod,
        resetTags,
    } = useFilterStore();

    const [localInput, setLocalInput] = useState(searchKeyword);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const trimmedKeyword = localInput.trim();
            setSearchKeyword(trimmedKeyword);
            setFilterType("all");
            setTimePeriod("all");
            resetTags();
        }
    };

    const handleReset = () => {
        setLocalInput("");
        resetSearch();
    };

    return (
        <div className="border-border-primary1 bg-bg-member1 flex h-9 w-full max-w-100 items-center justify-center rounded-md border px-3 py-5 md:mb-6 md:ml-auto">
            <Search className="text-text-secondary2 shrink-0" />
            <input
                className="placeholder-text-secondary2 ml-2 w-full text-sm outline-none"
                type="text"
                placeholder="회고록 검색"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            {searchKeyword && (
                <button onClick={handleReset} className="ml-2 cursor-pointer">
                    <X size={18} className="text-gray-400" />
                </button>
            )}
        </div>
    );
}
