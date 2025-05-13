import { SaveReposDto } from "./dto/SaveReposDto";
import { RepoRepository } from "@/domain/repositories/RepoRepository";

export class SaveRepos {
    constructor(private readonly repo: RepoRepository) { }

    async execute(dto: SaveReposDto) {
        const repos = dto.repoIds.map((id) => ({ name: id }));
        await this.repo.saveRepos({ userId: dto.userId, repos });
    }
}