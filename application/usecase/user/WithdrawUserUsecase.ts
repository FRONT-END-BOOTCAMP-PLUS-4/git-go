import { UserRepository } from "@/domain/repositories/UserRepository";

export class WithdrawUserUsecase {
    constructor(private readonly repo: UserRepository) {}

    async execute(userId: string): Promise<void> {
        await this.repo.withdrawUser(userId);
    }
}
