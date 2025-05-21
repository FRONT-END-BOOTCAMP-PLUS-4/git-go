export default function PrCardSkeleton() {
    return (
        <li className="border-border-primary1 animate-pulse border-b p-4 last:border-b-0">
            <article className="flex items-start gap-x-4">
                {/* 아이콘 자리 */}
                <div className="h-10 w-10 rounded-full bg-gray-200" />

                <div className="flex flex-1 flex-col gap-y-3">
                    {/* 상단 타이틀, 상태, 날짜 영역 */}
                    <div className="flex items-center gap-x-3">
                        {/* 타이틀 스켈레톤 */}
                        <div className="h-6 w-48 rounded bg-gray-300" />
                        {/* 상태 배지 스켈레톤 */}
                        <div className="h-5 w-16 rounded bg-gray-200" />
                        {/* 날짜 스켈레톤 */}
                        <div className="ml-auto h-5 w-20 rounded bg-gray-200" />
                    </div>

                    {/* URL 링크 스켈레톤 */}
                    <div className="h-4 w-72 rounded bg-gray-200" />

                    {/* 하단 브랜치, 리포지토리, 버튼 영역 */}
                    <div className="flex items-center gap-x-3">
                        {/* 리포지토리 이름 자리 */}
                        <div className="flex items-center gap-x-1">
                            <div className="h-4 w-4 rounded bg-gray-200" />
                            <div className="h-4 w-24 rounded bg-gray-200" />
                        </div>

                        {/* 브랜치 이름 자리 */}
                        <div className="flex items-center gap-x-1">
                            <div className="h-4 w-5 rounded bg-gray-200" />
                            <div className="h-4 w-20 rounded bg-gray-200" />
                        </div>

                        {/* 오른쪽 버튼 자리 */}
                        <div className="ml-auto h-8 w-24 rounded bg-gray-200" />
                    </div>
                </div>
            </article>
        </li>
    );
}
