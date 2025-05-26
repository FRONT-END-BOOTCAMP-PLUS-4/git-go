import Button from "@/app/components/Button";
import { MEMBER_URL } from "@/constants/url";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LabelBadgeProps {
    type:
        | "feat"
        | "fix"
        | "chore"
        | "merge"
        | "refactor"
        | "test"
        | "docs"
        | "style"
        | "etc";
}

const typeClassMap: Record<
    LabelBadgeProps["type"],
    { bg: string; text: string; label: string }
> = {
    feat: {
        label: "feature",
        bg: "bg-[#E0F7FA]", // 밝은 시안
        text: "text-[#006064]", // 진한 시안
    },
    fix: {
        label: "bugfix",
        bg: "bg-[#FFEBEE]", // 밝은 레드
        text: "text-[#B71C1C]", // 진한 레드
    },
    chore: {
        label: "chore",
        bg: "bg-[#FFF3E0]", // 밝은 오렌지
        text: "text-[#E65100]", // 진한 오렌지
    },
    merge: {
        label: "merge",
        bg: "bg-[#E8EAF6]", // 밝은 인디고
        text: "text-[#303F9F]", // 진한 인디고
    },
    refactor: {
        label: "refactor",
        bg: "bg-[#F3E5F5]", // 밝은 퍼플
        text: "text-[#6A1B9A]", // 진한 퍼플
    },
    test: {
        label: "test",
        bg: "bg-[#E0F2F1]", // 밝은 민트
        text: "text-[#004D40]", // 진한 민트
    },
    docs: {
        label: "docs",
        bg: "bg-[#E3F2FD]", // 밝은 블루
        text: "text-[#1565C0]", // 진한 블루
    },
    style: {
        label: "style",
        bg: "bg-[#FCE4EC]", // 밝은 핑크
        text: "text-[#880E4F]", // 진한 핑크
    },
    etc: {
        label: "etc",
        bg: "bg-[#ECEFF1]", // 밝은 그레이
        text: "text-[#37474F]", // 진한 그레이
    },
};

interface CardInfoProps {
    sha: string;
    message: string;
    branch: string;
    repo: string;
    commitType: LabelBadgeProps["type"];
    createdAt: string;
}

export default function CommitCard({
    sha,
    commitType,
    message,
    repo,
    branch,
    createdAt,
}: CardInfoProps) {
    const router = useRouter();
    const { label, bg, text } = typeClassMap[commitType];

    const [isVisible, setIsVisible] = useState(false);

    const shortSha = sha.substring(0, 6);

    const moveToCommitMemoir = () => {
        router.push(`${MEMBER_URL.commits}/${shortSha}/memoir`);
    };

    const newCreatedAt = new Date(createdAt);
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(newCreatedAt);

    return (
        <li className="border-border-primary1 border-b p-4">
            <article className="flex items-start gap-x-4">
                <div className="bg-primary2 flex h-10 w-10 items-center justify-center rounded-full">
                    <Image
                        src="/commit-blue.svg"
                        width={20}
                        height={16}
                        alt="커밋 아이콘"
                    />
                </div>
                <div className="flex flex-1 flex-col gap-y-1">
                    <div className="text-text-secondary2 mb-3 flex items-center gap-x-3 text-xs">
                        <p>{shortSha}</p>
                        <div
                            className={`shadow-border-primary1 rounded-lg px-3 py-1 font-semibold ${bg} ${text} shadow-sm`}
                        >
                            {label}
                        </div>
                        <p className="ml-auto">{formattedDate}</p>
                    </div>
                    <h3
                        className={`line-clamp-${isVisible ? 0 : 1} mr-30 font-semibold`}
                        onClick={() => {
                            setIsVisible(!isVisible);
                        }}
                    >
                        {message}
                    </h3>
                    <div className="flex items-center gap-x-3">
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="/branch.svg"
                                alt="브랜치 아이콘"
                                width={14}
                                height={12}
                            />
                            <p>{repo}</p>
                        </div>
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="/code.svg"
                                alt="코드 아이콘"
                                width={18}
                                height={14}
                            />
                            {branch}
                        </div>
                        <div className="ml-auto">
                            <Button
                                type="lined"
                                htmlType="button"
                                onClick={moveToCommitMemoir}
                            >
                                <Image
                                    src="/write.svg"
                                    alt="회고 등록 아이콘"
                                    width={12}
                                    height={12}
                                />
                                회고록 작성
                            </Button>
                        </div>
                    </div>
                </div>
            </article>
        </li>
    );
}
