import { useEffect, useRef } from "react";
import { FileNode } from "./FileTree";

type ChangeListProps = {
    treeData: FileNode[];
    selectedFile: string | null;
};

export default function ChangeList({
    treeData,
    selectedFile,
}: ChangeListProps) {
    const refs = useRef<Record<string, HTMLLIElement | null>>({});

    // selectedFile이 바뀔 때 스크롤
    useEffect(() => {
        if (selectedFile && refs.current[selectedFile]) {
            refs.current[selectedFile]!.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [selectedFile]);

    // 재귀적으로 노드를 렌더링하는 함수
    const renderNodes = (nodes: FileNode[]) => (
        <ul>
            {nodes.map((node) => (
                <li className="my-2" key={node.name}>
                    {/* 파일/폴더 이름 */}
                    <div ref={(el) => (refs.current[node.name] = el)}>
                        {node.name}
                    </div>

                    {/* 변경사항이 있으면 리스트로 */}
                    {node.changes && (
                        <ul className="ml-4 space-y-1">
                            {node.changes.map((change) => (
                                <li
                                    key={change}
                                    className={`my-2 ${change.startsWith("+") ? "text-green-600" : "text-red-600"} `}
                                >
                                    {change}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* 자식 노드가 있으면 재귀 호출 */}
                    {node.children && (
                        <div className="ml-4">{renderNodes(node.children)}</div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="w-full max-w-[575px] overflow-auto p-4">
            {renderNodes(treeData)}
        </div>
    );
}
