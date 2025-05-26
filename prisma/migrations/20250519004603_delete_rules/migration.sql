-- DropForeignKey
ALTER TABLE "memoir" DROP CONSTRAINT "memoir_repoId_fkey";

-- DropForeignKey
ALTER TABLE "memoir_tag" DROP CONSTRAINT "memoir_tag_memoirId_fkey";

-- AddForeignKey
ALTER TABLE "memoir" ADD CONSTRAINT "memoir_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "repo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memoir_tag" ADD CONSTRAINT "memoir_tag_memoirId_fkey" FOREIGN KEY ("memoirId") REFERENCES "memoir"("id") ON DELETE CASCADE ON UPDATE CASCADE;
