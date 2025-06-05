import { StatsRepository } from "@/domain/repositories/StatsRepository";

export class GbStatsRepository implements StatsRepository {
    constructor(private token: string) {}

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

        if (res.status === 409) {
            return { totalCommits: 0 };
        }
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

    async fetchLines(
        repo: string
    ): Promise<{ totalLines: number; prevLines: number }> {
        const [owner, name] = repo.split("/");
        const url = `https://api.github.com/repos/${owner}/${name}/stats/code_frequency`;
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: "application/vnd.github+json",
        };
        const maxTries = 5;
        const delay = 2000;

        for (let i = 0; i < maxTries; i++) {
            const res = await fetch(url, { headers });

            if (res.status === 204) {
                return { totalLines: 0, prevLines: 0 };
            }

            if (!res.ok) throw new Error("GitHub code frequency fetch 실패");

            const data = await res.json();
            if (Array.isArray(data)) {
                const totalAdditions = data.reduce(
                    (acc, [_, add]) => acc + add,
                    0
                );
                const totalDeletions = data.reduce(
                    (acc, [__, ___, del]) => acc + del,
                    0
                );
                const totalLines = totalAdditions + totalDeletions;

                const lastWeek = data[data.length - 1];
                const isLastWeekZero =
                    lastWeek && lastWeek[1] === 0 && lastWeek[2] === 0;
                const weeksToExclude = isLastWeekZero ? 2 : 1;
                const prevData = data.slice(0, -weeksToExclude);
                const prevAdd = prevData.reduce(
                    (sum, [_, add]) => sum + add,
                    0
                );
                const prevDel = prevData.reduce(
                    (sum, [__, ___, del]) => sum + del,
                    0
                );
                const prevLines = prevAdd + prevDel;

                return { totalLines, prevLines };
            }
            await new Promise((res) => setTimeout(res, delay));
        }
        return { totalLines: 0, prevLines: 0 };
    }

    async resolveNameWithOwner(repoId: string): Promise<string> {
        const query = `
      query ($id: ID!) {
        node(id: $id) {
          ... on Repository {
            nameWithOwner
          }
        }
      }
    `;

        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, variables: { id: repoId } }),
        });

        const json = await res.json();
        return json.data?.node?.nameWithOwner ?? "";
    }

    async fetchWeeklyCommits(
        repo: string
    ): Promise<{ date: string; count: number }[]> {
        const [owner, name] = repo.split("/");

        const since = new Date();
        since.setDate(since.getDate() - 7);
        const sinceIso = since.toISOString();

        let page = 1;
        const allCommits: any[] = [];

        while (true) {
            const res = await fetch(
                `https://api.github.com/repos/${owner}/${name}/commits?since=${sinceIso}&per_page=100&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
            );

            if (res.status === 409) {
                return Array.from({ length: 7 }).map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (6 - i));
                    return { date: date.toISOString().split("T")[0], count: 0 };
                });
            }

            if (!res.ok) throw new Error("GitHub API 실패");
            const commits = await res.json();
            allCommits.push(...commits);
            if (commits.length < 100) break;
            page++;
        }

        const dailyCount: Record<string, number> = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayStr = date.toISOString().split("T")[0];
            dailyCount[dayStr] = 0;
        }

        for (const commit of allCommits) {
            const dateStr = commit.commit.author.date.split("T")[0];
            if (dailyCount[dateStr] !== undefined) {
                dailyCount[dateStr]++;
            }
        }

        return Object.entries(dailyCount)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }
}
