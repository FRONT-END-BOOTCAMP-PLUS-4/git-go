export interface StatsRepository {
    fetchStats(repo: string): Promise<{ totalCommits: number }>;
    fetchLines(repo: string): Promise<{ totalLines: number; prevLines: number }>;
    resolveNameWithOwner(repoId: string): Promise<string>;
    fetchWeeklyCommits(repo: string): Promise<{ date: string; count: number }[]>;
}