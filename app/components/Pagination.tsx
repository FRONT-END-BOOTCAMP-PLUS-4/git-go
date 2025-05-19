interface PaginationProps {
    currentPage: number;
    totalCount: number;
}

export default function Pagination({
    currentPage,
    totalCount,
}: PaginationProps) {
    console.log("currentPage: ", currentPage);
    console.log("totalCount: ", totalCount);
    return (
        <>
            <ul className="flex justify-center gap-x-4">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
        </>
    );
}
