import Image from "next/image";
import Link from "next/link";
import Button from "./components/Button";
import {
    FeatureBox,
    ScrollDownButton,
    ScrollTopButton,
} from "./components/ScrollControls";
import VideoSection from "./components/VideoSection";

export default async function HomePage() {
    // const session = await getServerSession(authOptions);
    // const isLoggedIn = !!session;

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
        <main className="bg-bg-primary1 text-text-primary1 h-[calc(100vh-65px)] snap-y snap-mandatory overflow-y-scroll text-center">
            {/* 🔹 Start Demo + Features (데스크탑 전용) / ScrollDown (모바일 전용) */}
            <section className="relative flex min-h-[80vh] snap-start flex-col items-center space-y-6 px-4 py-[25vh] md:min-h-screen md:pt-[10vh]">
                {/* 🔸 헤더 & 문구 */}
                <div className="mb-4 flex justify-center">
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
                <p className="text-text-gray1 mt-2 text-sm">
                    GitHub 계정을 연동하여 코드 활동을 자동으로 기록하고, AI
                    기반 요약과 함께
                    <br className="hidden md:block" />
                    의미 있는 작업 문서를 만들어보세요.
                </p>
                {/* {isLoggedIn ? (
                    <div className="flex justify-center">
                        <form action={MEMBER_URL.commits}>
                            <Button
                                type="default"
                                size="regular"
                                label="대시보드"
                                htmlType="submit"
                                icon={<LayoutDashboard size={16} />}
                            />
                        </form>
                    </div>
                ) : (
                    <LoginWithGitHubButton />
                )} */}
                {/* 🔸 Start Demo 버튼 */}
                <div className="mt-6">
                    <Button>
                        <Link target="_blank" href={"/demo"}>
                            Start with a demo
                        </Link>
                    </Button>
                </div>

                {/* 🔸 데스크탑용 Features (가로 정렬) */}
                <div className="mt-10 hidden flex-wrap justify-center gap-10 leading-10 md:flex">
                    {features.map((feature) => (
                        <FeatureBox key={feature.id} feature={feature} />
                    ))}
                </div>

                {/* 🔸 모바일 전용 ScrollDown 버튼 (다음 섹션으로 넘어가기) */}
                <div className="flex justify-center md:hidden">
                    <ScrollDownButton id="feature-mobile" />
                </div>

                {/* 🔸 데스크탑 하단 중앙 ScrollDown */}
                <div className="absolute right-0 bottom-10 left-0 hidden justify-center md:flex">
                    <ScrollDownButton id="sync" />
                </div>
            </section>

            {/* 🔹 Mobile 전용: 3개의 FeatureBox를 하나의 섹션에 모아서 세로 정렬 */}
            <section
                id="feature-mobile"
                className="flex min-h-screen snap-start flex-col items-center justify-center gap-10 px-6 md:hidden"
            >
                {features.map((feature) => (
                    <FeatureBox key={feature.id} feature={feature} />
                ))}
            </section>

            {/* 🔹 이후 영상 섹션들 */}
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

            <ScrollTopButton />
        </main>
    );
}
