import { Memoir } from "@/prisma/generated/prisma";

export interface MemoirRepository {
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
