-- CreateTable
CREATE TABLE "login_record" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "login_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "login_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "login_record_userId_login_date_key" ON "login_record"("userId", "login_date");

-- AddForeignKey
ALTER TABLE "login_record" ADD CONSTRAINT "login_record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
