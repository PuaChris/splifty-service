-- CreateEnum
CREATE TYPE "SplitMethod" AS ENUM ('Equally', 'Amount', 'Percent');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "splitMethod" "SplitMethod" NOT NULL DEFAULT 'Amount';
