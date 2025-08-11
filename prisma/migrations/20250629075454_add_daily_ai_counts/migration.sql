-- AlterTable
ALTER TABLE "user" ADD COLUMN     "daily_ai_restrict_count" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "daily_ai_use_count" INTEGER NOT NULL DEFAULT 0;
