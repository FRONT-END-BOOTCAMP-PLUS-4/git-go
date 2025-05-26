import { MemoirRepository } from "@/domain/repositories/MemoirRepository";
import { EditMemoirRequestDto } from "./dto/EditMemoirDto";

export class EditMemoirUsecase {
    constructor(private memoirRepository: MemoirRepository) {}

    async execute(editMemoirRequestDto: EditMemoirRequestDto) {
        return await this.memoirRepository.edit(editMemoirRequestDto);
    }
}
