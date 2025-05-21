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

export class GithubPullRequestPageDto {
    list: GithubPullRequestListDto[];
    totalCount: number;

    constructor(list: GithubPullRequestList[], totalCount: number) {
        this.list = list.map((pr) => new GithubPullRequestListDto(pr));
        this.totalCount = totalCount;
    }
}
