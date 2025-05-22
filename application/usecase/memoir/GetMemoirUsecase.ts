import { MemoirRepository } from "@/domain/repositories/MemoirRepository";

export class GetMemoirUsecase {
    constructor(private memoirRepository: MemoirRepository) {}

    async execute(id: number) {
        return await this.memoirRepository.findByMemoirId(id);
    }
}
