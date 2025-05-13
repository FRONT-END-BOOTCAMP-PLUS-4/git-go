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
                <ul>
                    <li className="border-border-primary1 border-b p-4 last:border-b-0">
                        <button className="flex items-center gap-x-2">
                            <Image
                                src="pull-request.svg"
                                width={14}
                                height={14}
                                alt="브랜치 아이콘"
                            />
                            frontend-app
                        </button>
                    </li>{" "}
                    <li className="border-border-primary1 border-b p-4 last:border-b-0">
                        <button className="flex items-center gap-x-2">
                            <Image
                                src="pull-request.svg"
                                width={14}
                                height={14}
                                alt="브랜치 아이콘"
                            />
                            backend-app
                        </button>
                    </li>
                    <li className="border-border-primary1 border-b p-4 last:border-b-0">
                        <button className="flex items-center gap-x-2">
                            <Image
                                src="pull-request.svg"
                                width={14}
                                height={14}
                                alt="브랜치 아이콘"
                            />
                            api
                        </button>
                    </li>
                </ul>
                <section className="border-border-primary1 border-t p-4">
                    <button>저장소 추가</button>
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
                        <li className="border-border-primary1 border-b p-4 last:border-b-0">
                            <article className="flex items-start gap-x-4">
                                <div className="bg-primary2 flex h-10 w-10 items-center justify-center rounded-full">
                                    <Image
                                        src="commit-blue.svg"
                                        width={20}
                                        height={16}
                                        alt="커밋 아이콘"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-y-1">
                                    <div className="text-text-secondary2 flex items-center gap-x-3 text-xs">
                                        <p>bd2a0c2</p>
                                        <div className="shadow-border-primary1 rounded-lg bg-[#fee2e2] px-3 py-1 font-semibold text-[#991b1b] shadow-sm">
                                            bugfix
                                        </div>
                                        <p className="ml-auto">2 hours ago</p>
                                    </div>
                                    <h3 className="font-semibold">
                                        Fix navigation bug in dashboard
                                        component
                                    </h3>
                                    <div className="flex gap-x-3">
                                        <div className="flex items-center gap-x-1">
                                            <Image
                                                src="branch.svg"
                                                alt="브랜치 아이콘"
                                                width={14}
                                                height={12}
                                            />
                                            <p>frontend-app</p>
                                        </div>
                                        <div className="flex items-center gap-x-1">
                                            <Image
                                                src="code.svg"
                                                alt="코드 아이콘"
                                                width={18}
                                                height={14}
                                            />
                                            bugfix/nav-issue
                                        </div>
                                        <div className="ml-auto">
                                            <button className="border-border-primary1 shadow-border-primary1 flex gap-x-4 rounded-lg border-1 px-3 py-2.5 text-xs font-semibold shadow-sm">
                                                <Image
                                                    src="write.svg"
                                                    alt="회고 등록 아이콘"
                                                    width={12}
                                                    height={12}
                                                />
                                                Write Memoir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </li>
                        <li className="border-border-primary1 border-b p-4 last:border-b-0">
                            <article className="flex items-start gap-x-4">
                                <div className="bg-primary2 flex h-10 w-10 items-center justify-center rounded-full">
                                    <Image
                                        src="commit-blue.svg"
                                        width={20}
                                        height={16}
                                        alt="커밋 아이콘"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-y-1">
                                    <div className="text-text-secondary2 flex items-center gap-x-3 text-xs">
                                        <p>bd2a0c2</p>
                                        <div className="shadow-border-primary1 rounded-lg bg-[#DCFCE7] px-3 py-1 font-semibold text-[#166534] shadow-sm">
                                            feature
                                        </div>
                                        <p className="ml-auto">2 hours ago</p>
                                    </div>
                                    <h3 className="font-semibold">
                                        Fix navigation bug in dashboard
                                        component
                                    </h3>
                                    <div className="flex gap-x-3">
                                        <div className="flex items-center gap-x-1">
                                            <Image
                                                src="branch.svg"
                                                alt="브랜치 아이콘"
                                                width={14}
                                                height={12}
                                            />
                                            <p>frontend-app</p>
                                        </div>
                                        <div className="flex items-center gap-x-1">
                                            <Image
                                                src="code.svg"
                                                alt="코드 아이콘"
                                                width={18}
                                                height={14}
                                            />
                                            bugfix/nav-issue
                                        </div>
                                        <div className="ml-auto">
                                            <button className="border-border-primary1 shadow-border-primary1 flex gap-x-4 rounded-lg border-1 px-3 py-2.5 text-xs font-semibold shadow-sm">
                                                <Image
                                                    src="write.svg"
                                                    alt="회고 등록 아이콘"
                                                    width={12}
                                                    height={12}
                                                />
                                                Write Memoir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </li>
                        <li className="border-border-primary1 border-b p-4 last:border-b-0">
                            <article className="flex items-start gap-x-4">
                                <div className="bg-primary2 flex h-10 w-10 items-center justify-center rounded-full">
                                    <Image
                                        src="commit-blue.svg"
                                        width={20}
                                        height={16}
                                        alt="커밋 아이콘"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-y-1">
                                    <div className="text-text-secondary2 flex items-center gap-x-3 text-xs">
                                        <p>bd2a0c2</p>
                                        <div className="shadow-border-primary1 rounded-lg bg-[#DBEAFE] px-3 py-1 font-semibold text-[#1E40AF] shadow-sm">
                                            refactor
                                        </div>
                                        <p className="ml-auto">2 hours ago</p>
                                    </div>
                                    <h3 className="font-semibold">
                                        Fix navigation bug in dashboard
                                        component
                                    </h3>
                                    <div className="flex gap-x-3">
                                        <div className="flex items-center gap-x-1">
                                            <Image
                                                src="branch.svg"
                                                alt="브랜치 아이콘"
                                                width={14}
                                                height={12}
                                            />
                                            <p>frontend-app</p>
                                        </div>
                                        <div className="flex items-center gap-x-1">
                                            <Image
                                                src="code.svg"
                                                alt="코드 아이콘"
                                                width={18}
                                                height={14}
                                            />
                                            bugfix/nav-issue
                                        </div>
                                        <div className="ml-auto">
                                            <button className="border-border-primary1 shadow-border-primary1 flex gap-x-4 rounded-lg border-1 px-3 py-2.5 text-xs font-semibold shadow-sm">
                                                <Image
                                                    src="write.svg"
                                                    alt="회고 등록 아이콘"
                                                    width={12}
                                                    height={12}
                                                />
                                                Write Memoir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </li>
                        <li className="border-border-primary1 border-b p-4 last:border-b-0">
                            <article className="flex items-start gap-x-4">
                                <div className="bg-primary2 flex h-10 w-10 items-center justify-center rounded-full">
                                    <Image
                                        src="commit-blue.svg"
                                        width={20}
                                        height={16}
                                        alt="커밋 아이콘"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-y-1">
                                    <div className="text-text-secondary2 flex items-center gap-x-3 text-xs">
                                        <p>bd2a0c2</p>
                                        <div className="shadow-border-primary1 rounded-lg bg-[#fee2e2] px-3 py-1 font-semibold text-[#991b1b] shadow-sm">
                                            bugfix
                                        </div>
                                        <p className="ml-auto">2 hours ago</p>
                                    </div>
                                    <h3 className="font-semibold">
                                        Fix navigation bug in dashboard
                                        component
                                    </h3>
                                    <div className="flex gap-x-3">
                                        <div className="flex items-center gap-x-1">
                                            <Image
                                                src="branch.svg"
                                                alt="브랜치 아이콘"
                                                width={14}
                                                height={12}
                                            />
                                            <p>frontend-app</p>
                                        </div>
                                        <div className="flex items-center gap-x-1">
                                            <Image
                                                src="code.svg"
                                                alt="코드 아이콘"
                                                width={18}
                                                height={14}
                                            />
                                            bugfix/nav-issue
                                        </div>
                                        <div className="ml-auto">
                                            <button className="border-border-primary1 shadow-border-primary1 flex gap-x-4 rounded-lg border-1 px-3 py-2.5 text-xs font-semibold shadow-sm">
                                                <Image
                                                    src="write.svg"
                                                    alt="회고 등록 아이콘"
                                                    width={12}
                                                    height={12}
                                                />
                                                Write Memoir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
