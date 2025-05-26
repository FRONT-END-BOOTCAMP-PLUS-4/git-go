import { GithubRepoRepository } from "@/domain/repositories/GithubRepoRepository";
import { GithubRepoDto } from "./dto/GithubRepoDto";

export class FetchReposUsecase {
    constructor(private readonly repo: GithubRepoRepository) {}

    async execute(token: string): Promise<GithubRepoDto[]> {
        const repos = await this.repo.fetchAll(token);

        return repos.map(repo => new GithubRepoDto(
            repo.id,
            repo.name,
            repo.nameWithOwner,
            repo.url,
            repo.isPrivate,
            repo.description,
            repo.updatedAt instanceof Date
                ? repo.updatedAt.toISOString()
                : String(repo.updatedAt),
            repo.stargazerCount,
            repo.languageName,
            repo.languageColor
        ));
    }
}

// import { GithubRepoRepository } from "@/domain/repositories/GithubRepoRepository";
// import { GithubRepoDto } from "./dto/GithubRepoDto";

// export class FetchReposUsecase {
//     constructor(private readonly repo: GithubRepoRepository) { }

//     async execute(token: string): Promise<GithubRepoDto[]> {
//         return await this.repo.fetchAll(token);
//     }
// }
