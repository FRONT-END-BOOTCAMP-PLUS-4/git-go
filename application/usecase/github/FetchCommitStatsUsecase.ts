import { StatsRepository } from "@/domain/repositories/StatsRepository";
import { ResponseCommitStatsDto } from "./dto/ResponseCommitStatsDto";
import { FetchCommitStatsDto } from "./dto/FetchCommitStatsDto";

export class FetchCommitStatsUsecase {
    constructor(private readonly repo: StatsRepository) {}

    async execute(dto: FetchCommitStatsDto): Promise<ResponseCommitStatsDto> {
        const { totalCommits } = await this.repo.fetchStats(dto.repo);
        return new ResponseCommitStatsDto(totalCommits);
    }
}
