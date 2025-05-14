import Image from "next/image";

interface LabelBadgeProps {
    type: "open" | "merged";
}

const typeClassMap: Record<
    LabelBadgeProps["type"],
    { bg: string; text: string; label: string; icon: string }
> = {
    open: {
        label: "open",
        bg: "bg-[#d1fae5]",
        text: "text-[#065f46]",
        icon: "pull-request-green.svg",
    },
    merged: {
        label: "merged",
        bg: "bg-[#e0f2fe]",
        text: "text-[#1e40af]",
        icon: "pull-request-blue.svg",
    },
};

export default function PrCard() {
    return (
        <li className="border-border-primary1 border-b p-4 last:border-b-0">
            <article className="flex items-start gap-x-4">
                <div
                    className={`${typeClassMap.open.bg} flex h-10 w-10 items-center justify-center rounded-full`}
                >
                    <Image
                        src={typeClassMap.open.icon}
                        width={14}
                        height={16}
                        alt="커밋 아이콘"
                    />
                </div>
                <div className="flex flex-1 flex-col gap-y-1">
                    <div className="flex items-center gap-x-3">
                        <h3 className="font-semibold">
                            Fix navigation bug in dashboard component
                        </h3>
                        <div
                            className={`shadow-border-primary1 rounded-lg px-3 py-1 font-semibold ${typeClassMap.open.bg} ${typeClassMap.open.text} text-xs shadow-sm`}
                        >
                            {typeClassMap.open.label}
                        </div>
                        <p className="text-text-secondary2 ml-auto text-xs">
                            2 hours ago
                        </p>
                    </div>
                    <p className="text-text-secondary2 text-sm">
                        Implements JWT-based authentication system with login
                        and registration flows.
                    </p>
                    <div className="flex items-center gap-x-3">
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="branch.svg"
                                alt="브랜치 아이콘"
                                width={14}
                                height={12}
                            />
                            <p>frontend-app</p>
                        </div>
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="code.svg"
                                alt="코드 아이콘"
                                width={18}
                                height={14}
                            />
                            bugfix/nav-issue
                        </div>
                        {/* <div className="ml-auto">
                                    <Button type="lined" htmlType="button">
                                        <Image
                                            src="write.svg"
                                            alt="회고 등록 아이콘"
                                            width={12}
                                            height={12}
                                        />
                                        Write Memoir
                                    </Button>
                                </div> */}
                    </div>
                </div>
            </article>
        </li>
    );
}
