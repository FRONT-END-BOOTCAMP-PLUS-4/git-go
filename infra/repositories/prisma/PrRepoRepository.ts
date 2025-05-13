import { PrismaClient } from "@/prisma/generated/prisma";
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
}