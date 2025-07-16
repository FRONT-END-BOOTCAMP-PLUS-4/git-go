/*
  Warnings:

  - You are about to drop the column `daily_ai_restrict_count` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `daily_ai_use_count` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "daily_ai_restrict_count",
DROP COLUMN "daily_ai_use_count";

-- CreateTable
CREATE TABLE "usage" (
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usage" INTEGER NOT NULL DEFAULT 0,
    "restrictUsage" INTEGER NOT NULL DEFAULT 200000,

    CONSTRAINT "usage_pkey" PRIMARY KEY ("userId","date")
);

-- AddForeignKey
ALTER TABLE "usage" ADD CONSTRAINT "usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
