/*
  Warnings:

  - You are about to drop the column `projectId` on the `Invoice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Invoice" DROP CONSTRAINT "Invoice_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_projectId_fkey";

-- AlterTable
ALTER TABLE "public"."Invoice" DROP COLUMN "projectId";
