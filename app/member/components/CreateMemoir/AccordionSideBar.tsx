import useBuildFileTree from "@/hooks/useBuildFileTree";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FileNodeComponent from "./FileNodeComponent";

type AccordionSidebarProps = {
    files: string[];
    selectedFile: string | null;
    onSelect: (filename: string) => void;
};

export default function AccordionSidebar({
    files,
    selectedFile,
    onSelect,
}: AccordionSidebarProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const tree = useBuildFileTree(files.map((file) => ({ filename: file })));

    const prevWidthRef = useRef<number>(
        typeof window !== "undefined" ? window.innerWidth : 0
    );

    useEffect(() => {
        const handleResize = () => {
            const currentWidth = window.innerWidth;
            const prevWidth = prevWidthRef.current;

            // 작아질 때만 자동 닫기
            if (currentWidth < 880 && currentWidth < prevWidth) {
                setSidebarOpen(false);
            }

            prevWidthRef.current = currentWidth; // 현재 값을 저장
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!sidebarOpen) {
        return (
            <button
                onClick={() => setSidebarOpen(true)}
                className="bg-bg-primary1 text-text-primary1 top-[65px] left-0 flex min-w-14 cursor-pointer p-4 shadow-md"
            >
                <ChevronsRight />
            </button>
        );
    }

    return (
        <div className="bg-bg-primary1 top-[65px] left-0 z-40 flex h-full max-w-[100px] min-w-fit flex-col truncate overflow-x-auto p-4 shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold">Changed Files</h2>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-text-primary1 cursor-pointer"
                >
                    <ChevronsLeft />
                </button>
            </div>

            <div className="overflow-y-auto">
                {tree.map((node) => (
                    <FileNodeComponent
                        key={node.path}
                        node={node}
                        onSelect={onSelect}
                        selectedFile={selectedFile}
                    />
                ))}
            </div>
        </div>
    );
}
