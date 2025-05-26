import { MemoirRepository } from "@/domain/repositories/MemoirRepository";

export class GetMemoirTagsUsecase {
    constructor(private readonly repo: MemoirRepository) { }

    async execute(userId: string, repoId?: string): Promise<string[]> {
        return this.repo.findAllTagsByUser(userId, repoId);
    }
}