/*
  Warnings:

  - A unique constraint covering the columns `[userId,expenseId]` on the table `Parties` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Parties_expenseId_key";

-- DropIndex
DROP INDEX "Parties_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Parties_userId_expenseId_key" ON "Parties"("userId", "expenseId");
