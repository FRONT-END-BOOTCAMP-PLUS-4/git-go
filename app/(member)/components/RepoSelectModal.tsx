"use client";

import { useEffect, useState } from "react";
import { GitHubRepoDto } from "@/application/usecase/github/dto/GitHubRepoDto";
import Image from "next/image";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function RepoSelectModal({ open, onClose }: Props) {
    const [repos, setRepos] = useState<GitHubRepoDto[]>([]);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!open) return;

        const fetchRepos = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/github/repos");
                const data = await res.json();
                setRepos(data);
            } catch (err) {
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

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-2xl w-full shadow-lg">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-xl font-bold">연동할 저장소 선택</h2>
                    <button onClick={onClose}>
                        <Image
                            src="/x-gray.svg"
                            alt="닫기"
                            width={16}
                            height={16}
                            className="opacity-60 hover:opacity-100 transition"
                        />
                    </button>
                </div>
                <p className="text-xs text-gray-500 m-4">
                    회고록을 작성할 GitHub 저장소를 선택해주세요. 선택한 저장소의 커밋 기록이 자동으로 동기화됩니다.
                </p>

                {loading ? (
                    <p>불러오는 중...</p>
                ) : (
                    <ul className="max-h-[350px] overflow-y-auto divide-y">
                        {repos.map((repo) => (
                            <li
                                key={repo.id}
                                className="flex justify-between items-start p-4 border border-gray-200 rounded-lg"
                            >
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2 truncate">
                                            <input
                                                type="checkbox"
                                                checked={selected.has(repo.id)}
                                                onChange={() => toggleRepo(repo.id)}
                                                className="mt-0.5"
                                            />
                                            <div className="flex items-center gap-2 font-semibold text-sm text-gray-900 truncate">
                                                {repo.name}
                                                <span className="bg-gray-100 text-yellow-500 text-xs px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                                                    ⭐ {repo.stargazerCount}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-400 whitespace-nowrap">
                                            Last updated: {repo.updatedAt.slice(0, 10)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate ml-6">
                                        {repo.description || "설명이 없습니다."}
                                    </p>
                                    <p className="text-xs mt-1 flex items-center gap-1 text-gray-600 ml-6">
                                        <span
                                            className="inline-block w-2 h-2 rounded-full"
                                            style={{ backgroundColor: repo.languageColor || "#999" }}
                                        />
                                        {repo.languageName || "언어 미상"}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-6 flex justify-end gap-2">
                    <button onClick={onClose} className="text-sm px-4 py-2 rounded-md border border-gray-300">
                        취소
                    </button>
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md font-semibold"
                    >
                        {selected.size}개 저장소 연동하기
                    </button>
                </div>
            </div>
        </div>
    );
}