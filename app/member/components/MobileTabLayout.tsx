type NavigationItem = {
    icon: React.ReactNode;
    text: string;
};

interface MobileTabLayoutProps {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    navItems: NavigationItem[];
    panels: React.ReactNode[];
}

export default function MobileTabLayout({
    activeIndex,
    setActiveIndex,
    navItems,
    panels,
}: MobileTabLayoutProps) {
    return (
        <div className="flex h-[calc(100vh-65px)] w-full flex-col">
            <div className="h-full max-h-[calc(100vh-135px)] w-full">
                {panels[activeIndex]}
            </div>

            <div className="fixed bottom-0 left-0 flex h-[70px] w-full max-w-[1024px] items-center justify-center bg-white shadow-lg">
                <ul className="flex h-full w-full justify-around">
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex h-full flex-1 cursor-pointer list-none items-center justify-center"
                        >
                            <button
                                onClick={() => setActiveIndex(index)}
                                className={`hover:text-primary5 active:text-primary8 relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-center font-medium transition-colors duration-300 focus:outline-none ${
                                    activeIndex === index
                                        ? "text-primary7 bg-primary1 border-primary8 border-t-2"
                                        : "text-[#222327]"
                                }`}
                                aria-label={item.text}
                            >
                                <span className="block text-center text-2xl">
                                    {item.icon}
                                </span>
                                <span className="text-sm font-normal tracking-wider">
                                    {item.text}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
