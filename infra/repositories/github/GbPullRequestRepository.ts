import { GithubPullRequestList } from "@/domain/entities/GithubPullRequestList";
import { GithubPullRequestRepository } from "@/domain/repositories/GithubPullRequestRepository";

export class GbPullRequestRepository implements GithubPullRequestRepository {
    private GITHUB_API_BASE = "https://api.github.com";

    constructor(private token: string) { }

    async fetchByUsername(
        repoFullName: string,
        author: string,
        page: number = 1,
        perPage: number = 10
    ): Promise<{ list: GithubPullRequestList[]; totalCount: number; }> {
        const [owner, repo] = repoFullName.split("/");

        // 1) PR 검색 API 호출 (search/issues)
        const searchUrl = `${this.GITHUB_API_BASE}/search/issues?q=repo:${owner}/${repo}+type:pr+author:${author}&per_page=${perPage}&page=${page}`;
        const searchRes = await fetch(searchUrl, { headers: this.headers() });

        if (!searchRes.ok) {
            throw new Error(`Failed to fetch PR list: ${searchRes.statusText}`);
        }

        const searchData = await searchRes.json();

        // 전체 PR 개수 (검색 결과 total_count)
        const totalCount = searchData.total_count || 0;

        // 2) PR 상세 정보 조회
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

            prList.push(
                new GithubPullRequestList(
                    pr.number,
                    pr.title,
                    pr.state,
                    repo,
                    prDetail.head.ref,
                    pr.created_at
                )
            );
        }

        return { list: prList, totalCount };
    }

    private headers() {
        return {
            Authorization: `Bearer ${this.token}`,
            Accept: "application/vnd.github+json",
        };
    }
}
