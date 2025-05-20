// // domain/repositories/github-pull-request.repository.ts
// import { GithubPullRequestList } from "@/domain/entities/GithubPullRequestList";

// export interface GithubPullRequestRepository {
//   fetchByUsername(
//     repoFullName: string,
//     username: string,
//     perPage?: number,
//     afterCursor?: string | null
//   ): Promise<{
//     prList: GithubPullRequestList[];
//     endCursor: string | null;
//     hasNextPage: boolean;
//   }>;
// }

import { GithubPullRequestList } from "@/domain/entities/GithubPullRequestList";

export interface GithubPullRequestRepository {
  fetchByUsername(
    repoFullName: string,
    username: string,
    page?: number,
    perPage?: number
  ): Promise<GithubPullRequestList[]>;
}
