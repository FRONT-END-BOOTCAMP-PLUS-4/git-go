import { PrismaClient } from "@/prisma/generated/prisma";
import { UserRepository } from "@/domain/repositories/UserRepository";

const prisma = new PrismaClient();

export class PrUserRepository implements UserRepository {
    // 회원가입(중복확인 기능 포함)
    async create({ githubId, username, profileUrl }: {
        githubId: string;
        username: string;
        profileUrl?: string;
    }) {
        const existing = await prisma.user.findFirst({
            where: {
                githubId,
                deletedAt: null, // 삭제되지 않은 사용자만
            },
        });
        if (existing) return existing;

        return prisma.user.create({
            data: { githubId, username, profileUrl },
        });
    }

    // 회원탈퇴
    async withdrawUser(userId: string): Promise<void> {
        await prisma.user.update({
            where: { id: userId },
            data: { deletedAt: new Date() },
        });
    }
}