import { GithubRepoRepository } from "@/domain/repositories/GithubRepoRepository";
import { GitHubRepoDto } from "@/application/usecase/github/dto/GitHubRepoDto";

export class FetchFromGithub implements GithubRepoRepository {
    async fetchAll(token: string): Promise<GitHubRepoDto[]> {
        const query = `
      query {
  viewer {
    contributionsCollection {
      commitContributionsByRepository(maxRepositories: 100) {
        repository {
          id
          name
          nameWithOwner
          url
          isPrivate
          description
          updatedAt
          stargazerCount
          primaryLanguage {
            name
            color
          }
        }
      }
      pullRequestContributionsByRepository(maxRepositories: 100) {
        repository {
          id
          name
          nameWithOwner
          url
          isPrivate
          description
          updatedAt
          stargazerCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }
    repositories(first: 100, ownerAffiliations: [OWNER]) {
      nodes {
        id
        name
        nameWithOwner
        url
        isPrivate
        description
        updatedAt
        stargazerCount
        primaryLanguage {
          name
          color
        }
      }
    }
  }
}
    `;

        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        if (!res.ok) throw new Error("GitHub 레포 불러오기 실패");

        const json = await res.json();
        const { contributionsCollection, repositories } = json.data.viewer;

        const extractRepos = (arr: any[]) =>
            arr.map((c: any) => {
                const r = c.repository ?? c; // node or wrapped repository
                return new GitHubRepoDto(
                    r.id,
                    r.name,
                    r.nameWithOwner,
                    r.url,
                    r.isPrivate,
                    r.description,
                    r.updatedAt,
                    r.stargazerCount,
                    r.primaryLanguage?.name,
                    r.primaryLanguage?.color
                );
            });

        const fromCommits = extractRepos(contributionsCollection.commitContributionsByRepository);
        const fromPRs = extractRepos(contributionsCollection.pullRequestContributionsByRepository);
        const fromOwner = extractRepos(repositories.nodes);

        const all = [...fromCommits, ...fromPRs, ...fromOwner];
        const map = new Map<string, GitHubRepoDto>();
        for (const repo of all) {
            map.set(repo.nameWithOwner, repo);
        }

        return Array.from(map.values());
    }
}