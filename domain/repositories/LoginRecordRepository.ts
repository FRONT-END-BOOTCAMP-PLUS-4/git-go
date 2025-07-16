export interface LoginRecordRepository {
    getRecentLoginDates(userId: string, limit: number): Promise<Date[]>;
}
