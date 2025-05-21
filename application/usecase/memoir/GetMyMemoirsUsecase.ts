import { MemoirRepository } from "@/domain/repositories/MemoirRepository";
import { MemoirListDto } from "./dto/MemoirListDto";

export class GetMyMemoirsUsecase {
    constructor(private readonly repo: MemoirRepository) { }

    async execute(userId: string, repoId?: string): Promise<MemoirListDto[]> {
        const memoirs = await this.repo.findByUserId(userId, repoId);
        return memoirs.map((m) => new MemoirListDto(m));
    }
}