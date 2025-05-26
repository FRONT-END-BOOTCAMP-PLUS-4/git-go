import { PrismaClient } from "@/prisma/generated/prisma";
import { UserRepository } from "@/domain/repositories/UserRepository";

const prisma = new PrismaClient();

export class PrUserRepository implements UserRepository {
    // 회원가입(중복확인 기능 포함)
    async create({
        githubId,
        username,
        profileUrl,
    }: {
        githubId: string;
        username: string;
        profileUrl?: string;
    }) {
        const existing = await prisma.user.findFirst({
            where: {
                githubId,
                deletedAt: null,
            },
        });

        if (existing) {
            if (profileUrl && existing.profileUrl !== profileUrl) {
                return prisma.user.update({
                    where: { id: existing.id },
                    data: { profileUrl },
                });
            }
            return existing;
        }

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

    // 커밋 설정 업데이트
    async updateCommitSetting(
        userId: string,
        isDefaultOnly: boolean
    ): Promise<void> {
        await prisma.user.update({
            where: { id: userId },
            data: { isDefaultOnly },
        });
    }
}
