import { MemoirRepository } from "@/domain/repositories/MemoirRepository";

interface Input {
    userId: string;
}

interface Output {
    count: number;
}

export class GetMemoirTotalCountUsecase {
    constructor(private readonly repo: MemoirRepository) {}

    async execute({ userId }: Input): Promise<Output> {
        const count = await this.repo.totalCountMemoirsByUser(userId);
        return { count };
    }
}
