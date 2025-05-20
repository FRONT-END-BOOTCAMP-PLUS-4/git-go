interface PrCommitCardProps {
    sha: string;
    message: string;
    additions: number;
    deletions: number;
    authorName: string;
    authoredDate: string;
}

export default function PrCommitCard({
    sha,
    message,
    additions,
    deletions,
    authorName,
    authoredDate,
}: PrCommitCardProps) {
    const shortSha = sha.substring(0, 6);

    const newAuthoredDate = new Date(authoredDate);
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(newAuthoredDate);

    return (
        <li className="border-border-primary1 flex flex-col gap-y-1 border-b px-4 py-3 last:border-b-0">
            <div className="flex items-center gap-x-3 text-sm">
                <p className="text-text-secondary2">{shortSha}</p>
                <p className="line-clamp-1">{message}</p>
                <p className="text-text-secondary2 ml-auto shrink-0">
                    {formattedDate}
                </p>
            </div>
            <div className="text-text-secondary2 flex items-center gap-x-3 text-xs">
                <p>{authorName}</p>
                <p>
                    <span className="text-green-500">{`+${additions}`}</span>
                    {"  "}
                    <span className="text-red-500">{`-${deletions}`}</span>
                </p>
            </div>
        </li>
    );
}
