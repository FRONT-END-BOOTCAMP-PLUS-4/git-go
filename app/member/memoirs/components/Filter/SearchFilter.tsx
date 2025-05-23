"use client";
import { useState } from "react";
import { useFilterStore } from "@/store/useFilterStore";
import { Search, X } from "lucide-react";

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
        <div className="border-border-primary1 ml-4 flex h-9 items-center rounded-lg border bg-white px-3 py-2">
            <Search className="text-text-secondary2" />
            <input
                className="text-text-secondary1 placeholder-text-secondary2 ml-2 w-full text-sm outline-none"
                type="text"
                placeholder="회고록 검색"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            {searchKeyword && (
                <button onClick={handleReset} className="ml-2">
                    <X size={16} className="text-gray-400" />
                </button>
            )}
        </div>
    );
}