import { FileNode } from "./FileTree";

type FileListProps = {
    nodes: FileNode[];
    depth?: number;
    onSelect: (fileName: string) => void;
};

export default function FileList({
    nodes,
    depth = 0,
    onSelect,
}: FileListProps) {
    return (
        <div>
            {nodes.map((node) => {
                const isFile = !!node.changes; // 변경사항이 있으면 파일로 간주

                return (
                    <div
                        className="my-2"
                        key={node.name}
                        style={{ paddingLeft: depth * 16 }}
                    >
                        <span
                            className={`truncate ${isFile ? "cursor-pointer hover:underline" : ""} `}
                            onClick={() => isFile && onSelect(node.name)}
                        >
                            {node.name}
                        </span>

                        {node.children && (
                            <FileList
                                nodes={node.children}
                                depth={depth + 1}
                                onSelect={onSelect}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
