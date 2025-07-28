import { LoginRecordRepository } from "@/domain/repositories/LoginRecordRepository";
import { GetLoginStreakDto } from "./dto/GetLoginStreakDto";
import { LoginStreakResultDto } from "./dto/LoginStreakResultDto";

export class GetLoginStreakUsecase {
    constructor(private readonly repo: LoginRecordRepository) {}

    async execute(dto: GetLoginStreakDto): Promise<LoginStreakResultDto> {
        const recentDates = await this.repo.getRecentLoginDates(dto.userId, 30);

        let streak = 0;
        const expected = new Date();
        expected.setHours(0, 0, 0, 0);

        for (const d of recentDates) {
            const date = new Date(d);
            date.setHours(0, 0, 0, 0);

            if (date.getTime() === expected.getTime()) {
                streak++;
                expected.setDate(expected.getDate() - 1);
            } else {
                break;
            }
        }

        return new LoginStreakResultDto(streak);
    }
}
