// components/SearchBox.tsx
"use client";
import { Search } from "lucide-react";

export default function SearchFilter() {
    return (
        <div className="border-border-primary1 ml-4 flex h-9 items-center rounded-lg border bg-white px-3 py-2">
            <Search className="text-text-secondary2" />
            <input
                className="text-text-secondary1 placeholder-text-secondary2 ml-2 w-full text-sm outline-none"
                type="text"
                placeholder="회고록 검색..."
            />
        </div>
    );
}
