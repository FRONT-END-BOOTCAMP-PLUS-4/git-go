import { GithubRepoRepository } from "@/domain/repositories/GithubRepoRepository";
import { GitHubRepoDto } from "./dto/GitHubRepoDto";

export class FetchRepos {
    constructor(private readonly repo: GithubRepoRepository) { }

    async execute(token: string): Promise<GitHubRepoDto[]> {
        return await this.repo.fetchAll(token);
    }
}
