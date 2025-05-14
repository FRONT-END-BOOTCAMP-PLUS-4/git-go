import { useDeviceType } from "@/hooks/useDeviceType";
import { CommitType } from "@/types/CommitType";
import { PanelLeft, X } from "lucide-react";
import { useMemo, useState } from "react";
import FileList from "./FileList";

type FileTreeProps = {
    commits: CommitType[];
    onSelect: (fileName: string) => void;
};

export default function FileTree({ commits, onSelect }: FileTreeProps) {
    const { isTablet } = useDeviceType();
    const [isOpened, setIsOpened] = useState(false);
    const toggle = () => setIsOpened((p) => !p);

    // 파일 선택시 FileList 리렌더링 방지
    const memoizedFileList = useMemo(
        () => <FileList commits={commits} onSelect={onSelect} />,
        [commits, onSelect]
    );

    return (
        <div className="relative">
            <div className="h-full w-16 lg:w-72" />
            {/* 1) 토글 버튼 (항상 상단에) */}
            {isTablet && !isOpened && (
                <div
                    className="fixed top-16 z-60 h-screen w-16 rounded"
                    onClick={toggle}
                    aria-label="Toggle file tree"
                >
                    <div className="mx-auto block w-fit hover:cursor-pointer">
                        <PanelLeft />
                    </div>
                </div>
            )}

            {/* 2) 백드롭 */}
            {isTablet && isOpened && (
                <div
                    className="fixed inset-0 z-40 bg-black/30"
                    onClick={toggle}
                />
            )}

            {/* 3) 사이드바 */}
            {(isOpened || !isTablet) && (
                <>
                    <aside
                        className={`fixed left-0 z-10 h-full w-72 overflow-y-auto transition-transform duration-300 ${
                            !isTablet ? "top-16" : isOpened ? "top-0" : "top-16"
                        } ${
                            isTablet
                                ? isOpened
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                                : "translate-x-0"
                        } bg-bg-primary1`}
                    >
                        <div className="relative p-4">
                            {isTablet && isOpened && (
                                <button
                                    className="absolute top-1 right-1 hover:cursor-pointer"
                                    onClick={toggle}
                                >
                                    <X />
                                </button>
                            )}
                            {memoizedFileList}
                        </div>
                    </aside>
                </>
            )}
        </div>
    );
}
