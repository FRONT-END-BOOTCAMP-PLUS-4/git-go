// import { GithubCommitListDto } from "@/application/usecase/github/dto/GithubCommitListDto";
// import { GithubCommitListRepository } from "@/domain/repositories/GithubCommitListRepository";

// export class FetchCommitList {
//   constructor(private readonly repository: GithubCommitListRepository) { }

//   async execute(params: {
//     owner: string;
//     repo: string;
//     author: string;
//     token?: string;
//     page?: number;
//     perPage?: number;
//     totalCount?: number;
//   }): Promise<GithubCommitListDto> {
//     const { commits, hasNextPage, totalCount } = await this.repository.fetchCommitList(params);
//     return {
//       commits: commits.map((c) => ({
//         sha: c.sha,
//         message: c.message,
//         branch: c.branch,
//         repo: c.repo,
//         type: c.type,
//         createdAt: c.createdAt.toISOString(),
//       })),
//       hasNextPage,
//       totalCount,
//     };
//   }
// }

import { GithubCommitListDto } from "@/application/usecase/github/dto/GithubCommitListDto";
import { GithubCommitListRepository } from "@/domain/repositories/GithubCommitListRepository";

export class FetchCommitList {
    constructor(private readonly repository: GithubCommitListRepository) {}

    async execute(params: {
        owner: string;
        repo: string;
        author: string;
        token?: string;
        page?: number;
        perPage?: number;
        totalCount?: number;
        userId?: string;
    }): Promise<GithubCommitListDto> {
        const { commits, hasNextPage, totalCount } =
            await this.repository.fetchCommitList(params);

        return {
            commits: commits.map((c) => ({
                sha: c.sha,
                message: c.message,
                branch: c.branch,
                repo: c.repo,
                type: c.type,
                createdAt: c.createdAt.toISOString(),
            })),
            hasNextPage,
            totalCount,
        };
    }
}
