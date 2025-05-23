// components/CustomSelect.tsx
"use client";
import { useEffect, useRef, useState } from "react";

type Option = {
    value: string;
    label: string;
};

type CustomSelectProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function Select({
    options,
    value,
    onChange,
    placeholder = "선택하세요",
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 바깥 클릭 시 드롭다운 닫기
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel =
        options.find((opt) => opt.value === value)?.label || placeholder;

    return (
        <div className="relative mb-2 inline-block w-full" ref={containerRef}>
            {/* 선택된 값 표시하는 박스 */}
            <div
                className="border-border-primary1 flex h-10 cursor-pointer items-center justify-between rounded border bg-white px-3 py-2"
                onClick={() => setIsOpen((o) => !o)}
            >
                <span
                    className={`truncate ${value ? "text-black" : "text-gray-400"}`}
                >
                    {selectedLabel}
                </span>
                <svg
                    className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180 transform" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

            {/* 옵션 리스트 */}
            {isOpen && (
                <ul className="border-border-primary1 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border bg-white shadow-lg">
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            className={`cursor-pointer px-3 py-2 hover:bg-gray-100 ${
                                opt.value === value ? "bg-gray-100" : ""
                            }`}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
