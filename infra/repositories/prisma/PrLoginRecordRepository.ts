import { PrismaClient } from "@/prisma/generated/prisma";
import { LoginRecordRepository } from "@/domain/repositories/LoginRecordRepository";

const prisma = new PrismaClient();

export class PrLoginRecordRepository implements LoginRecordRepository {
    async getRecentLoginDates(userId: string, limit: number): Promise<Date[]> {
        const records = await prisma.loginRecord.findMany({
            where: { userId },
            orderBy: { date: "desc" },
            take: limit,
        });
        return records.map((r) => r.date);
    }
}
