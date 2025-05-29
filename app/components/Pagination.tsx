interface PaginationProps {
    currentPage: number;
    totalCount: number;
    perPage: number;
    setCurrentPage: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalCount,
    perPage,
    setCurrentPage,
}: PaginationProps) {
    const totalPages = Math.ceil(totalCount / perPage);

    // 페이지 그룹 계산 (한 번에 5개의 페이지 번호만 보여줌)
    const pageGroupSize = 5;
    const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
    const start = currentGroup * pageGroupSize + 1;
    const end = Math.min(start + pageGroupSize - 1, totalPages);

    if (totalCount === 0) return null;

    return (
        <div className="flex items-center justify-center gap-2 p-4">
            {/* 첫 페이지 버튼 */}
            <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="text-text-primary1 hover:bg-primary1 disabled:text-text-secondary2 cursor-pointer rounded-md px-2 py-2 text-sm hover:text-black"
            >
                {"<<"}
            </button>

            {/* 이전 버튼 */}
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-text-primary1 hover:bg-primary1 disabled:text-text-secondary2 cursor-pointer rounded-md px-2 py-2 text-sm hover:text-black"
            >
                {"<"}
            </button>

            {/* 페이지 번호 */}
            {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
                (page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`cursor-pointer rounded-md px-3 py-2 text-sm ${
                            currentPage === page
                                ? "bg-primary7 text-white"
                                : "text-text-primary1 hover:bg-primary1 hover:text-black"
                        }`}
                    >
                        {page}
                    </button>
                )
            )}

            {/* 다음 버튼 */}
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-text-primary1 hover:bg-primary1 disabled:text-text-secondary2 cursor-pointer rounded-md px-2 py-2 text-sm hover:text-black"
            >
                {">"}
            </button>

            {/* 마지막 페이지 버튼 */}
            <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="text-text-primary1 hover:bg-primary1 disabled:text-text-secondary2 cursor-pointer rounded-md px-2 py-2 text-sm hover:text-black"
            >
                {">>"}
            </button>
        </div>
    );
}
