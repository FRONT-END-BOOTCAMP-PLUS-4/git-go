import { PrismaClient } from "@/prisma/generated/prisma";
import { MemoirRepository } from "@/domain/repositories/MemoirRepository";

const prisma = new PrismaClient();

export class PrMemoirRepository implements MemoirRepository {
    async findByUserId(userId: string, repoName?: string) {
        let repoFilter: { repoId?: number } = {};
        if (repoName) {
            const repo = await prisma.repo.findFirst({
                where: {
                    name: repoName,
                    userId,
                },
            });
            if (!repo) return [];
            repoFilter.repoId = repo.id;
        }

        return prisma.memoir.findMany({
            where: {
                userId,
                ...repoFilter,
            },
            include: {
                type: true,
                repo: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }

    async countByRepoName(name: string): Promise<number> {
        return await prisma.memoir.count({
            where: {
                repo: {
                    name,
                },
            },
        });
    }
}