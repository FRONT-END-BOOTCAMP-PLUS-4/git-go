// // infra/repositories/gb-pull-request.repository.ts

// import { GithubPullRequestList } from "@/domain/entities/GithubPullRequestList";
// import { GithubPullRequestRepository } from "@/domain/repositories/GithubPullRequestRepository";

// export class GbPullRequestRepository implements GithubPullRequestRepository {
//   private GITHUB_API_BASE = 'https://api.github.com/graphql';

//   constructor(private token: string) { }

//   async fetchByUsername(
//     repoFullName: string,
//     username: string,
//     perPage: number = 10,
//     afterCursor: string | null = null // 커서 기반 페이지네이션용
//   ): Promise<{
//     prList: GithubPullRequestList[];
//     endCursor: string | null;
//     hasNextPage: boolean;
//   }> {
//     const [owner, repo] = repoFullName.split('/');

//     const queryString = `repo:${owner}/${repo} type:pr author:${username}`;

//     const query = `
//       query ($queryString: String!, $perPage: Int!, $afterCursor: String) {
//         search(query: $queryString, type: ISSUE, first: $perPage, after: $afterCursor) {
//           issueCount
//           pageInfo {
//             endCursor
//             hasNextPage
//           }
//           edges {
//             node {
//               ... on PullRequest {
//                 number
//                 title
//                 state
//                 createdAt
//                 baseRefName
//                 headRefName
//                 repository {
//                   name
//                   defaultBranchRef {
//                     name
//                   }
//                 }
//                 commits(first: 100) {
//                   nodes {
//                     commit {
//                       oid
//                       message
//                       authoredDate
//                       author {
//                         name
//                       }
//                       additions
//                       deletions
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     `;

//     const variables = { queryString, perPage, afterCursor };

//     const res = await fetch(this.GITHUB_API_BASE, {
//       method: 'POST',
//       headers: this.headers(),
//       body: JSON.stringify({ query, variables }),
//     });

//     const result = await res.json();

//     if (result.errors) {
//       throw new Error(`GitHub GraphQL API Error: ${JSON.stringify(result.errors)}`);
//     }

//     const searchData = result.data.search;
//     const edges = searchData.edges;

//     const prList: GithubPullRequestList[] = edges.map((edge: any) => {
//       const pr = edge.node;
//       const defaultBranch = pr.repository.defaultBranchRef?.name ?? 'main';

//       const sourceBranch = pr.headRefName;
//       const baseBranch = pr.baseRefName;
//       const isDuplicate = baseBranch === sourceBranch;
//       const branchName = isDuplicate ? defaultBranch : sourceBranch;

//       const commits = pr.commits.nodes.map((commitNode: any) => ({
//         sha: commitNode.commit.oid,
//         message: commitNode.commit.message,
//         authorName: commitNode.commit.author?.name ?? 'unknown',
//         authoredDate: commitNode.commit.authoredDate,
//         additions: commitNode.commit.additions,
//         deletions: commitNode.commit.deletions,
//       }));

//       return new GithubPullRequestList(
//         pr.number,
//         pr.title,
//         pr.state,
//         repo,
//         branchName,
//         pr.createdAt,
//         commits
//       );
//     });

//     return {
//       prList,
//       endCursor: searchData.pageInfo.endCursor,
//       hasNextPage: searchData.pageInfo.hasNextPage,
//     };
//   }

//   private headers() {
//     return {
//       Authorization: `Bearer ${this.token}`,
//       'Content-Type': 'application/json',
//     };
//   }
// }


import { GithubPullRequestList } from "@/domain/entities/GithubPullRequestList";
import { GithubPullRequestRepository } from "@/domain/repositories/GithubPullRequestRepository";

export class GbPullRequestRepository implements GithubPullRequestRepository {
  private GITHUB_API_BASE = "https://api.github.com";

  constructor(private token: string) { }

  async fetchByUsername(
    repoFullName: string,
    username: string,
    perPage: number = 10,
    page: number = 1
  ): Promise<GithubPullRequestList[]> {
    const [owner, repo] = repoFullName.split("/");

    // 1. 저장소 정보 (디폴트 브랜치 확인용)
    // const repoRes = await fetch(`${this.GITHUB_API_BASE}/repos/${owner}/${repo}`, {
    //   headers: this.headers(),
    // });
    // const repoData = await repoRes.json();
    // const defaultBranch = repoData.default_branch;

    // 2. PR 검색
    const searchUrl = `${this.GITHUB_API_BASE}/search/issues?q=repo:${owner}/${repo}+type:pr+author:${username}&per_page=${perPage}&page=${page}`;
    const searchRes = await fetch(searchUrl, { headers: this.headers() });
    const searchData = await searchRes.json();

    const prList: GithubPullRequestList[] = [];

    for (const pr of searchData.items || []) {
      const prNumber = pr.number;

      // 3. PR 상세 정보
      const prDetailRes = await fetch(
        `${this.GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${prNumber}`,
        { headers: this.headers() }
      );
      const prDetail = await prDetailRes.json();

      const sourceBranch = prDetail.head.ref;
      const baseBranch = prDetail.base.ref;
      // const isDuplicate = sourceBranch === baseBranch;
      // const branchName = isDuplicate ? defaultBranch : sourceBranch;
      const branchName = sourceBranch;

      // 4. 커밋 목록
      const commitRes = await fetch(
        `${this.GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${prNumber}/commits`,
        { headers: this.headers() }
      );
      const commitsRaw = await commitRes.json();

      const commits = await Promise.all(
        commitsRaw.map(async (commit: any) => {
          const commitDetailRes = await fetch(
            `${this.GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${commit.sha}`,
            { headers: this.headers() }
          );
          const commitDetail = await commitDetailRes.json();

          return {
            sha: commit.sha,
            message: commit.commit.message,
            authorName: commit.commit.author?.name ?? "unknown",
            authoredDate: commit.commit.author?.date,
            additions: commitDetail.stats?.additions ?? 0,
            deletions: commitDetail.stats?.deletions ?? 0,
          };
        })
      );

      prList.push(
        new GithubPullRequestList(
          pr.number,
          pr.title,
          pr.state,
          repo,
          branchName,
          pr.created_at,
          commits
        )
      );
    }

    return prList;
  }

  private headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/vnd.github+json",
    };
  }
}
