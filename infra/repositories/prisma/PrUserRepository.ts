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

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (existing) {
            // 이미 존재하는 유저 로그인 기록 추가
            await prisma.loginRecord.upsert({
                where: {
                    userId_date: {
                        userId: existing.id,
                        date: today,
                    },
                },
                update: {},
                create: {
                    userId: existing.id,
                    date: today,
                },
            });

            if (profileUrl && existing.profileUrl !== profileUrl) {
                return prisma.user.update({
                    where: { id: existing.id },
                    data: { profileUrl },
                });
            }
            return existing;
        }

        const user = await prisma.user.create({
            data: { githubId, username, profileUrl },
        });

        // 새로운 유저 로그인 기록 추가
        await prisma.loginRecord.create({
            data: {
                userId: user.id,
                date: today,
            },
        });

        return user;
    }

    // 회원탈퇴
    async withdrawUser(userId: string): Promise<void> {
        await prisma.user.update({
            where: { id: userId },
            data: { deletedAt: new Date() },
        });
    }

    // 커밋 설정 불러오기
    async getCommitSetting(userId: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { isDefaultOnly: true },
        });

        if (!user) throw new Error("User not found");
        return user.isDefaultOnly;
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
