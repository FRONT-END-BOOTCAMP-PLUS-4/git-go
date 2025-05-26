import { getServerSession } from "next-auth";
import Image from "next/image";
import LoginWithGitHubButton from "./components/LoginWithGitHubButton";
import Button from "./components/Button";
import { MEMBER_URL } from "@/constants/url";
import { authOptions } from "./api/auth/authOptions";

export default async function HomePage() {
    const session = await getServerSession(authOptions);
    const isLoggedIn = !!session;

    return (
        <main className="mt-[15vh] flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <div className="space-y-6">
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

                <div className="mt-10 flex justify-center gap-20 leading-10">
                    {[
                        {
                            title: "활동 동기화",
                            desc: "커밋, PR 및 코드 변경사항을 자동으로 추적",
                            iconPath: "/sync-activities.svg",
                            bgColor: "bg-green-100",
                        },
                        {
                            title: "AI 요약",
                            desc: "코드 변경사항에 대한 지능형 인사이트 제공",
                            iconPath: "/ai-summaries.svg",
                            bgColor: "bg-blue-100",
                        },
                        {
                            title: "회고록 작성",
                            desc: "풍부한 맥락과 함께 개발 여정을 기록하세요",
                            iconPath: "/create-memoirs.svg",
                            bgColor: "bg-purple-100",
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="max-w-[350px] text-center"
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
            </div>
        </main>
    );
}
