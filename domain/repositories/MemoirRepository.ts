import { Memoir } from "@/prisma/generated/prisma";

export interface MemoirRepository {
    findByUserId(userId: string, repoId?: number): Promise<any[]>;
    countByRepoName(name: string): Promise<number>;

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
}
