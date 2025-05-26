import { Memoir } from "@/prisma/generated/prisma";

export interface MemoirRepository {
    findByUserId(userId: string, repoId?: string): Promise<any[]>;
    findByUserIdPaginated(
        userId: string,
        repoId?: string,
        page?: number,
        perPage?: number,
        createdAfter?: Date,
        filterType?: "commits" | "pullRequests" | "all",
        tags?: string[],
        searchKeyword?: string
    ): Promise<[any[], number]>;
    countByRepoName(name: string, userId: string): Promise<number>;
    findAllTagsByUser(userId: string, repoId?: string): Promise<string[]>;

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
        aiSum?: string;
    }): Promise<Memoir>;

    delete(id: number): Promise<null>;
}
