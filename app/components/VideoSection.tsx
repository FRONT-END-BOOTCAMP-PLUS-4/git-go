"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

export default function VideoSection({
    id,
    title,
    videoSrc,
    nextSectionId,
    content,
    snap = false,
}: {
    id: string;
    title: string;
    videoSrc: string;
    nextSectionId?: string;
    content: string;
    snap: boolean;
}) {
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
        <section
            className={`relative flex min-h-screen snap-start scroll-mt-[-40] flex-col items-center justify-center px-4`}
            id={id}
        >
            <h2 className="mb-4 text-2xl font-bold">{title}</h2>
            <div className="mb-4 text-xl">{content}</div>
            <video
                className="mb-4 w-full max-w-3xl rounded-xl shadow-xl"
                autoPlay
                playsInline
                muted
                loop
                src={videoSrc}
            />
            {nextSectionId && (
                <button
                    onClick={() => scrollToSection(nextSectionId)}
                    className="absolute bottom-10 cursor-pointer rounded-full p-3"
                    aria-label="Scroll to next section"
                >
                    <ChevronDown className="text-border-primary1 h-20 w-30" />
                </button>
            )}
        </section>
    );
}
