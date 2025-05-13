export default function CommitPage() {
    // TODO: 사이드바와 탭 부분은 공통 컴포넌트로 작성해서 각 페이지마다 넣기.
    return (
        <div className="layout-padding py-6 flex gap-x-6">
            <aside>
                <h2>사이드바</h2>
                <ul className="flex flex-col gap-y-2">
                    <li>
                        <a href="/(member)/commits">커밋</a>
                    </li>
                    <li>
                        <a href="/(member)/pull-requests">풀 리퀘스트</a>
                    </li>
                    <li>
                        <a href="/(member)/memoirs">회고</a>
                    </li>
                </ul>
            </aside>

            <div className="w-full">
                <nav>
                    <ul className="flex gap-x-4 mb-6 border-1">
                        <li>
                            <a href="/(member)/commits">커밋</a>
                        </li>
                        <li>
                            <a href="/(member)/pull-requests">풀 리퀘스트</a>
                        </li>
                        <li>
                            <a href="/(member)/memoirs">회고</a>
                        </li>
                    </ul>
                </nav>
                <div className="shadow-inner shadow-primary5">
                    <section className="flex justify-between items-center p-4">
                        <h2 className="font-bold">최근 활동</h2>
                        <p className="text-sm">{Date().toLocaleString()}</p>
                    </section>

                    <ul>
                        <li>
                            <a href="/(member)/commits/1">커밋 1</a>
                        </li>
                        <li>
                            <a href="/(member)/commits/1">커밋 1</a>
                        </li>
                        <li>
                            <a href="/(member)/commits/1">커밋 1</a>
                        </li>
                        <li>
                            <a href="/(member)/commits/1">커밋 1</a>
                        </li>
                        <li>
                            <a href="/(member)/commits/1">커밋 1</a>
                        </li>
                        <li>
                            <a href="/(member)/commits/1">커밋 1</a>
                        </li>
                        <li>
                            <a href="/(member)/commits/1">커밋 1</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
