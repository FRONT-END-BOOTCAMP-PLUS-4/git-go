import { UserRepository } from "@/domain/repositories/UserRepository";

export class WithdrawUser {
    constructor(private readonly repo: UserRepository) { }

    async execute(userId: string): Promise<void> {
        await this.repo.withdrawUser(userId);
    }
}