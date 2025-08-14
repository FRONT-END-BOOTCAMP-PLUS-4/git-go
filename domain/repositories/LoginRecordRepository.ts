export interface LoginRecordRepository {
    getRecentLoginDates(userId: string, limit: number): Promise<Date[]>;
    upsertLoginRecord(userId: string, date: Date): Promise<void>;
}
