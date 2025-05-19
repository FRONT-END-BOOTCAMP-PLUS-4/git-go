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
  }: {
    owner: string;
    repo: string;
    author: string;
    token?: string;
    page?: number;
    perPage?: number;
  }): Promise<{ commits: GithubCommit[]; hasNextPage: boolean; totalCount: number; }> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // 1. 모든 브랜치 목록 조회
    const branchesRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/branches`,
      { headers }
    );
    if (!branchesRes.ok) {
      const errorData = await branchesRes.json();
      throw new Error(
        `Failed to fetch branches: ${branchesRes.status} - ${errorData.message || "Unknown error"}`
      );
    }

    const branches = await branchesRes.json();

    const uniqueCommitsMap = new Map<string, GithubCommit>();

    // 2. 각 브랜치별 커밋 조회
    for (const branch of branches) {
      const branchName = branch.name;

      const commitsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${branchName}&page=${page}&per_page=${perPage}`,
        { headers }
      );
      if (!commitsRes.ok) {
        const errorData = await commitsRes.json();
        throw new Error(
          `Failed to fetch commits for branch ${branchName}: ${commitsRes.status} - ${errorData.message || "Unknown error"}`
        );
      }

      const commits = await commitsRes.json();

      for (const c of commits) {
        const commit = GithubCommit.fromJson({ ...c, branch: branchName });
        if (!uniqueCommitsMap.has(commit.sha)) {
          uniqueCommitsMap.set(commit.sha, commit);
        }
      }
    }

    // 3. 정렬 및 페이징 처리
    const uniqueCommits = Array.from(uniqueCommitsMap.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    const paginatedCommits = uniqueCommits.slice(0, perPage);

    console.log(uniqueCommits.length);

    return {
      commits: paginatedCommits,
      hasNextPage: uniqueCommits.length > perPage,
      totalCount: uniqueCommits.length
    };
  }
}
