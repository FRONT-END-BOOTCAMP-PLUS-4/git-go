import { StatsRepository } from "@/domain/repositories/StatsRepository";
import { FetchWeeklyCommitsDto } from "./dto/FetchWeeklyCommitsDto";
import { ResponseWeeklyCommitsDto } from "./dto/ResponseWeeklyCommitsDto";

export class FetchWeeklyCommitsUsecase {
    constructor(private readonly statsRepo: StatsRepository) {}

    async execute(
        dto: FetchWeeklyCommitsDto
    ): Promise<ResponseWeeklyCommitsDto[]> {
        const data = await this.statsRepo.fetchWeeklyCommits(dto.repo);
        return data.map((d) => new ResponseWeeklyCommitsDto(d.date, d.count));
    }
}
