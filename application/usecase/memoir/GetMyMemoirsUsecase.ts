import { MemoirRepository } from "@/domain/repositories/MemoirRepository";
import { MemoirListDto } from "./dto/MemoirListDto";

export class GetMyMemoirsUsecase {
    constructor(private readonly repo: MemoirRepository) { }

    async execute(userId: string, repoId?: string, page = 1, perPage = 10, createdAfter?: Date, filterType: "commits" | "pullRequests" | "all" = "all", tags?: string[], searchKeyword?: string): Promise<{ list: MemoirListDto[]; totalCount: number; }> {
        const [memoirs, totalCount] = await this.repo.findByUserIdPaginated(userId, repoId, page, perPage, createdAfter, filterType, tags, searchKeyword);
        const dtoList = memoirs.map((m) => new MemoirListDto(m));
        return { list: dtoList, totalCount };
    }
}