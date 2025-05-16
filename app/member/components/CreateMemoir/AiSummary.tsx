import Image from "next/image";
import { useState } from "react";

const AI_MOCK_DATA = {
    summaries: ["1번 테스트", "2번 테스트", "3번 테스트", "4번 테스트"],
    technicalImpact:
        "Enhanced security through proper token management and password hashing. Improved scalability with connection pooling.",
};

export default function AiSummary() {
    const [isSummarized, setIsSummarized] = useState(false);

    return (
        <div className="bg-bg-secondary1 flex h-60 w-full flex-col gap-3 overflow-y-auto rounded-md px-5 py-2">
            {/* 버튼만 보일 때 */}
            {!isSummarized ? (
                <div className="flex flex-1 items-center justify-center">
                    <button
                        className="bg-primary7 hover:bg-primary8 rounded-md px-4 py-2 text-white hover:cursor-pointer"
                        onClick={() => setIsSummarized(true)}
                    >
                        AI 요약하기
                    </button>
                </div>
            ) : (
                /* 요약 결과 보여줄 때 */
                <>
                    <div className="flex items-center gap-2">
                        <Image
                            className="h-6 w-6"
                            src="/ai-summaries.svg"
                            alt="ai_image"
                            width={24}
                            height={24}
                        />
                        <div className="text-primary7">AI 요약</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-primary7">주요 변경점</div>
                        <ul className="space-y-1">
                            {AI_MOCK_DATA.summaries.map((item, idx) => (
                                <li key={idx} className="my-2">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-primary7">기술적 임팩트</div>
                        <div>{AI_MOCK_DATA.technicalImpact}</div>
                    </div>
                </>
            )}
        </div>
    );
}
