// app/page.tsx (or app/home/page.tsx)

import { getServerSession } from "next-auth";
import Image from "next/image";
import LoginWithGitHubButton from "./components/LoginWithGitHubButton";
import Button from "./components/Button";
import { MEMBER_URL } from "@/constants/url";
import { authOptions } from "./api/auth/authOptions";
import VideoSection from "./components/VideoSection";
import {
    FeatureBox,
    ScrollDownButton,
    ScrollTopButton,
} from "./components/ScrollControls";

export default async function HomePage() {
    const session = await getServerSession(authOptions);
    const isLoggedIn = !!session;

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
        <main className="h-[calc(100vh-65px)] snap-y snap-mandatory overflow-y-scroll bg-gray-50 text-center">
            <div className="relative flex min-h-screen snap-start flex-col items-center space-y-6 px-4 pt-[15vh]">
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
                        <FeatureBox key={feature.id} feature={feature} />
                    ))}
                </div>

                <ScrollDownButton id="sync" />
            </div>

            {/* 설명 영상 섹션들 */}
            <div>
                <VideoSection
                    id="sync"
                    title="활동 동기화"
                    videoSrc="/video/sync-repo.mp4"
                    nextSectionId="ai"
                    content="커밋, PR 및 코드 변경사항을 자동으로 추적하세요"
                    snap
                />
                <VideoSection
                    id="ai"
                    title="AI 요약 기능"
                    videoSrc="/video/ai-summary.mp4"
                    nextSectionId="memoirs"
                    content="코드 변경사항에 대한 지능형 인사이트를 제공합니다"
                    snap
                />
                <VideoSection
                    id="memoirs"
                    title="회고록 작성"
                    videoSrc="/video/create-memoir.mp4"
                    content="풍부한 맥락과 함께 개발 여정을 기록하세요"
                    snap
                />
            </div>
            <ScrollTopButton />
        </main>
    );
}
