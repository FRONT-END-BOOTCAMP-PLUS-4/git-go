import { GitHubRepo } from "../entities/GitHubRepo";

export interface GithubRepoRepository {
    fetchAll(token: string): Promise<GitHubRepo[]>;
}