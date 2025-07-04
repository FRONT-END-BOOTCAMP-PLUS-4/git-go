import { User } from "@/prisma/generated/prisma";

export interface UserRepository {
    create(data: {
        githubId: string;
        username: string;
        profileUrl?: string;
    }): Promise<User>;
    withdrawUser(userId: string): Promise<void>;
    getCommitSetting(userId: string): Promise<boolean>;
    updateCommitSetting(userId: string, isDefaultOnly: boolean): Promise<void>;
    updateTokenUsage(userId: string, tokenUsage: number): Promise<void>;
}
