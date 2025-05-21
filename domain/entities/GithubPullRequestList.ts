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
