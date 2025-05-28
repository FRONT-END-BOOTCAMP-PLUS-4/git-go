import { UserRepository } from "@/domain/repositories/UserRepository";

export class CommitSettingUserUsecase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(userId: string, isDefaultOnly: boolean): Promise<void> {
        await this.userRepo.updateCommitSetting(userId, isDefaultOnly);
    }
}
