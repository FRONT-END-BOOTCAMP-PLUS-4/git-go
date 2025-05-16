import { StatsRepository } from "@/domain/repositories/StatsRepository";

export class GbStatsRepository implements StatsRepository {
    constructor(private token: string) { }

    async fetchStats(repo: string): Promise<{ totalCommits: number }> {
        const [owner, name] = repo.split("/");
        const res = await fetch(
            `https://api.github.com/repos/${owner}/${name}/commits?per_page=1`,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    Accept: "application/vnd.github+json",
                },
            }
        );

        if (!res.ok) throw new Error("GitHub API 에러");

        const linkHeader = res.headers.get("link");
        if (!linkHeader) {
            const data = await res.json();
            return { totalCommits: data.length };
        }

        const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
        const lastPage = match ? parseInt(match[1], 10) : 1;

        return { totalCommits: lastPage };
    }
}