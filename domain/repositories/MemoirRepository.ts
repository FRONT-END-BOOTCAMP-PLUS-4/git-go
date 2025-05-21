export interface MemoirRepository {
    findByUserId(userId: string, repoId?: number): Promise<any[]>;
    countByRepoName(name: string): Promise<number>;
}
