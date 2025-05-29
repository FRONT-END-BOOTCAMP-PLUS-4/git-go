export default function SettingsSkeleton() {
    return (
        <div className="flex justify-center">
            <div className="border-border-primary1 bg-bg-member1 m-4 w-full max-w-[880px] animate-pulse rounded-lg border">
                {/* 상단 제목 */}
                <div className="border-border-primary1 border-b p-4 text-xl font-semibold">
                    <div className="h-6 w-12 rounded bg-gray-300"></div>
                </div>

                <div className="p-6">
                    {/* 테마 설정 */}
                    <div className="border-border-primary1 mb-3 space-y-3 border-b pb-4">
                        <div className="h-4 w-32 rounded bg-gray-300"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-[40px] w-full rounded bg-gray-200"></div>
                            <div className="h-[40px] w-full rounded bg-gray-200"></div>
                        </div>
                    </div>

                    {/* 커밋 가져오기 설정 */}
                    <div className="border-border-primary1 mb-3 space-y-3 border-b py-4">
                        <div className="h-4 w-40 rounded bg-gray-300"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-[40px] w-full rounded bg-gray-200"></div>
                            <div className="h-[40px] w-full rounded bg-gray-200"></div>
                        </div>
                    </div>

                    {/* 계정 관리 */}
                    <div className="mb-4 space-y-3 py-4">
                        <div className="h-4 w-28 rounded bg-gray-300"></div>
                        <div className="h-[40px] w-32 rounded bg-gray-200"></div>
                        <div className="h-3 w-60 rounded bg-gray-100"></div>
                    </div>

                    {/* 저장 버튼 영역 */}
                    <div className="flex justify-end gap-2">
                        <div className="flex h-[38px] w-[48px] items-center justify-center rounded bg-gray-200"></div>
                        <div className="flex h-[38px] w-[48px] items-center justify-center rounded bg-gray-200"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
