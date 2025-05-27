import { GithubCommit } from "@/domain/entities/GithubCommitList";
import { GithubCommitListRepository } from "@/domain/repositories/GithubCommitListRepository";
import { PrismaClient } from "@/prisma/generated/prisma";

const prisma = new PrismaClient();

async function fetchAllCommitsFromDefaultBranch({
    owner,
    repo,
    author,
    branch,
    headers,
    maxCommits = 1000,
}: {
    owner: string;
    repo: string;
    author: string;
    branch: string;
    headers: Record<string, string>;
    maxCommits?: number;
}) {
    const commits: any[] = [];
    let page = 1;
    const perPage = 100;
    let hasMore = true;

    while (hasMore) {
        const res = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${branch}&per_page=${perPage}&page=${page}`,
            { headers }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Failed to fetch commits: ${res.status} - ${errorData.message || "Unknown error"}`);
        }

        const data = await res.json();
        commits.push(...data);

        hasMore = data.length === perPage && commits.length < maxCommits;
        page++;
    }

    return commits;
}

// async function fetchAllCommitsFromAllBranches({
//     owner,
//     repo,
//     author,
//     headers,
//     defaultBranch,
// }: {
//     owner: string;
//     repo: string;
//     author: string;
//     headers: Record<string, string>;
//     defaultBranch: string;
// }): Promise<GithubCommit[]> {
//     const branchesRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`, { headers });

//     if (!branchesRes.ok) {
//         const errorData = await branchesRes.json();
//         throw new Error(`Failed to fetch branches: ${branchesRes.status} - ${errorData.message || "Unknown error"}`);
//     }
//     const branches = await branchesRes.json();

//     const commitMap = new Map<string, GithubCommit>();

//     for (const branch of branches) {
//         const branchName = branch.name;

//         const commitsRes = await fetch(
//             `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${branchName}`,
//             { headers }
//         );

//         if (!commitsRes.ok) {
//             const errorData = await commitsRes.json();
//             throw new Error(`Failed to fetch commits for branch ${branchName}: ${commitsRes.status} - ${errorData.message || "Unknown error"}`);
//         }

//         const commits = await commitsRes.json();

//         for (const c of commits) {
//             const sha = c.sha;
//             const commit = GithubCommit.fromJson({ ...c, branch: branchName });

//             // default 브랜치 커밋은 항상 우선 등록, 아니면 중복 체크 후 등록
//             if (branchName === defaultBranch || !commitMap.has(sha)) {
//                 commitMap.set(sha, commit);
//             }
//         }
//     }

//     return Array.from(commitMap.values()).sort(
//         (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
//     );
// }
async function fetchAllCommitsFromAllBranches({
    owner,
    repo,
    author,
    headers,
    defaultBranch,
    maxCommitsPerBranch = 1000,
}: {
    owner: string;
    repo: string;
    author: string;
    headers: Record<string, string>;
    defaultBranch: string;
    maxCommitsPerBranch?: number;
}): Promise<GithubCommit[]> {
    const branchesRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`, { headers });

    if (!branchesRes.ok) {
        const errorData = await branchesRes.json();
        throw new Error(`Failed to fetch branches: ${branchesRes.status} - ${errorData.message || "Unknown error"}`);
    }

    const branches = await branchesRes.json();
    const commitMap = new Map<string, GithubCommit>();
    const perPage = 100;

    for (const branch of branches) {
        const branchName = branch.name;
        let page = 1;
        let hasMore = true;
        let branchCommitCount = 0;

        while (hasMore) {
            const commitsRes = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${branchName}&per_page=${perPage}&page=${page}`,
                { headers }
            );

            if (!commitsRes.ok) {
                const errorData = await commitsRes.json();
                throw new Error(`Failed to fetch commits for branch ${branchName}: ${commitsRes.status} - ${errorData.message || "Unknown error"}`);
            }

            const commits = await commitsRes.json();

            for (const c of commits) {
                const sha = c.sha;
                const commit = GithubCommit.fromJson({ ...c, branch: branchName });

                // default 브랜치 커밋은 항상 우선 등록, 아니면 중복 체크 후 등록
                if (branchName === defaultBranch || !commitMap.has(sha)) {
                    commitMap.set(sha, commit);
                }
            }

            branchCommitCount += commits.length;
            hasMore = commits.length === perPage && branchCommitCount < maxCommitsPerBranch;
            page++;
        }
    }

    return Array.from(commitMap.values()).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
}


export class GbCommitListRepository implements GithubCommitListRepository {
    async fetchCommitList({
        owner,
        repo,
        author,
        token,
        page = 1,
        perPage = 10,
        userId,
    }: {
        owner: string;
        repo: string;
        author: string;
        token?: string;
        page?: number;
        perPage?: number;
        userId?: string;
    }): Promise<{ commits: GithubCommit[]; hasNextPage: boolean; totalCount: number; }> {
        if (!token) {
            throw new Error("GitHub access token is required.");
        }

        const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
        };

        // if (token) {
        //     headers.Authorization = `Bearer ${token}`;
        // }
        console.log("▶ [AccessToken 확인]", token);
        console.log("▶ [요청 Headers]", headers);

        const userDefaultSetting = await prisma.user.findUnique({
            where: { id: userId },
            // select: { isDefaultOnly: true }, // 필요시 활성화
        });

        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });

        console.log("남은 요청 횟수:", repoRes.headers.get("x-ratelimit-remaining"));

        if (!repoRes.ok) {
            const errorData = await repoRes.json();
            throw new Error(`Failed to fetch repo info: ${repoRes.status} - ${errorData.message || "Unknown error"}`);
        }
        const repoInfo = await repoRes.json();
        const defaultBranch = repoInfo.default_branch;

        if (userDefaultSetting?.isDefaultOnly) {
            // 기본 브랜치 커밋만 조회
            const allCommitsRaw = await fetchAllCommitsFromDefaultBranch({
                owner,
                repo,
                author,
                branch: defaultBranch,
                headers,
            });

            const mappedCommits = allCommitsRaw.map((c: any) =>
                GithubCommit.fromJson({ ...c, branch: defaultBranch })
            );

            const sortedCommits = mappedCommits.sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            );

            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;

            return {
                commits: sortedCommits.slice(startIndex, endIndex),
                hasNextPage: endIndex < sortedCommits.length,
                totalCount: sortedCommits.length,
            };
        }

        // 모든 브랜치에서 커밋 조회
        const uniqueCommits = await fetchAllCommitsFromAllBranches({
            owner,
            repo,
            author,
            headers,
            defaultBranch,
        });

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        return {
            commits: uniqueCommits.slice(startIndex, endIndex),
            hasNextPage: endIndex < uniqueCommits.length,
            totalCount: uniqueCommits.length,
        };
    }
}
