/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `content` on the `memoir` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "memoir" DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");
