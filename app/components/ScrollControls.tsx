"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Mouse } from "lucide-react";
import Image from "next/image";

export function FeatureBox({ feature }: { feature: any }) {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        const container = document.querySelector("main"); // ← snap이 걸린 컨테이너

        if (element && container) {
            const y =
                element.getBoundingClientRect().top -
                container.getBoundingClientRect().top +
                container.scrollTop;

            container.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div
            className="max-w-[300px] cursor-pointer text-center"
            onClick={() => scrollToSection(feature.id)}
        >
            <div
                className={`text-text-gray1 mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full p-4 ${feature.bgColor}`}
            >
                <Image
                    src={feature.iconPath}
                    alt={feature.title}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                />
            </div>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-sm">{feature.desc}</p>
        </div>
    );
}

export function ScrollDownButton({ id }: { id: string }) {
    return (
        <button
            className="absolute bottom-[85px] cursor-pointer rounded-full p-3"
            onClick={() => {
                const element = document.getElementById(id);
                const container = document.querySelector("main"); // ← snap이 걸린 컨테이너

                if (element && container) {
                    const y =
                        element.getBoundingClientRect().top -
                        container.getBoundingClientRect().top +
                        container.scrollTop;

                    container.scrollTo({ top: y, behavior: "smooth" });
                }
            }}
            aria-label="Scroll to next section"
        >
            <Mouse className="text-primary3 h-15 w-15 animate-bounce" />
        </button>
    );
}

export function ScrollTopButton() {
    const [visible, setVisible] = useState(false);

    const topClckHandler = () => {
        const container = document.querySelector("main");
        if (!container) return;

        container.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const container = document.querySelector("main");
        if (!container) return;

        const toggleVisibility = () => {
            setVisible(container.scrollTop > 300);
        };

        container.addEventListener("scroll", toggleVisibility);

        // 초기 실행 한 번 해주기
        toggleVisibility();

        return () => container.removeEventListener("scroll", toggleVisibility);
    }, []);

    if (!visible) return null;

    return (
        <button
            className="bg-primary7 hover:bg-primary8 fixed right-6 bottom-10 z-50 flex cursor-pointer items-center justify-center rounded-full p-3 text-white shadow-md transition"
            onClick={topClckHandler}
        >
            <ArrowUp className="h-5 w-5" />
        </button>
    );
}

const ScrollControls = {
    FeatureBox,
    ScrollDownButton,
    ScrollTopButton,
};

export default ScrollControls;
