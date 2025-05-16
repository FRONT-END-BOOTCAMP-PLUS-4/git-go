import { StatsRepository } from "@/domain/repositories/StatsRepository";

export class FetchLinesStats {
    constructor(private readonly repo: StatsRepository) { }

    async execute(repo: string): Promise<{ totalLines: number }> {
        return this.repo.fetchLines(repo);
    }
}