"use client";
import Button from "@/app/components/Button";
import Image from "next/image";
import { use, useState } from "react";

export default function SideBar({
    setOpen,
}: {
    setOpen: (open: boolean) => void;
}) {
    const [selectedBranch, setSelectedBranch] = useState("frontend-app");

    const branches = [
        { name: "frontend-app", icon: "branch-blue.svg" },
        { name: "backend-app", icon: "branch.svg" },
        { name: "api", icon: "branch.svg" },
    ];

    return (
        <aside className="border-border-primary1 h-fit min-w-47 rounded-lg border-1 bg-white">
            <h2 className="border-border-primary1 border-b p-4 font-semibold">
                Repositories
            </h2>
            <ul className="flex flex-col gap-y-1 p-2">
                {branches.map((branch) => {
                    const isSelected = branch.name === selectedBranch;
                    return (
                        <li
                            key={branch.name}
                            className="border-border-primary1"
                        >
                            <button
                                className={`flex w-full items-center gap-x-2 rounded-md p-2 font-semibold ${
                                    isSelected
                                        ? "bg-primary2 text-primary7"
                                        : ""
                                }`}
                                onClick={() => setSelectedBranch(branch.name)}
                            >
                                <Image
                                    src={
                                        isSelected
                                            ? "branch-blue.svg"
                                            : "branch.svg"
                                    }
                                    width={14}
                                    height={14}
                                    alt="브랜치 아이콘"
                                />
                                {branch.name}
                            </button>
                        </li>
                    );
                })}
            </ul>
            <section className="border-border-primary1 border-t p-3">
                <Button type="lined" size="full" onClick={() => setOpen(true)}>
                    <Image
                        src="plus-gray.svg"
                        width={10.5}
                        height={16}
                        alt="저장소 추가 아이콘"
                    />
                    저장소 추가
                </Button>
            </section>
        </aside>
    );
}
