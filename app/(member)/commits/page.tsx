import CommitCard from "@/app/(member)/commits/components/CommitCard";
import Button from "@/app/components/Button";
import Image from "next/image";

export default function CommitPage() {
    // TODO: 사이드바와 탭 부분은 공통 컴포넌트로 작성해서 각 페이지마다 넣기.

    const date = new Date().toLocaleString();
    const onlyDate = date.split(", ")[0];
    const dateObj = new Date(onlyDate);

    // 현재 날짜를 한국어 형식으로 포맷팅
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(dateObj);

    return (
        <div className="layout-padding bg-bg-primary1 flex gap-x-6 py-6">
            <aside className="border-border-primary1 h-fit min-w-47 rounded-lg border-1 bg-white">
                <h2 className="border-border-primary1 border-b p-4 font-semibold">
                    Repositories
                </h2>
                <ul className="flex flex-col gap-y-1 p-2">
                    <li className="border-border-primary1">
                        <button className="bg-primary2 text-primary7 flex w-full items-center gap-x-2 rounded-md p-2 font-semibold">
                            <Image
                                src="branch-blue.svg"
                                width={14}
                                height={14}
                                alt="브랜치 아이콘"
                            />
                            frontend-app
                        </button>
                    </li>
                    <li className="border-border-primary1">
                        <button className="flex items-center gap-x-2 p-2">
                            <Image
                                src="branch.svg"
                                width={14}
                                height={14}
                                alt="브랜치 아이콘"
                            />
                            backend-app
                        </button>
                    </li>
                    <li className="border-border-primary1">
                        <button className="flex items-center gap-x-2 p-2">
                            <Image
                                src="branch.svg"
                                width={14}
                                height={14}
                                alt="브랜치 아이콘"
                            />
                            api
                        </button>
                    </li>
                </ul>
                <section className="border-border-primary1 border-t p-3">
                    <Button type="lined" size="full">
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

            <div className="w-full">
                <nav className="bg-white">
                    <ul className="mb-6 flex gap-x-4">
                        <li>
                            <a href="/(member)/commits">커밋</a>
                        </li>
                        <li>
                            <a href="/(member)/pull-requests">Pull Request</a>
                        </li>
                        <li>
                            <a href="/(member)/memoirs">내 회고록</a>
                        </li>
                        <li>
                            <a href="/(member)/memoirs">통계</a>
                        </li>
                    </ul>
                </nav>
                <div className="border-border-primary1 rounded-lg border-1 bg-white">
                    <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                        <h2 className="font-bold">최근 활동</h2>
                        <p className="text-text-secondary2 text-sm">
                            {formattedDate}
                        </p>
                    </section>

                    <ul>
                        {/* CommitCard 의 props 로 커밋의 타입을 지정 - bugfix | feature | refactor */}
                        <CommitCard type="bugfix" />
                        <CommitCard type="feature" />
                        <CommitCard type="refactor" />
                        <CommitCard type="bugfix" />
                    </ul>
                </div>
            </div>
        </div>
    );
}
