import { GithubCommitDetail } from "../entities/GithubCommitDetail";

export interface GithubPrCommitDetailRepository {
    getCommitDetail(
        nameWithOwner: string,
        sha: string,
        accessToken: string
    ): Promise<GithubCommitDetail>;
}
