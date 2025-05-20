// domain/repositories/GithubPrCommitListRepository.ts

import { GithubPrCommitList } from "@/domain/entities/GithubPrCommitList";

export interface GithubPrCommitListRepository {
  fetchByPullRequestNumber(
    repoFullName: string,
    pullRequestNumber: number
  ): Promise<GithubPrCommitList[]>;
}
