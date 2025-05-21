import { PrismaClient } from "@/prisma/generated/prisma";
import { MemoirRepository } from "@/domain/repositories/MemoirRepository";

const prisma = new PrismaClient();

export class PrMemoirRepository implements MemoirRepository {
    async findByUserId(userId: string) {
        return prisma.memoir.findMany({
            where: { userId },
            include: {
                type: true,
                repo: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: { updatedAt: "desc" },
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