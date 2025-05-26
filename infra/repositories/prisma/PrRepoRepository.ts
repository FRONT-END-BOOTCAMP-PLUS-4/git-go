import { PrismaClient, Repo } from "@/prisma/generated/prisma";
import { RepoRepository } from "@/domain/repositories/RepoRepository";

const prisma = new PrismaClient();

export class PrRepoRepository implements RepoRepository {
    async saveRepos(data: { userId: string; repos: { name: string }[] }) {
        await prisma.repo.createMany({
            data: data.repos.map((repo) => ({
                name: repo.name,
                userId: data.userId,
            })),
        });
    }

    async findByUserId(userId: string): Promise<Repo[]> {
        return await prisma.repo.findMany({
            where: { userId },
        });
    }

    async deleteByNames(userId: string, names: string[]): Promise<void> {
        await prisma.repo.deleteMany({
            where: {
                userId,
                name: { in: names },
            },
        });
    }

    async hasMemoirs(repoName: string): Promise<boolean> {
        const count = await prisma.memoir.count({
            where: {
                repo: { name: repoName },
            },
        });
        return count > 0;
    }
}