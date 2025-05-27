"use client";

import { getServerSession } from "next-auth";
import Image from "next/image";
import LoginWithGitHubButton from "./components/LoginWithGitHubButton";
import Button from "./components/Button";
import { MEMBER_URL } from "@/constants/url";
import { authOptions } from "./api/auth/authOptions";
import { useEffect, useState } from "react";
import { ArrowUp, Mouse } from "lucide-react"; // lucide-react 아이콘 사용
import VideoSection from "./components/VideoSection";

export default function HomePageWrapper() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getServerSession(authOptions);
            setIsLoggedIn(!!session);
        };
        fetchSession();

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = 0; // 헤더나 padding만큼의 오프셋
            const y =
                element.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const features = [
        {
            id: "sync",
            title: "활동 동기화",
            desc: "커밋, PR 및 코드 변경사항을 자동으로 추적",
            iconPath: "/sync-activities.svg",
            bgColor: "bg-green-100",
        },
        {
            id: "ai",
            title: "AI 요약",
            desc: "코드 변경사항에 대한 지능형 인사이트 제공",
            iconPath: "/ai-summaries.svg",
            bgColor: "bg-blue-100",
        },
        {
            id: "memoirs",
            title: "회고록 작성",
            desc: "풍부한 맥락과 함께 개발 여정을 기록하세요",
            iconPath: "/create-memoirs.svg",
            bgColor: "bg-purple-100",
        },
    ];

    return (
        <main className="relative bg-gray-50 text-center">
            <div className="relative flex min-h-screen flex-col items-center space-y-6 px-4 pt-[15vh]">
                <div className="flex justify-center">
                    <div className="flex items-center justify-center rounded-full bg-indigo-100 p-6">
                        <Image
                            src="/home-center.svg"
                            alt="Home Center Icon"
                            width={40}
                            height={40}
                            className="h-10 w-10"
                        />
                    </div>
                </div>
                <h1 className="text-2xl font-semibold">
                    코딩 여정을 기록하세요
                </h1>
                <p className="text-sm text-gray-600">
                    GitHub 계정을 연동하여 코드 활동을 자동으로 기록하고, AI
                    기반 요약과 함께
                    <br />
                    의미 있는 작업 문서를 만들어보세요.
                </p>

                {isLoggedIn ? (
                    <div className="flex justify-center">
                        <form action={MEMBER_URL.commits}>
                            <Button
                                type="default"
                                size="regular"
                                label="마이페이지"
                                htmlType="submit"
                            />
                        </form>
                    </div>
                ) : (
                    <LoginWithGitHubButton />
                )}

                <div className="mt-10 flex flex-wrap justify-center gap-10 leading-10">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="max-w-[300px] cursor-pointer text-center"
                            onClick={() => scrollToSection(feature.id)}
                        >
                            <div
                                className={`mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full p-4 ${feature.bgColor}`}
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
                            <p className="text-sm text-gray-500">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => scrollToSection("sync")}
                    className="absolute bottom-[75px] cursor-pointer rounded-full p-3"
                    aria-label="Scroll to next section"
                >
                    <Mouse className="text-border-primary1 h-15 w-15 animate-bounce" />
                </button>
            </div>

            {/* 설명 영상 섹션들 (각 섹션을 화면 전체 높이로 설정) */}
            <div className="">
                <VideoSection
                    id="sync"
                    title="활동 동기화"
                    videoSrc="/videos/sync.mp4"
                    nextSectionId="ai"
                    content="커밋, PR 및 코드 변경사항을 자동으로 추적하세요"
                />
                <VideoSection
                    id="ai"
                    title="AI 요약 기능"
                    videoSrc="/videos/ai.mp4"
                    nextSectionId="memoirs"
                    content="코드 변경사항에 대한 지능형 인사이트를 제공합니다"
                />
                <VideoSection
                    id="memoirs"
                    title="회고록 작성"
                    videoSrc="/videos/memoirs.mp4"
                    content="풍부한 맥락과 함께 개발 여정을 기록하세요"
                    // 마지막은 nextSectionId 없이
                />
            </div>

            {/* 스크롤 탑 버튼 */}
            {showScrollTop && (
                <button
                    className="bg-primary7 hover:bg-primary8 fixed right-6 bottom-6 z-50 flex cursor-pointer items-center justify-center rounded-full p-3 text-white shadow-md transition"
                    onClick={scrollToTop}
                >
                    <ArrowUp className="h-5 w-5" />
                </button>
            )}
        </main>
    );
}
