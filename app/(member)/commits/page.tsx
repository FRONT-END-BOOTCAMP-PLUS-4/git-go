export default function CommitPage() {
    // TODO: 사이드바와 탭 부분은 공통 컴포넌트로 작성해서 각 페이지마다 넣기.
    return (
        <div className="layout-padding bg-bg-primary1 flex gap-x-6 py-6">
            <aside className="border-border-primary1 h-fit min-w-47 rounded-lg border-1 bg-white">
                <h2 className="border-border-primary1 border-b p-4">
                    Repositories
                </h2>
                <ul>
                    <li className="border-border-primary1 border-b px-2 py-2 last:border-b-0">
                        <a href="/(member)/commits">frontend-app</a>
                    </li>{" "}
                    <li className="border-border-primary1 border-b px-2 py-2 shadow-inner shadow-amber-400 last:border-b-0">
                        <a href="/(member)/commits">backend-app</a>
                    </li>
                    <li className="border-border-primary1 border-b p-2 last:border-b-0">
                        <a href="/(member)/commits">api</a>
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
                            {Date().toLocaleString()}
                        </p>
                    </section>

                    <ul>
                        <li className="p-4">
                            <a href="/(member)/commits/1">커밋 1</a>
                        </li>
                        <li className="p-4">
                            <a href="/(member)/commits/2">커밋 2</a>
                        </li>
                        <li className="p-4">
                            <a href="/(member)/commits/3">커밋 3</a>
                        </li>
                        <li className="p-4">
                            <a href="/(member)/commits/4">커밋 4</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
