import { Memoir } from "@/prisma/generated/prisma";

export interface MemoirRepository {
    findByUserId(userId: string, repoId?: string): Promise<any[]>;
    countByRepoName(name: string, userId: string): Promise<number>;

    create(data: {
        title: string;
        content: string;
        source: string;
        userId: string;
        repoId: number;
        typeId: number;
        aiSum?: string;
        tags?: string[];
    }): Promise<Memoir>;

    findByMemoirId(id: number): Promise<Memoir>;

    edit(data: {
        title: string;
        content: string;
        memoirId: number;
        tags?: string[];
    }): Promise<Memoir>;
}
