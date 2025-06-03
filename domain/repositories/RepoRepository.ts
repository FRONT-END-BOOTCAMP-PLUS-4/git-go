import { Repo } from "@/prisma/generated/prisma";

export interface RepoRepository {
    saveRepos(data: {
        userId: string;
        repos: { name: string; }[];
    }): Promise<void>;
    findByUserId(userId: string): Promise<Repo[]>;
    deleteByNames(userId: string, names: string[]): Promise<void>;
    hasMemoirs(userId: string, repoName: string): Promise<boolean>;
}
