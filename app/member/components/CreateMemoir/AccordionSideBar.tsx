"use client";
import { useState, useEffect } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import useBuildFileTree from "@/hooks/useBuildFileTree";
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
    const tree = useBuildFileTree(files.map((f) => ({ filename: f })));

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        };

        handleResize(); // 처음 렌더링 시 체크
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!sidebarOpen) {
        return (
            <button
                onClick={() => setSidebarOpen(true)}
                className="bg-bg-primary1 top-[65px] left-0 flex min-w-14 cursor-pointer rounded p-4 text-gray-600 shadow-md"
            >
                <ChevronsRight />
            </button>
        );
    }

    return (
        <div className="bg-bg-primary1 top-[65px] left-0 z-40 flex h-screen w-52 min-w-46 flex-col overflow-x-auto p-4 shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold">Changed Files</h2>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="cursor-pointer text-gray-600 hover:text-black"
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
