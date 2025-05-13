import { PrismaClient } from "@/prisma/generated/prisma";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { JoinUserDto } from "@/application/usecase/user/dto/JoinUserDto";

const prisma = new PrismaClient();

export class PrUserRepository implements UserRepository {
    async create({ githubId, username, profileUrl }: JoinUserDto) {
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
}