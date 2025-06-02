"use client";

import Button from "@/app/components/Button";
import { GithubRepoDto } from "@/application/usecase/github/dto/GithubRepoDto";
import { useRepoStore } from "@/store/useRepoStore";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import AlertDialog from "./AlertDialog";
import ConfirmDialog from "./ConfirmDialog";
import RepoSkeleton from "./RepoSkeleton";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function RepoSelectModal({ open, onClose }: Props) {
    const [repos, setRepos] = useState<GithubRepoDto[]>([]);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [pendingForceSave, setPendingForceSave] = useState<{
        repoIds: string[];
    } | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (!open) return;

        const fetchRepos = async () => {
            setLoading(true);
            try {
                const [githubRes, userRes] = await Promise.all([
                    fetch("/api/github/repos"),
                    fetch("/api/repos/user"),
                ]);

                const githubRepos: GithubRepoDto[] = await githubRes.json();
                const userRepos: { id: string; name: string }[] =
                    await userRes.json();
                const userRepoIds = new Set(userRepos.map((r) => r.name));

                setRepos(
                    githubRepos.sort(
                        (a, b) =>
                            new Date(b.updatedAt).getTime() -
                            new Date(a.updatedAt).getTime()
                    )
                );
                setSelected(userRepoIds);
            } catch {
                alert("레포지토리를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [open]);

    const toggleRepo = (id: string) => {
        setSelected((prev) => {
            const copy = new Set(prev);
            copy.has(id) ? copy.delete(id) : copy.add(id);
            return copy;
        });
    };

    const handleSave = async () => {
        const repoIds = Array.from(selected);
        try {
            const res = await fetch("/api/repos/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ repoIds }),
            });

            if (res.ok) {
                setShowAlert(true);
            } else {
                const result = await res.text();
                if (result.startsWith("memoirs-exist:")) {
                    const failedIds = result.split(":")[1].split(",");
                    const idToNameMap = new Map(
                        repos.map((r) => [r.id, r.nameWithOwner])
                    );
                    const failedNames = failedIds.map(
                        (id) => idToNameMap.get(id) || id
                    );

                    setConfirmMessage(
                        `해당 저장소에 작성된 회고가 있습니다:\n\n${failedNames.join("\n")}\n\n연동 해제 시 회고가 삭제됩니다. 계속하시겠습니까?`
                    );
                    setPendingForceSave({ repoIds });
                    setShowConfirm(true);
                }
            }
        } catch (error) {
            alert("네트워크 오류가 발생했습니다.");
        }
    };

    const handleConfirm = async () => {
        if (!pendingForceSave) return;
        try {
            const res = await fetch("/api/repos/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...pendingForceSave, force: true }),
            });
            if (res.ok) {
                setShowAlert(true);
            } else {
                alert("강제 연동에 실패했습니다.");
            }
        } finally {
            setShowConfirm(false);
            setPendingForceSave(null);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-bg-primary2 w-full max-w-2xl rounded-xl p-6 shadow-lg">
                <div className="mb-1 flex items-center justify-between">
                    <h2 className="text-xl font-bold">연동할 저장소 선택</h2>
                    <button onClick={onClose} className="cursor-pointer">
                        <X className="opacity-60 hover:opacity-100" />
                    </button>
                </div>
                <p className="m-4 text-xs text-gray-400">
                    회고록을 작성할 GitHub 저장소를 선택해주세요. 선택한
                    저장소의 커밋 기록이 자동으로 동기화됩니다.
                </p>

                {loading ? (
                    <RepoSkeleton />
                ) : (
                    <ul className="border-border-primary1 max-h-[350px] divide-y overflow-y-auto rounded-md border">
                        {repos.map((repo) => (
                            <li
                                key={repo.id}
                                className="border-b-border-primary1 flex items-start justify-between p-4 last:border-b-0"
                            >
                                <div className="flex w-full flex-col gap-1">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2 truncate">
                                            <input
                                                type="checkbox"
                                                checked={selected.has(repo.id)}
                                                onChange={() =>
                                                    toggleRepo(repo.id)
                                                }
                                                className="mt-0.5 cursor-pointer"
                                            />
                                            <div className="text-text-primary1 flex items-center gap-2 truncate text-sm font-semibold">
                                                {repo.nameWithOwner}
                                                <span
                                                    className={`rounded px-2 py-0.5 text-xs font-semibold ${
                                                        repo.isPrivate
                                                            ? "bg-[#FFEBEE] text-[#B71C1C]"
                                                            : "bg-[#E3F2FD] text-[#1565C0]"
                                                    }`}
                                                >
                                                    {repo.isPrivate
                                                        ? "Private"
                                                        : "Public"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-text-primary1 text-xs whitespace-nowrap">
                                            Last updated:{" "}
                                            {repo.updatedAt.slice(0, 10)}
                                        </div>
                                    </div>
                                    <p className="text-text-primary1 ml-6 truncate text-sm">
                                        {repo.description || "설명이 없습니다."}
                                    </p>
                                    <p className="text-text-primary1 mt-1 ml-6 flex items-center gap-1 text-xs">
                                        <span
                                            className="inline-block h-2 w-2 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    repo.languageColor ||
                                                    "#999",
                                            }}
                                        />
                                        {repo.languageName || "언어 미상"}
                                        <span className="flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold text-yellow-500">
                                            ⭐ {repo.stargazerCount}
                                        </span>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-6 flex justify-end gap-2">
                    <Button
                        type="lined"
                        onClick={onClose}
                        // className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm"
                    >
                        취소
                    </Button>
                    <Button
                        type="default"
                        onClick={handleSave}
                        // className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        {selected.size}개 저장소 연동하기
                    </Button>
                </div>
            </div>
            <ConfirmDialog
                open={showConfirm}
                title="저장소 연동해제"
                description={confirmMessage}
                imageSrc="/trash.png"
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleConfirm}
            />
            <AlertDialog
                open={showAlert}
                title="연동 완료"
                description="저장소가 성공적으로 연동되었습니다!"
                imageSrc="/success.png"
                onClose={() => {
                    setShowAlert(false);
                    useRepoStore.getState().triggerReload();
                    onClose();
                }}
            />
        </div>
    );
}
