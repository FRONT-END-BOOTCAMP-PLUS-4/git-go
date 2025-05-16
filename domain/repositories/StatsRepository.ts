export interface StatsRepository {
    fetchStats(repo: string): Promise<{ totalCommits: number }>;
    fetchLines(repo: string): Promise<{ totalLines: number }>;
}