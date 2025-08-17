/*
  Warnings:

  - You are about to drop the column `amount` on the `Invoice` table. All the data in the column will be lost.
  - The `dueDate` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Invoice" DROP COLUMN "amount",
DROP COLUMN "dueDate",
ADD COLUMN     "dueDate" TIMESTAMP(3);
