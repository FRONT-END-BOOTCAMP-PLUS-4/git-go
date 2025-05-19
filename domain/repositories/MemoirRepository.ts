export interface MemoirRepository {
    countByRepoName(name: string): Promise<number>;
}
