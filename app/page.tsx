import Image from "next/image";
import LoginWithGitHubButton from "./components/LoginWithGitHubButton";

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <div className="space-y-6">
                <div className="flex justify-center">
                    <div className="bg-indigo-100 rounded-full p-6 flex items-center justify-center">
                        <Image
                            src="/home-center.svg"
                            alt="Home Center Icon"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                    </div>
                </div>
                <h1 className="text-2xl font-semibold">코딩 여정을 기록하세요</h1>
                <p className="text-gray-600 text-sm">
                    GitHub 계정을 연동하여 코드 활동을 자동으로 기록하고, AI 기반 요약과 함께<br />
                    의미 있는 작업 문서를 만들어보세요.
                </p>
                <LoginWithGitHubButton />
                <div className="flex gap-20 mt-10 justify-center">
                    {[
                        {
                            title: "Sync Activities",
                            desc: "Automatically track commits, PRs, and code changes",
                            iconPath: "/sync-activities.svg",
                            bgColor: "bg-green-100",
                        },
                        {
                            title: "AI Summaries",
                            desc: "Get intelligent insights about your code changes",
                            iconPath: "/ai-summaries.svg",
                            bgColor: "bg-blue-100",
                        },
                        {
                            title: "Create Memoirs",
                            desc: "Document your journey with rich, contextual notes",
                            iconPath: "/create-memoirs.svg",
                            bgColor: "bg-purple-100",
                        },
                    ].map((feature) => (
                        <div key={feature.title} className="text-center max-w-[350px]">
                            <div className={`rounded-full p-4 mb-2 flex items-center justify-center mx-auto w-16 h-16 ${feature.bgColor}`}>
                                <Image
                                    src={feature.iconPath}
                                    alt={feature.title}
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                            </div>
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className="text-sm text-gray-500">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}