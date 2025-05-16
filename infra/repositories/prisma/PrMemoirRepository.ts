import { PrismaClient } from "@/prisma/generated/prisma";
import { MemoirRepository } from "@/domain/repositories/MemoirRepository";

const prisma = new PrismaClient();

export class PrMemoirRepository implements MemoirRepository {
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