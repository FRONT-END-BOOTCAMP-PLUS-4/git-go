import { Repo } from "@/prisma/generated/prisma";

export interface RepoRepository {
    saveRepos(data: { userId: string; repos: { name: string }[] }): Promise<void>;
    findByUserId(userId: string): Promise<Repo[]>;
}