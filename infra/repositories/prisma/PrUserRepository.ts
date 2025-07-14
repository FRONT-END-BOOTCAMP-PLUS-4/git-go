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
    async getTokenUsage({ userId }: { userId: string }) {
        const today = new Date();
        const date = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ); // 자정 기준

        const usage = await prisma.aiUsage.findUnique({
            where: {
                userId_date: {
                    userId,
                    date,
                },
            },
        });

        if (!usage) {
            // 오늘 기록이 없으면 새로 생성
            return {
                daily_ai_use_count: 0,
                daily_ai_restrict_count: 200000,
            };
        }

        return {
            daily_ai_use_count: usage.usage,
            daily_ai_restrict_count: usage.restrictUsage,
        };
    }

    async updateTokenUsage(userId: string, tokenUsage: number): Promise<void> {
        const today = new Date();
        const date = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        await prisma.aiUsage.upsert({
            where: {
                userId_date: {
                    userId,
                    date,
                },
            },
            update: {
                usage: {
                    increment: tokenUsage,
                },
            },
            create: {
                userId,
                date,
                usage: tokenUsage,
                restrictUsage: 200000, // 기본 제한치
            },
        });
    }
}
