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

// infra/repositories/GbPullRequestRepository.ts

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

    const searchUrl = `${this.GITHUB_API_BASE}/search/issues?q=repo:${owner}/${repo}+type:pr+author:${username}&per_page=${perPage}&page=${page}`;
    const searchRes = await fetch(searchUrl, { headers: this.headers() });

    if (!searchRes.ok) {
      throw new Error(`Failed to fetch PR list: ${searchRes.statusText}`);
    }

    const searchData = await searchRes.json();
    const prList: GithubPullRequestList[] = [];

    for (const pr of searchData.items || []) {
      const prNumber = pr.number;

      const prDetailRes = await fetch(
        `${this.GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${prNumber}`,
        { headers: this.headers() }
      );

      if (!prDetailRes.ok) {
        throw new Error(`Failed to fetch PR detail for #${prNumber}`);
      }

      const prDetail = await prDetailRes.json();

      const sourceBranch = prDetail.head.ref;
      const branchName = sourceBranch;

      prList.push(
        new GithubPullRequestList(
          pr.number,
          pr.title,
          pr.state,
          repo,
          branchName,
          pr.created_at,
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
