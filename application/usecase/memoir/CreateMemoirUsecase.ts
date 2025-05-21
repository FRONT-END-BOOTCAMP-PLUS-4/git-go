import { MemoirRepository } from "@/domain/repositories/MemoirRepository";
import { CreateMemoirRequestDto } from "./dto/CreateMemoirDto";

export class CreateMemoirUsecase {
    constructor(private memoirRepository: MemoirRepository) {}

    async execute(createMemoirRequestDto: CreateMemoirRequestDto) {
        return await this.memoirRepository.create(createMemoirRequestDto);
    }
}
