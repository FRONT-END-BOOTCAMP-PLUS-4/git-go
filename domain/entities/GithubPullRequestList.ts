// export interface GithubPullRequestCommit {
//   sha: string;
//   message: string;
//   authorName: string;
//   authoredDate: string;
//   additions: number;
//   deletions: number;
// }

// export class GithubPullRequestList {
//   constructor(
//     public prNumber: number,
//     public title: string,
//     public state: 'open' | 'closed',
//     public repositoryName: string,
//     public branchName: string,
//     public createdAt: string,
//     public commits: GithubPullRequestCommit[]
//   ) { }
// }

// domain/entities/GithubPullRequestList.ts

export class GithubPullRequestList {
  constructor(
    public prNumber: number,
    public title: string,
    public state: 'open' | 'closed',
    public repositoryName: string,
    public branchName: string,
    public createdAt: string
  ) { }
}
