// import { GithubCommit } from "@/domain/entities/GithubCommitList";
// import { GithubCommitListRepository } from "@/domain/repositories/GithubCommitListRepository";

// export class GbCommitListRepository implements GithubCommitListRepository {
//     async fetchCommitList({
//         owner,
//         repo,
//         author,
//         token,
//         page = 1,
//         perPage = 10,
//     }: {
//         owner: string;
//         repo: string;
//         author: string;
//         token?: string;
//         page?: number;
//         perPage?: number;
//     }): Promise<{ commits: GithubCommit[]; hasNextPage: boolean; totalCount: number; }> {
//         const headers: Record<string, string> = {
//             Accept: "application/vnd.github+json",
//         };

//         if (token) {
//             headers.Authorization = `Bearer ${token}`;
//         }

//         // 👉 먼저 default branch 이름 가져오기
//         const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
//         if (!repoRes.ok) {
//             const errorData = await repoRes.json();
//             throw new Error(
//                 `Failed to fetch repo info: ${repoRes.status} - ${errorData.message || "Unknown error"}`
//             );
//         }
//         const repoInfo = await repoRes.json();
//         const defaultBranch = repoInfo.default_branch;

//         // 👉 default branch에서만 커밋 가져오기 (author 필터 포함)
//         const commitsRes = await fetch(
//             `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${defaultBranch}`,
//             { headers }
//         );

//         if (!commitsRes.ok) {
//             const errorData = await commitsRes.json();
//             throw new Error(
//                 `Failed to fetch commits: ${commitsRes.status} - ${errorData.message || "Unknown error"}`
//             );
//         }

//         const commits = await commitsRes.json();
//         const mappedCommits = commits.map((c: any) =>
//             GithubCommit.fromJson({ ...c, branch: defaultBranch })
//         );

//         // 최신순 정렬
//         const sortedCommits = (mappedCommits as GithubCommit[]).sort(
//             (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
//         );

//         // 페이지네이션 처리
//         const startIndex = (page - 1) * perPage;
//         const endIndex = startIndex + perPage;
//         const paginatedCommits = sortedCommits.slice(startIndex, endIndex);

//         return {
//             commits: paginatedCommits,
//             hasNextPage: endIndex < sortedCommits.length,
//             totalCount: sortedCommits.length,
//         };
//     }
// }

// // export class GbCommitListRepository implements GithubCommitListRepository {
// //   async fetchCommitList({
// //     owner,
// //     repo,
// //     author,
// //     token,
// //     page = 1,
// //     perPage = 10,
// //   }: {
// //     owner: string;
// //     repo: string;
// //     author: string;
// //     token?: string;
// //     page?: number;
// //     perPage?: number;
// //   }): Promise<{ commits: GithubCommit[]; hasNextPage: boolean; totalCount: number; }> {
// //     const headers: Record<string, string> = {
// //       Accept: "application/vnd.github+json",
// //     };

// //     if (token) {
// //       headers.Authorization = `Bearer ${token}`;
// //     }

// //     // 1. 모든 브랜치 조회
// //     const branchesRes = await fetch(
// //       `https://api.github.com/repos/${owner}/${repo}/branches`,
// //       { headers }
// //     );
// //     if (!branchesRes.ok) {
// //       const errorData = await branchesRes.json();
// //       throw new Error(
// //         `Failed to fetch branches: ${branchesRes.status} - ${errorData.message || "Unknown error"}`
// //       );
// //     }
// //     const branches = await branchesRes.json();

// //     // 2. 디폴트 브랜치 조회
// //     const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
// //     if (!repoRes.ok) {
// //       const errorData = await repoRes.json();
// //       throw new Error(
// //         `Failed to fetch repo info: ${repoRes.status} - ${errorData.message || "Unknown error"}`
// //       );
// //     }
// //     const repoInfo = await repoRes.json();
// //     const defaultBranch = repoInfo.default_branch;

// //     // 3. 모든 커밋을 sha 기준으로 Map에 저장 (디폴트 브랜치 우선)
// //     const commitMap = new Map<string, GithubCommit>();

// //     for (const branch of branches) {
// //       const branchName = branch.name;

// //       const commitsRes = await fetch(
// //         `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${branchName}`,
// //         { headers }
// //       );
// //       if (!commitsRes.ok) {
// //         const errorData = await commitsRes.json();
// //         throw new Error(
// //           `Failed to fetch commits for branch ${branchName}: ${commitsRes.status} - ${errorData.message || "Unknown error"}`
// //         );
// //       }

// //       const commits = await commitsRes.json();
// //       for (const c of commits) {
// //         const sha = c.sha;
// //         const commit = GithubCommit.fromJson({ ...c, branch: branchName });

// //         // 디폴트 브랜치면 무조건 우선 등록
// //         if (branchName === defaultBranch) {
// //           commitMap.set(sha, commit);
// //         } else {
// //           // 디폴트 브랜치가 아닌 경우, 해당 SHA가 없을 때만 추가
// //           if (!commitMap.has(sha)) {
// //             commitMap.set(sha, commit);
// //           }
// //         }
// //       }
// //     }

// //     // 4. 커밋들을 최신순으로 정렬
// //     const uniqueCommits = Array.from(commitMap.values()).sort(
// //       (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
// //     );

// //     // 5. 페이지네이션 처리
// //     const startIndex = (page - 1) * perPage;
// //     const endIndex = startIndex + perPage;
// //     const paginatedCommits = uniqueCommits.slice(startIndex, endIndex);

// //     return {
// //       commits: paginatedCommits,
// //       hasNextPage: endIndex < uniqueCommits.length,
// //       totalCount: uniqueCommits.length,
// //     };
// //   }
// // }

import { GithubCommit } from "@/domain/entities/GithubCommitList";
import { GithubCommitListRepository } from "@/domain/repositories/GithubCommitListRepository";

export class GbCommitListRepository implements GithubCommitListRepository {
    async fetchCommitList({
        owner,
        repo,
        author,
        token,
        page = 1,
        perPage = 10,
        isDefaultOnly = true,
    }: {
        owner: string;
        repo: string;
        author: string;
        token?: string;
        page?: number;
        perPage?: number;
        isDefaultOnly?: boolean;
    }): Promise<{ commits: GithubCommit[]; hasNextPage: boolean; totalCount: number; }> {
        const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        // 👉 디폴트 브랜치 가져오기
        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
        if (!repoRes.ok) {
            const errorData = await repoRes.json();
            throw new Error(`Failed to fetch repo info: ${repoRes.status} - ${errorData.message || "Unknown error"}`);
        }
        const repoInfo = await repoRes.json();
        const defaultBranch = repoInfo.default_branch;

        // 👉 default 브랜치만 조회
        if (isDefaultOnly) {
            const commitsRes = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${defaultBranch}`,
                { headers }
            );
            if (!commitsRes.ok) {
                const errorData = await commitsRes.json();
                throw new Error(`Failed to fetch commits: ${commitsRes.status} - ${errorData.message || "Unknown error"}`);
            }

            const commits = await commitsRes.json();
            const mappedCommits = commits.map((c: any) =>
                GithubCommit.fromJson({ ...c, branch: defaultBranch })
            );

            const sortedCommits = (mappedCommits as GithubCommit[]).sort(
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

        // 👉 모든 브랜치 조회
        const branchesRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/branches`,
            { headers }
        );
        if (!branchesRes.ok) {
            const errorData = await branchesRes.json();
            throw new Error(`Failed to fetch branches: ${branchesRes.status} - ${errorData.message || "Unknown error"}`);
        }
        const branches = await branchesRes.json();

        const commitMap = new Map<string, GithubCommit>();

        for (const branch of branches) {
            const branchName = branch.name;

            const commitsRes = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${branchName}`,
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

                // 디폴트 브랜치 우선 등록
                if (branchName === defaultBranch || !commitMap.has(sha)) {
                    commitMap.set(sha, commit);
                }
            }
        }

        const uniqueCommits = Array.from(commitMap.values()).sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        return {
            commits: uniqueCommits.slice(startIndex, endIndex),
            hasNextPage: endIndex < uniqueCommits.length,
            totalCount: uniqueCommits.length,
        };
    }
}
