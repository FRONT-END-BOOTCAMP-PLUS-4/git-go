import { RepoRepository } from "@/domain/repositories/RepoRepository";
import { FindUserReposDto } from "./dto/FindUserReposDto";

export class FindUserRepos {
    constructor(private repoRepo: RepoRepository) { }

    async execute(userId: string): Promise<FindUserReposDto[]> {
        const repos = await this.repoRepo.findByUserId(userId);
        return repos.map((repo) => new FindUserReposDto(String(repo.id), repo.name ?? ""));
    }
}