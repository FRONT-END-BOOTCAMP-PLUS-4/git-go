import { UpdateTokenUsageDto } from "./dto/UpdateTokenUsageDto";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class UpdateTokenUsageUsecase {
    constructor(private readonly repository: UserRepository) {}

    async execute(input: UpdateTokenUsageDto): Promise<{
        usage: number;
        restrictUsage: number;
    }> {
        return await this.repository.updateTokenUsage(
            input.userId,
            input.tokenUsage
        );
    }
}
