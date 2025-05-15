import { GithubRepo } from "@/domain/entities/GithubRepo";

export interface GithubRepoRepository {
    fetchAll(token: string): Promise<GithubRepo[]>;
}