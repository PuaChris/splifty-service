/*
  Warnings:

  - Added the required column `paidById` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "paidById" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "type" TEXT;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_paidById_fkey" FOREIGN KEY ("paidById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
