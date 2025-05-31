import { MemoirRepository } from "@/domain/repositories/MemoirRepository";
import { FetchMemoirCountDto } from "./dto/FetchMemoirCountDto";

export class FetchMemoirCountUsecase {
    constructor(private repo: MemoirRepository) {}

    async execute(dto: FetchMemoirCountDto): Promise<number> {
        return this.repo.countByRepoName(dto.repoId, dto.userId);
    }
}
