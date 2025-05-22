import { GithubCommitDetail } from '../entities/GithubCommitDetail';

export interface GithubCommitDetailRepository {
    getCommitDetail(nameWithOwner: string, sha: string, accessToken: string): Promise<GithubCommitDetail>;
}
