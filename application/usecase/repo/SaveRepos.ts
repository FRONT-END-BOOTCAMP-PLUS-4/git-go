import { Repo } from "@/prisma/generated/prisma";
import { SaveReposDto } from "./dto/SaveReposDto";
import { RepoRepository } from "@/domain/repositories/RepoRepository";

export class SaveRepos {
    constructor(private readonly repoRepo: RepoRepository) { }

    async execute(dto: SaveReposDto) {
        const userId = dto.userId;
        const incomingNames = new Set(dto.repoIds);

        const existingRepos = await this.repoRepo.findByUserId(userId);
        const existingNames = new Set(existingRepos.map((r) => r.name));

        const toAdd = dto.repoIds.filter((name) => !existingNames.has(name));
        const toDelete = existingRepos
            .filter((r): r is Repo & { name: string } => r.name !== null && !incomingNames.has(r.name))
            .map((r) => r.name);

        if (toAdd.length > 0) {
            await this.repoRepo.saveRepos({
                userId,
                repos: toAdd.map((name) => ({ name })),
            });
        }

        if (toDelete.length > 0) {
            await this.repoRepo.deleteByNames(userId, toDelete);
        }
    }
}