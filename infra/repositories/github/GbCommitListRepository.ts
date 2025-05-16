import { GithubCommit } from "@/domain/entities/GithubCommitList";
import { GithubCommitListRepository } from "@/domain/repositories/GithubCommitListRepository";

export class GbCommitListRepository implements GithubCommitListRepository {
  async fetchCommitList({
    owner,
    repo,
    author,
    token,
    page = 1,
    perPage = 10
  }: {
    owner: string;
    repo: string;
    author: string;
    token?: string;
    page?: number;
    perPage?: number;
  }): Promise<{ commits: GithubCommit[]; hasNextPage: boolean; }> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // 1. 모든 브랜치 목록 조회
    const branchesRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`, { headers });
    if (!branchesRes.ok) {
      const errorData = await branchesRes.json();
      throw new Error(`Failed to fetch branches: ${branchesRes.status} - ${errorData.message || 'Unknown error'}`);
    }
    const branches = await branchesRes.json();

    const allCommits: GithubCommit[] = [];

    // 2. 각 브랜치별 커밋 조회
    for (const branch of branches) {
      const branchName = branch.name;

      const commitsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${branchName}&page=${page}&per_page=${perPage}`,
        { headers }
      );
      if (!commitsRes.ok) {
        const errorData = await commitsRes.json();
        throw new Error(`Failed to fetch commits for branch ${branchName}: ${commitsRes.status} - ${errorData.message || 'Unknown error'}`);
      }

      const commits = await commitsRes.json();
      const linkHeader = commitsRes.headers.get('Link');
      const hasNext = linkHeader?.includes('rel="next"') ?? false;

      const mappedCommits = commits.map((c: any) =>
        GithubCommit.fromJson({ ...c, branch: branchName })
      );

      allCommits.push(...mappedCommits);
    }

    // Sort commits by date in descending order
    allCommits.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return {
      commits: allCommits.slice(0, perPage),
      hasNextPage: allCommits.length > perPage
    };
  }
}
