// components/SearchBox.tsx
"use client";
import { Search } from "lucide-react";

export default function SearchFilter() {
    return (
        <div className="border-border-primary1 mt-4 rounded-lg border bg-white p-4">
            <div className="border-border-primary1 flex items-center rounded-lg border px-3 py-2">
                <Search className="text-text-secondary2" />
                <input
                    className="text-text-secondary2 placeholder-text-secondary2 ml-2 w-full outline-none"
                    type="text"
                    placeholder="회고록 검색..."
                />
            </div>
        </div>
    );
}
