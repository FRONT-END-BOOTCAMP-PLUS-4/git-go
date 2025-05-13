export interface RepoRepository {
    saveRepos(data: { userId: string; repos: { name: string }[] }): Promise<void>;
}