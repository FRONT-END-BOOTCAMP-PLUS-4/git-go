import { MemoirHeatmapDto } from "./dto/MemoirHeatmapDto";
import { MemoirRepository } from "@/domain/repositories/MemoirRepository";

export class GetMemoirHeatmapUsecase {
    constructor(private repo: MemoirRepository) {}

    async execute(userId: string): Promise<MemoirHeatmapDto[]> {
        return this.repo.getMemoirHeatmap(userId);
    }
}
