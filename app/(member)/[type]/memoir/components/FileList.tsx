import { CommitType } from "@/types/CommitType";

type FileListProps = {
    commits: CommitType[];
    onSelect: (fileName: string) => void;
};

export default function FileList({ commits, onSelect }: FileListProps) {
    // console.log("commits: ", commits);
    return (
        <ul>
            {commits.map((commit) => (
                <li
                    className="inline-block truncate hover:cursor-pointer hover:underline"
                    key={commit.sha}
                    onClick={() => onSelect(commit.filename)}
                >
                    {commit.filename}
                </li>
            ))}
        </ul>
    );
}
