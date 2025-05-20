// application/usecase/github/dto/GithubPullRequestCommitDto.ts

import { GithubPrCommitList } from "@/domain/entities/GithubPrCommitList";

export class GithubPrCommitDto {
  sha: string;
  message: string;
  authorName: string;
  authoredDate: string;
  additions: number;
  deletions: number;

  constructor(entity: GithubPrCommitList) {
    this.sha = entity.sha;
    this.message = entity.message;
    this.authorName = entity.authorName;
    this.authoredDate = entity.authoredDate;
    this.additions = entity.additions;
    this.deletions = entity.deletions;
  }
}
