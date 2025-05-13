import FileList from "./FileList";

export type FileNode = {
    name: string;
    children?: FileNode[];
    changes?: string[];
};

type FileTreeProps = {
    treeData: FileNode[];
    onSelect: (fileName: string) => void;
};

export default function FileTree({ treeData, onSelect }: FileTreeProps) {
    return (
        <div className="w-full max-w-72 bg-[#f9fafb] p-4">
            <FileList nodes={treeData} depth={0} onSelect={onSelect} />
        </div>
    );
}
