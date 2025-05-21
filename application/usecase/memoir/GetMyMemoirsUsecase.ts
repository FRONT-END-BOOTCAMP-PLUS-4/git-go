import { MemoirRepository } from "@/domain/repositories/MemoirRepository";
import { MemoirListDto } from "./dto/MemoirListDto";

// export class GetMyMemoirsUsecase {
//     constructor(private readonly repo: MemoirRepository) { }

//     async execute(userId: string): Promise<MemoirListDto[]> {
//         const memoirs = await this.repo.findByUserId(userId);
//         return memoirs.map((m) => new MemoirListDto(m));
//     }
// }

export class GetMyMemoirsUsecase {
    constructor(private readonly repo: MemoirRepository) { }

    async execute(userId: string, repoId?: number): Promise<MemoirListDto[]> {
        console.log("GetMyMemoirsUsecase", userId, repoId);
        const memoirs = await this.repo.findByUserId(userId, repoId);
        return memoirs.map((m) => new MemoirListDto(m));
    }
}