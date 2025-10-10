import { ChevronsLeft, ChevronsRight } from "lucide-react";

import useBuildFileTree from "@/hooks/useBuildFileTree";
import { useState, useEffect } from "react";
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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const tree = useBuildFileTree(files.map((file) => ({ filename: file })));

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth < 768) {
                setSidebarOpen(true); // md 이하일 때 open
            } else {
                setSidebarOpen(false); // md 이상일 때 close
            }
        }
    }, []);

    if (!sidebarOpen) {
        return (
            <button
                onClick={() => setSidebarOpen(true)}
                className="bg-bg-primary1 text-text-primary1 top-[65px] left-0 flex min-w-14 cursor-pointer p-4 md:shadow-md"
            >
                <ChevronsRight />
            </button>
        );
    }

    return (
        <div className="bg-bg-primary1 pm-4 top-[65px] left-0 z-40 flex h-full w-full flex-col truncate pt-4 pl-4 shadow-md md:w-[25vw]">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold">Changed Files</h2>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-text-primary1 mr-4 hidden cursor-pointer md:block"
                >
                    <ChevronsLeft />
                </button>
            </div>

            <div className="overflow-x-auto overflow-y-auto">
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
