/*
  Warnings:

  - You are about to drop the column `userId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Invoice" DROP CONSTRAINT "Invoice_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Invoice" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
