"use client";

import type { ReactNode } from "react";

type NavigationItem = {
    icon: ReactNode;
    text: string;
};

interface MobileTabLayoutProps {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    navItems: NavigationItem[];
    panels: ReactNode[];
}

export default function MobileTabLayout({
    activeIndex,
    setActiveIndex,
    navItems,
    panels,
}: MobileTabLayoutProps) {
    return (
        // 콘텐츠 영역: 하단 탭 높이만큼 여유를 줘서 가리지 않도록 처리
        <div className="relative flex h-[calc(100vh-60px)] w-full flex-col">
            <div className="h-full max-h-[100vh] w-full pb-[60px]">
                {panels[activeIndex]}
            </div>

            <div className="bg-bg-member1 fixed bottom-0 left-0 z-50 flex min-w-full cursor-pointer justify-evenly text-xs shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
                <ul className="flex h-full w-full">
                    {navItems.map((item, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <li
                                key={index}
                                className="flex h-full flex-1 list-none"
                            >
                                <button
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={item.text}
                                    className={`relative flex w-full flex-col items-center gap-y-1 p-2 text-center font-medium transition-colors duration-200 focus:outline-none ${isActive ? "bg-primary1 border-primary8 border-t-2" : "hover:bg-bg-primary2"} `}
                                >
                                    <span
                                        className={`shrink-0 [&>svg]:h-5 [&>svg]:w-5 ${isActive ? "text-primary7" : "text-text-secondary2"} `}
                                    >
                                        {item.icon}
                                    </span>

                                    <span
                                        className={`min-w-fit whitespace-nowrap ${isActive ? "text-primary7" : "text-text-secondary2"} `}
                                    >
                                        {item.text}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
