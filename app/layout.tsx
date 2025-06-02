import localFont from "next/font/local";
import Header from "./components/Header";
import { Providers } from "./components/Providers";
import "./globals.css";

const pretendard = localFont({
    src: "../static/fonts/PretendardVariable.woff2",
    display: "swap",
    weight: "100 900",
    variable: "--font-pretendard",
});

export const metadata = {
    title: "GITGO - 기록이 남는 개발",
    description:
        "개발자의 커밋과 PR 활동을 기반으로, 회고를 쉽게 작성하고 성장 스토리를 쌓아가는 서비스 — 지금 바로 시작해보세요.",
    metadataBase: new URL("https://git-go.co.kr"),
    icons: {
        icon: "/favicon.ico?v=2",
    },
    openGraph: {
        title: "GITGO - 기록이 남는 개발",
        description:
            "개발자의 커밋과 PR 활동을 기반으로, 회고를 쉽게 작성하고 성장 스토리를 쌓아가는 서비스 — 지금 바로 시작해보세요.",
        url: "https://git-go.co.kr",
        siteName: "GITGO",
        images: [
            {
                url: "/logo.png",
                width: 800,
                height: 600,
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "GITGO - 기록이 남는 개발",
        description:
            "개발자의 커밋과 PR 활동을 기반으로, 회고를 쉽게 작성하고 성장 스토리를 쌓아가는 서비스 — 지금 바로 시작해보세요.",
        images: ["/logo.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="kr"
            suppressHydrationWarning
            className={pretendard.variable}
        >
            <body className={`bg-bg-primary1 ${pretendard.className}`}>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
