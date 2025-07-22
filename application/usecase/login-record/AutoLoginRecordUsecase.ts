import { LoginRecordRepository } from "@/domain/repositories/LoginRecordRepository";
import { AutoLoginRecordDto } from "./dto/AutoLoginRecordDto";

export class AutoLoginRecordUsecase {
    constructor(private readonly repo: LoginRecordRepository) {}

    async execute(dto: AutoLoginRecordDto): Promise<void> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        await this.repo.upsertLoginRecord(dto.userId, today);
    }
}
