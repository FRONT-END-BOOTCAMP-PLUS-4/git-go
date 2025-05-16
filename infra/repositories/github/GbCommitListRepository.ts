import { GithubCommit } from "@/domain/entities/GithubCommitList";
import { GithubCommitListRepository } from "@/domain/repositories/GithubCommitListRepository";

export class GbCommitListRepository implements GithubCommitListRepository {
  async fetchCommitList({
    owner,
    repo,
    author,
    token
  }: {
    owner: string;
    repo: string;
    author: string;
    token?: string;
  }): Promise<GithubCommit[]> {

    const headers = token
      ? {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      }
      : {};

    // 1. 모든 브랜치 목록 조회
    const branchesRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`, { headers });
    if (!branchesRes.ok) throw new Error("Failed to fetch branches");
    const branches = await branchesRes.json();

    const allCommits: GithubCommit[] = [];

    // 2. 각 브랜치별 커밋 조회
    for (const branch of branches) {
      const branchName = branch.name;

      const commitsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${branchName}`,
        { headers }
      );
      if (!commitsRes.ok) throw new Error(`Failed to fetch commits for branch ${branchName}`);

      const commits = await commitsRes.json();

      const mappedCommits = commits.map((c: any) =>
        GithubCommit.fromJson({ ...c, branch: branchName })
      );

      allCommits.push(...mappedCommits);
    }

    return allCommits;
  }
}
