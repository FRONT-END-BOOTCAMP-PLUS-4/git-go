import { MemoirRepository } from "@/domain/repositories/MemoirRepository";
import { MemoirListDto } from "./dto/MemoirListDto";

export class GetMyMemoirsUsecase {
    constructor(private readonly repo: MemoirRepository) { }

    async execute(userId: string, repoId?: string, page = 1, perPage = 10, createdAfter?: Date): Promise<{ list: MemoirListDto[]; totalCount: number; }> {
        const [memoirs, totalCount] = await this.repo.findByUserIdPaginated(userId, repoId, page, perPage, createdAfter);
        const dtoList = memoirs.map((m) => new MemoirListDto(m));
        return { list: dtoList, totalCount };
    }
}