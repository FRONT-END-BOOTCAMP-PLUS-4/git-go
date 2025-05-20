import { GithubPullRequestList } from "@/domain/entities/GithubPullRequestList";

export interface GithubPullRequestRepository {
  fetchByUsername(
    repoFullName: string,
    username: string,
    page?: number,
    perPage?: number
  ): Promise<GithubPullRequestList[]>;
}
