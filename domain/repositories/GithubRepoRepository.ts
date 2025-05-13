import { GitHubRepoDto } from "@/application/usecase/github/dto/GitHubRepoDto";

export interface GithubRepoRepository {
    fetchAll(token: string): Promise<GitHubRepoDto[]>;
}