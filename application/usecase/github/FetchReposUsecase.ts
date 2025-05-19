import { GithubRepoRepository } from "@/domain/repositories/GithubRepoRepository";
import { GithubRepoDto } from "./dto/GithubRepoDto";

export class FetchReposUsecase {
    constructor(private readonly repo: GithubRepoRepository) { }

    async execute(token: string): Promise<GithubRepoDto[]> {
        return await this.repo.fetchAll(token);
    }
}
