import { FileChangeType } from "@/types/github/CommitType";

type FileListProps = {
    files: FileChangeType[];
    onSelect: (fileName: string) => void;
};

export default function FileList({ files, onSelect }: FileListProps) {
    // console.log("files: ", files);
    return (
        <ul>
            {files.map((commit) => (
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
