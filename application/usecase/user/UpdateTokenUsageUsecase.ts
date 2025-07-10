import { UpdateTokenUsageDto } from "./dto/UpdateTokenUsageDto";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class UpdateTokenUsageUsecase {
    constructor(private readonly repository: UserRepository) {}

    async execute(input: UpdateTokenUsageDto): Promise<void> {
        const { userId, tokenUsage } = input;
        await this.repository.updateTokenUsage(userId, tokenUsage);
    }
}
