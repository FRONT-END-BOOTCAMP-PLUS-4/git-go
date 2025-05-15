import Button from "@/app/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LabelBadgeProps {
    type: "bugfix" | "feature" | "refactor";
}

const typeClassMap: Record<
    LabelBadgeProps["type"],
    { bg: string; text: string; label: string }
> = {
    bugfix: {
        label: "bugfix",
        bg: "bg-[#fee2e2]",
        text: "text-[#991b1b]",
    },
    feature: {
        label: "feature",
        bg: "bg-[#d1fae5]",
        text: "text-[#065f46]",
    },
    refactor: {
        label: "refactor",
        bg: "bg-[#e0f2fe]",
        text: "text-[#1e40af]",
    },
};

export default function CommitCard({ type }: LabelBadgeProps) {
    const route = useRouter();
    const { label, bg, text } = typeClassMap[type];

    const moveToCommitMemoir = () => {
        route.push("/commits/1234/memoir");
    };

    return (
        <li className="border-border-primary1 border-b p-4 last:border-b-0">
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
                    <div className="text-text-secondary2 flex items-center gap-x-3 text-xs">
                        <p>bd2a0c2</p>
                        <div
                            className={`shadow-border-primary1 rounded-lg px-3 py-1 font-semibold ${bg} ${text} shadow-sm`}
                        >
                            {label}
                        </div>
                        <p className="ml-auto">2 hours ago</p>
                    </div>
                    <h3 className="font-semibold">
                        Fix navigation bug in dashboard component
                    </h3>
                    <div className="flex items-center gap-x-3">
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="/branch.svg"
                                alt="브랜치 아이콘"
                                width={14}
                                height={12}
                            />
                            <p>frontend-app</p>
                        </div>
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="/code.svg"
                                alt="코드 아이콘"
                                width={18}
                                height={14}
                            />
                            bugfix/nav-issue
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
                                Write Memoir
                            </Button>
                        </div>
                    </div>
                </div>
            </article>
        </li>
    );
}
