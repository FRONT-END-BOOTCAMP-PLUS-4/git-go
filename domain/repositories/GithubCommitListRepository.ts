import { GithubCommit } from "@/domain/entities/GithubCommitList";

export interface GithubCommitListRepository {
    fetchCommitList(params: {
        owner: string;
        repo: string;
        author: string;
        token?: string;
        page?: number;
        perPage?: number;
        userId?: string;
    }): Promise<{
        commits: GithubCommit[];
        hasNextPage: boolean;
        totalCount: number;
    }>;
}
