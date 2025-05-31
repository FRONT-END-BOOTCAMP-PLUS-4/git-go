import { GithubPullRequestList } from "@/domain/entities/GithubPullRequestList";

export interface GithubPullRequestRepository {
    fetchByUsername(
        repoFullName: string,
        author: string,
        page?: number,
        perPage?: number
    ): Promise<{ list: GithubPullRequestList[]; totalCount: number }>;
}
