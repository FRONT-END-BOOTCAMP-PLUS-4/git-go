"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type FileNode = {
    name: string;
    path: string;
    children?: FileNode[];
    isFile?: boolean;
};

type Props = {
    node: FileNode;
    onSelect: (path: string) => void;
    selectedFile: string | null;
};

export default function FileNodeComponent({
    node,
    onSelect,
    selectedFile,
}: Props) {
    const [open, setOpen] = useState(true);

    const isSelected = selectedFile === node.path;

    if (node.isFile) {
        return (
            <li
                className={`my-0.5 cursor-pointer pl-2 text-sm hover:underline ${
                    isSelected ? "text-primary7" : "text-text-secondary1"
                }`}
                onClick={() => onSelect(node.path)}
            >
                {`📄 ${node.name}`}
            </li>
        );
    }

    return (
        <div>
            <button
                className="flex w-full cursor-pointer items-center py-1 text-left text-sm hover:bg-gray-200"
                onClick={() => setOpen(!open)}
            >
                {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span>{`📁 ${node.name}`}</span>
            </button>
            <div
                className={`cursor-pointer overflow-hidden transition-all duration-300 ${
                    open ? "max-h-[500px]" : "max-h-0"
                }`}
            >
                <ul className="ml-2 cursor-pointer">
                    {node.children?.map((child) => (
                        <FileNodeComponent
                            key={child.path}
                            node={child}
                            onSelect={onSelect}
                            selectedFile={selectedFile}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
