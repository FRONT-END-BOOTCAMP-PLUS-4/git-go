export interface GithubCommitItemDto {
  sha: string;
  message: string;
  branch: string;
  repo: string;
  type: string;
  createdAt: string;
}

export interface GithubCommitListDto {
  commits: GithubCommitItemDto[];
  hasNextPage: boolean;
  totalCount: number;
}
