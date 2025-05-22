
import { GithubCommitDetailRequestDto, GithubCommitDetailResponseDto } from '@/application/usecase/github/dto/GithubCommitListDto';
import { GithubCommitDetailRepository } from '@/domain/repositories/GithubCommitDetailRepository';

export class FetchCommitDetailUsecase {
    constructor(private readonly repository: GithubCommitDetailRepository) { }

    async execute(input: GithubCommitDetailRequestDto): Promise<GithubCommitDetailResponseDto> {
        const commit = await this.repository.getCommitDetail(
            input.nameWithOwner,
            input.sha,
            input.accessToken
        );

        return {
            sha: commit.sha,
            message: commit.message,
            authorName: commit.authorName,
            authorDate: commit.authorDate,
            filesChanged: commit.filesChanged,
            changedFiles: commit.changedFiles,
        };
    }
}
