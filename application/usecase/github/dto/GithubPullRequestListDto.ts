// // application/dto/github-pull-request-list.dto.ts

// export interface GithubPullRequestListDto {
//   prNumber: number;
//   title: string;
//   state: 'open' | 'closed';
//   repositoryName: string;
//   branchName: string;
//   createdAt: string;
//   commits: {
//     sha: string;
//     message: string;
//     authorName: string;
//     authoredDate: string;
//     additions: number;
//     deletions: number;
//   }[];
// }

// import { GithubPullRequestList } from "@/domain/entities/GithubPullRequestList";

// export class GithubPullRequestListDto {
//   prNumber: number;
//   title: string;
//   state: 'open' | 'closed';
//   repositoryName: string;
//   branchName: string;
//   createdAt: string;
//   commits: {
//     sha: string;
//     message: string;
//     authorName: string;
//     authoredDate: string;
//     additions: number;
//     deletions: number;
//   }[];

//   constructor(entity: GithubPullRequestList) {
//     this.prNumber = entity.prNumber;
//     this.title = entity.title;
//     this.state = entity.state;
//     this.repositoryName = entity.repositoryName;
//     this.branchName = entity.branchName;
//     this.createdAt = entity.createdAt;
//     this.commits = entity.commits;
//   }
// }

// application/usecase/github/dto/GithubPullRequestListDto.ts

import { GithubPullRequestList } from "@/domain/entities/GithubPullRequestList";

export class GithubPullRequestListDto {
  prNumber: number;
  title: string;
  state: 'open' | 'closed';
  repositoryName: string;
  branchName: string;
  createdAt: string;

  constructor(entity: GithubPullRequestList) {
    this.prNumber = entity.prNumber;
    this.title = entity.title;
    this.state = entity.state;
    this.repositoryName = entity.repositoryName;
    this.branchName = entity.branchName;
    this.createdAt = entity.createdAt;
  }
}
