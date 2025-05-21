import { GithubPullRequestList } from "@/domain/entities/GithubPullRequestList";
import { GithubPullRequestRepository } from "@/domain/repositories/GithubPullRequestRepository";

export class GbPullRequestRepository implements GithubPullRequestRepository {
  private GITHUB_API_BASE = "https://api.github.com";

  constructor(private token: string) { }

  async fetchByUsername(
    repoFullName: string,
    author: string,
    perPage: number = 10,
    page: number = 1
  ): Promise<GithubPullRequestList[]> {
    const [owner, repo] = repoFullName.split("/");

    const searchUrl = `${this.GITHUB_API_BASE}/search/issues?q=repo:${owner}/${repo}+type:pr+author:${author}&per_page=${perPage}&page=${page}`;
    const searchRes = await fetch(searchUrl, { headers: this.headers() });

    if (!searchRes.ok) {
      throw new Error(`Failed to fetch PR list: ${searchRes.statusText}`);
    }

    const searchData = await searchRes.json();
    const prList: GithubPullRequestList[] = [];

    for (const pr of searchData.items || []) {
      const prNumber = pr.number;

      const prDetailRes = await fetch(
        `${this.GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${prNumber}`,
        { headers: this.headers() }
      );

      if (!prDetailRes.ok) {
        throw new Error(`Failed to fetch PR detail for #${prNumber}`);
      }

      const prDetail = await prDetailRes.json();

      const sourceBranch = prDetail.head.ref;
      const branchName = sourceBranch;

      prList.push(
        new GithubPullRequestList(
          pr.number,
          pr.title,
          pr.state,
          repo,
          branchName,
          pr.created_at,
        )
      );
    }

    return prList;
  }

  private headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/vnd.github+json",
    };
  }
}
