import { GithubPrCommitDetailRequestDto, GithubPrCommitDetailResponseDto } from "@/application/usecase/github/dto/GithubPrCommitDetailDto";
import { GithubPrCommitDetailRepository } from "@/domain/repositories/GithubPrCommitDetailRepository";


export class FetchPrCommitDetailUsecase {
    constructor(private readonly repository: GithubPrCommitDetailRepository) { }

    async execute(
        input: GithubPrCommitDetailRequestDto
    ): Promise<GithubPrCommitDetailResponseDto> {
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
            changeDetail: commit.changeDetail,
        };
    }
}
