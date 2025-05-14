"use client";

import { X } from "lucide-react";

const MOCK = ["React", "Next", "Tailwind"];

export default function Editor() {
    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-1">
                <div>제목</div>
                <div>
                    <input
                        className="border-primary1 w-full rounded-md border px-3 py-2 placeholder:text-sm"
                        placeholder="회고록 제목을 입력하세요."
                        type="text"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div>태그</div>
                <div>
                    <input
                        className="border-primary1 w-full rounded-md border px-3 py-2 placeholder:text-sm"
                        placeholder="태그를 입력하고 Enter를 누르세요."
                    />
                </div>
                <div className="mt-2 flex gap-3">
                    {MOCK.map((tag) => {
                        return (
                            <div
                                className="bg-bg-primary2 flex items-center gap-2 rounded-md p-2"
                                key={tag}
                            >
                                <div>{tag}</div>

                                <X
                                    className="hover:cursor-pointer hover:opacity-50"
                                    size={16}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-1">
                <div>회고록 작성</div>
                <div className="flex-1">
                    <textarea
                        className="border-border1 h-full min-h-40 w-full resize-none rounded-md border px-3 py-2"
                        placeholder="변경사항에 대한 회고를 작성하세요."
                    />
                </div>
            </div>
        </div>
    );
}
