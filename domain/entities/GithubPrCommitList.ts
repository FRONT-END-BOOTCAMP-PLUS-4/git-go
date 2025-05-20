// domain/entities/GithubPrCommitList.ts

export class GithubPrCommitList {
  constructor(
    public sha: string,
    public message: string,
    public authorName: string,
    public authoredDate: string,
    public additions: number,
    public deletions: number
  ) { }
}
