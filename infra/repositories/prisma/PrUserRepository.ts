import { PrismaClient } from "@/prisma/generated/prisma";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { JoinUserDto } from "@/application/usecase/user/dto/JoinUserDto";

const prisma = new PrismaClient();

export class PrUserRepository implements UserRepository {
    async create({ githubId, username, profileUrl }: JoinUserDto) {
        return prisma.user.create({ data: { githubId, username, profileUrl } });
    }
}