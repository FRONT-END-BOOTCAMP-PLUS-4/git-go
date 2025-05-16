export interface StatsRepository {
    fetchStats(repo: string): Promise<{ totalCommits: number }>;
}