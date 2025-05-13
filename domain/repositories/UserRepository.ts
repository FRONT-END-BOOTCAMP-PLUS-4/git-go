import { User } from "@/prisma/generated/prisma";

export interface UserRepository {
    create(data: { githubId: string; username: string; profileUrl?: string }): Promise<User>;
}