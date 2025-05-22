import {
    GithubCommitDetailRequestDto,
    GithubCommitDetailResponseDto,
} from '@/application/usecase/github/dto/GithubCommitDetailDto';
import { GithubCommitDetailRepository } from '@/domain/repositories/GithubCommitDetailRepository';

export class FetchCommitDetailUsecase {
    constructor(private readonly repository: GithubCommitDetailRepository) { }

    async execute(input: GithubCommitDetailRequestDto): Promise<GithubCommitDetailResponseDto> {
        const commit = await this.repository.getCommitDetail(input.nameWithOwner, input.sha);

        return {
            sha: commit.sha,
            message: commit.message,
            authorName: commit.authorName,
            authorDate: commit.authorDate,
            filesChanged: commit.filesChanged,
            changedFiles: commit.changedFiles, // ✅ 추가된 라인
        };
    }
}
