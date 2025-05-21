export interface MemoirRepository {
    findByUserId(userId: string, repoId?: string): Promise<any[]>;
    countByRepoName(name: string): Promise<number>;
}
