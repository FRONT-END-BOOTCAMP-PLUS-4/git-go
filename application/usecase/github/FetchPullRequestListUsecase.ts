// // application/usecases/fetch-pull-request-list.usecase.ts

// import { GithubPullRequestListDto } from "@/application/usecase/github/dto/GithubPullRequestListDto";
// import { GithubPullRequestRepository } from "@/domain/repositories/GithubPullRequestRepository";

// export class FetchPullRequestListUsecase {
//   constructor(private repository: GithubPullRequestRepository) { }

//   async execute(
//     repoFullName: string,
//     username: string,
//     perPage: number = 10,
//     afterCursor: string | null = null
//   ) {
//     return await this.repository.fetchByUsername(repoFullName, username, perPage, afterCursor);
//   }
// }

import { GithubPullRequestListDto } from "@/application/usecase/github/dto/GithubPullRequestListDto";
import { GithubPullRequestRepository } from "@/domain/repositories/GithubPullRequestRepository";

export class FetchPullRequestListUsecase {
  constructor(private repository: GithubPullRequestRepository) { }

  async execute(
    repoFullName: string,
    username: string,
    page: number = 1,
    perPage: number = 10
  ): Promise<GithubPullRequestListDto[]> {
    const prList = await this.repository.fetchByUsername(repoFullName, username, page, perPage);

    return prList.map((pr) => new GithubPullRequestListDto(pr));
  }
}
