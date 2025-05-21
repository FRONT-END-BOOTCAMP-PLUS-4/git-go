export interface MemoirRepository {
    findByUserId(userId: string): Promise<any[]>;
    countByRepoName(name: string): Promise<number>;
}
