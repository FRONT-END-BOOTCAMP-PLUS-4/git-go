import { GithubPrCommitListRepository } from "@/domain/repositories/GithubPrCommitListRepository";
import { GithubPrCommitList } from "@/domain/entities/GithubPrCommitList";

export class FetchPrCommitListUsecase {
    constructor(private repository: GithubPrCommitListRepository) {}

    async fetchByPullRequestNumber(
        repoFullName: string,
        prNumber: number
    ): Promise<GithubPrCommitList[]> {
        return await this.repository.fetchByPullRequestNumber(
            repoFullName,
            prNumber
        );
    }
}
