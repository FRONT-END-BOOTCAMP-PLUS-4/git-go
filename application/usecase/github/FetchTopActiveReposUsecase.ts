import { RepoRepository } from "@/domain/repositories/RepoRepository";
import { StatsRepository } from "@/domain/repositories/StatsRepository";
import { ResponseTopActiveReposDto } from "./dto/ResponseTopActiveReposDto";

export class FetchTopActiveReposUsecase {
    constructor(
        private readonly repoRepo: RepoRepository,
        private readonly statsRepo: StatsRepository
    ) { }

    async execute(userId: string): Promise<ResponseTopActiveReposDto[]> {
        const repos = await this.repoRepo.findByUserId(userId);

        const results = await Promise.all(
            repos
                .filter((repo) => repo.name !== null)
                .map(async (repo) => {
                    const nameWithOwner = await this.statsRepo.resolveNameWithOwner(repo.name as string);
                    const { totalCommits } = await this.statsRepo.fetchStats(nameWithOwner);
                    return {
                        nameWithOwner,
                        totalCommits,
                    };
                })
        );

        return results
            .sort((a, b) => b.totalCommits - a.totalCommits)
            .slice(0, 3)
            .map((r) => new ResponseTopActiveReposDto(r.nameWithOwner, r.totalCommits));
    }
}