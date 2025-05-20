import { GithubPullRequestListDto } from "@/application/usecase/github/dto/GithubPullRequestListDto";
import { GithubPullRequestRepository } from "@/domain/repositories/GithubPullRequestRepository";

export class FetchPullRequestListUsecase {
  constructor(private repository: GithubPullRequestRepository) { }

  async execute(
    repoFullName: string,
    author: string,
    page: number = 1,
    perPage: number = 10
  ): Promise<GithubPullRequestListDto[]> {
    const prList = await this.repository.fetchByUsername(repoFullName, author, page, perPage);

    return prList.map((pr) => new GithubPullRequestListDto(pr));
  }
}
