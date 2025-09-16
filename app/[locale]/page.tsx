import {
    FeatureBox,
    ScrollDownButton,
    ScrollTopButton,
} from "../components/ScrollControls";

import { MEMBER_URL } from "@/constants/url";
import { LayoutDashboard } from "lucide-react";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../api/auth/authOptions";
import Button from "../components/Button";
import VideoSection from "../components/VideoSection";

type Feature = {
    title: string;
    desc: string;
    bgColor: string;
    iconPath: string;
};

export default async function HomePage() {
    const t = await getTranslations("Landing");
    const features: Feature[] = [
        {
            title: t("features.sync.title"),
            desc: t("features.sync.desc"),
            bgColor: "bg-green-100",
            iconPath: "/sync-activities.svg",
        },
        {
            title: t("features.ai.title"),
            desc: t("features.ai.desc"),
            bgColor: "bg-blue-100",
            iconPath: "/ai-summaries.svg",
        },
        {
            title: t("features.memoirs.title"),
            desc: t("features.memoirs.desc"),
            bgColor: "bg-purple-100",
            iconPath: "/create-memoirs.svg",
        },
    ];
    const session = await getServerSession(authOptions);
    const isLoggedIn = !!session;

    return (
        <main className="bg-bg-primary1 text-text-primary1 h-[calc(100vh-65px)] snap-y snap-mandatory overflow-y-scroll text-center">
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
                <h1 className="text-2xl font-semibold">{t("title")}</h1>
                <p className="text-text-gray1 text-sm">{t("subTitle")}</p>

                {isLoggedIn ? (
                    <div className="flex justify-center">
                        <form action={MEMBER_URL.commits}>
                            <Button
                                type="default"
                                size="regular"
                                label={t("dashboard")}
                                htmlType="submit"
                                icon={<LayoutDashboard size={16} />}
                            />
                        </form>
                    </div>
                ) : (
                    <Button>
                        <Link target="_blank" href={"/demo"}>
                            Start with a demo
                        </Link>
                    </Button>
                )}

                <div className="mt-10 flex flex-wrap justify-center gap-10 leading-10">
                    {features.map((feature) => (
                        <FeatureBox key={feature.title} feature={feature} />
                    ))}
                </div>

                <ScrollDownButton id="sync" />
            </div>

            {/* 설명 영상 섹션들 */}
            <div>
                <VideoSection
                    id="sync"
                    title={t("features.sync.title")}
                    videoSrc="/video/sync-repo.mp4"
                    nextSectionId="ai"
                    content={t("features.sync.desc")}
                    snap
                />
                <VideoSection
                    id="ai"
                    title={t("features.ai.title")}
                    videoSrc="/video/ai-summary.mp4"
                    nextSectionId="memoirs"
                    content={t("features.ai.desc")}
                    snap
                />
                <VideoSection
                    id="memoirs"
                    title={t("features.memoirs.title")}
                    videoSrc="/video/create-memoir.mp4"
                    content={t("features.memoirs.desc")}
                    snap
                />
            </div>
            <ScrollTopButton />
        </main>
    );
}
