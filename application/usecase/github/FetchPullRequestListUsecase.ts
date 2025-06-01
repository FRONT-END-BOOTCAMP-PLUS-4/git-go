import {
    GithubPullRequestListDto,
    GithubPullRequestPageDto,
} from "@/application/usecase/github/dto/GithubPullRequestListDto";
import { GithubPullRequestRepository } from "@/domain/repositories/GithubPullRequestRepository";

export class FetchPullRequestListUsecase {
    constructor(private repository: GithubPullRequestRepository) {}

    async execute(
        repoFullName: string,
        author: string,
        page: number = 1,
        perPage: number = 10
    ): Promise<GithubPullRequestPageDto> {
        const { list, totalCount } = await this.repository.fetchByUsername(
            repoFullName,
            author,
            page,
            perPage
        );

        return new GithubPullRequestPageDto(list, totalCount);
    }
}
