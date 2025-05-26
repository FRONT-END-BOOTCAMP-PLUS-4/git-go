import { StatsRepository } from "@/domain/repositories/StatsRepository";

export class FetchLinesStatsUsecase {
    constructor(private readonly repo: StatsRepository) { }

    async execute(repo: string): Promise<{ totalLines: number; prevLines: number }> {
        return this.repo.fetchLines(repo);
    }
}