// components/SettingsSkeleton.tsx
"use client";

export default function SettingsSkeleton() {
    return (
        <div className="flex justify-center">
            <div className="border-border-primary1 bg-bg-member1 m-4 w-full max-w-[880px] animate-pulse rounded-lg border">
                {/* 상단 제목 */}
                <div className="border-border-primary1 border-b p-4 text-xl font-semibold">
                    <div className="bg-bg-skeleton2 h-6 w-12 rounded"></div>
                </div>

                <div className="space-y-6 p-6">
                    {/* AI 하루 할당량 스켈레톤 */}
                    <div className="border-border-primary1 space-y-3 border-b pb-4">
                        <div className="bg-bg-skeleton2 h-5 w-32 rounded"></div>{" "}
                        {/* 제목 */}
                        <div className="bg-bg-skeleton1 relative h-2 w-full rounded">
                            <div
                                className="bg-bg-skeleton2 absolute top-0 left-0 h-2 rounded"
                                style={{ width: "60%" }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                            <div className="bg-bg-skeleton2 h-4 w-28 rounded"></div>
                            <div className="bg-bg-skeleton2 h-4 w-12 rounded"></div>
                        </div>
                        <div className="bg-bg-skeleton2 h-4 w-48 rounded"></div>{" "}
                        {/* 리셋 날짜 */}
                    </div>

                    {/* 테마 설정 */}
                    <div className="border-border-primary1 mb-3 space-y-3 border-b pb-4">
                        <div className="bg-bg-skeleton2 h-4 w-32 rounded"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-bg-skeleton1 h-[40px] w-full rounded"></div>
                            <div className="bg-bg-skeleton1 h-[40px] w-full rounded"></div>
                        </div>
                    </div>

                    {/* 커밋 가져오기 설정 */}
                    <div className="border-border-primary1 mb-3 space-y-3 border-b py-4">
                        <div className="bg-bg-skeleton2 h-4 w-40 rounded"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-bg-skeleton1 h-[40px] w-full rounded"></div>
                            <div className="bg-bg-skeleton1 h-[40px] w-full rounded"></div>
                        </div>
                    </div>

                    {/* 계정 관리 */}
                    <div className="mb-4 space-y-3 py-4">
                        <div className="bg-bg-skeleton2 h-4 w-28 rounded"></div>
                        <div className="bg-bg-skeleton1 h-[40px] w-32 rounded"></div>
                        <div className="bg-bg-skeleton1 h-3 w-60 rounded"></div>
                    </div>

                    {/* 저장 버튼 영역 */}
                    <div className="flex justify-end gap-2">
                        <div className="bg-bg-skeleton1 flex h-[38px] w-[48px] items-center justify-center rounded"></div>
                        <div className="bg-bg-skeleton1 flex h-[38px] w-[48px] items-center justify-center rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
