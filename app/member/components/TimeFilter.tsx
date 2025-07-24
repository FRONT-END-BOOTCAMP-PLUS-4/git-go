"use client";

import { useFilterStore } from "@/store/useFilterStore";
import { useState } from "react";

type Option = {
    value: string;
    label: string;
};

type TimeFilterProps = {
    options: Option[];
};

export default function TimeFilter({ options }: TimeFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { timePeriod, setTimePeriod } = useFilterStore();

    const handleOptionClick = (value: string) => {
        setTimePeriod(value); // 선택한 값을 useFilterStore에 저장
        setIsOpen(false); // 모달 닫기
    };

    return (
        <div className="bg-bg-member1 border-border-primary1 flex items-center gap-x-2 rounded-md border p-2 md:block md:p-4">
            <label className="text-text-primary1 shrink-0 text-xs font-normal sm:text-sm">
                작성 기간
            </label>
            <div className="relative inline-block w-full">
                <button
                    className="border-border-primary1 flex w-full cursor-pointer items-center justify-between rounded-md border px-2 py-2 text-left text-xs focus:outline-none sm:text-sm md:mt-2"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span>
                        {options.find((option) => option.value === timePeriod)
                            ?.label || "Select Time Period"}
                    </span>
                    <img
                        className="h-4 w-4"
                        src="/down-arrow.svg"
                        alt="Down arrow"
                    />
                </button>
                {isOpen && (
                    <ul className="border-border-primary1 bg-bg-member1 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border shadow-lg">
                        {options.map((option) => (
                            <li
                                className="hover:bg-bg-primary1 cursor-pointer px-2 py-2 text-xs sm:text-sm"
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
