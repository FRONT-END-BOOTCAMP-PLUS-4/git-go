import { UserRepository } from "@/domain/repositories/UserRepository";

export class GetCommitSettingUsecase {
    constructor(private userRepo: UserRepository) {}

    async execute(userId: string): Promise<boolean> {
        return await this.userRepo.getCommitSetting(userId);
    }
}
