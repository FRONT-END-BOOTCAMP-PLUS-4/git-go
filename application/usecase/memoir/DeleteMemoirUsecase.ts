import { MemoirRepository } from "@/domain/repositories/MemoirRepository";

export class DeleteMemoirUsecase {
    constructor(private memoirRepository: MemoirRepository) {}

    async execute(id: number) {
        return await this.memoirRepository.delete(id);
    }
}
