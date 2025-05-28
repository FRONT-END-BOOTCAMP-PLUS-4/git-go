import Head from "next/head";

interface MetaProps {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
}

export default function Meta({
    title = "Git-go - 기록이 남는 개발",
    description = "개발자의 커밋과 PR 활동을 기반으로, 회고를 쉽게 작성하고 성장 스토리를 쌓아가는 서비스 — 지금 바로 시작해보세요.",
    url = "git-go.co.kr",
    image = "/logo.png",
}: MetaProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="robots" content="index, follow" />
        </Head>
    );
}
