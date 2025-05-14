-- CreateTable
CREATE TABLE "repo" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "repo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memoir" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "ai_sum" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "repoId" INTEGER NOT NULL,

    CONSTRAINT "memoir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profile_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "githubId" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memoir_type" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "memoir_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memoir_tag" (
    "memoirId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "memoir_tag_pkey" PRIMARY KEY ("memoirId","tagId")
);

-- AddForeignKey
ALTER TABLE "repo" ADD CONSTRAINT "repo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memoir" ADD CONSTRAINT "memoir_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "repo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memoir" ADD CONSTRAINT "memoir_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "memoir_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memoir" ADD CONSTRAINT "memoir_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memoir_tag" ADD CONSTRAINT "memoir_tag_memoirId_fkey" FOREIGN KEY ("memoirId") REFERENCES "memoir"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memoir_tag" ADD CONSTRAINT "memoir_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
