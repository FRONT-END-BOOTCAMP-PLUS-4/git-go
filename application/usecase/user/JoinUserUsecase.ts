import { User } from "@/prisma/generated/prisma";
import { JoinUserDto } from "./dto/JoinUserDto";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class JoinUserUsecase {
    constructor(private readonly repo: UserRepository) {}

    async execute(dto: JoinUserDto): Promise<User> {
        return await this.repo.create(dto);
    }
}
