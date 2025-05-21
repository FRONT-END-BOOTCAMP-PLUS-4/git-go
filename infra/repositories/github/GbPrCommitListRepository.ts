import { GithubPrCommitList } from "@/domain/entities/GithubPrCommitList";
import { GithubPrCommitListRepository } from "@/domain/repositories/GithubPrCommitListRepository";

export class GbPrCommitListRepository implements GithubPrCommitListRepository {
  private GITHUB_API_BASE = "https://api.github.com";

  constructor(private token: string) { }

  async fetchByPullRequestNumber(
    repoFullName: string,
    prNumber: number
  ): Promise<GithubPrCommitList[]> {
    const [owner, repo] = repoFullName.split("/");

    const commitRes = await fetch(
      `${this.GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${prNumber}/commits`,
      { headers: this.headers() }
    );

    if (!commitRes.ok) {
      throw new Error(`Failed to fetch commits: ${commitRes.statusText}`);
    }

    const commitsRaw = await commitRes.json();

    const commits = await Promise.all(
      commitsRaw.map(async (commit: any) => {
        const commitDetailRes = await fetch(
          `${this.GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${commit.sha}`,
          { headers: this.headers() }
        );

        if (!commitDetailRes.ok) {
          throw new Error(`Failed to fetch commit detail for ${commit.sha}`);
        }

        const commitDetail = await commitDetailRes.json();

        return new GithubPrCommitList(
          commit.sha,
          commit.commit.message,
          commit.commit.author?.name ?? "unknown",
          commit.commit.author?.date ?? "",
          commitDetail.stats?.additions ?? 0,
          commitDetail.stats?.deletions ?? 0
        );
      })
    );

    return commits;
  }

  private headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/vnd.github+json",
    };
  }
}
