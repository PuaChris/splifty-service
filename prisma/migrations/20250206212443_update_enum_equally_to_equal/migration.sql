/*
  Warnings:

  - The values [Equally] on the enum `SplitMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SplitMethod_new" AS ENUM ('Equal', 'Amount', 'Percent');
ALTER TABLE "Expense" ALTER COLUMN "splitMethod" TYPE "SplitMethod_new" USING ("splitMethod"::text::"SplitMethod_new");
ALTER TYPE "SplitMethod" RENAME TO "SplitMethod_old";
ALTER TYPE "SplitMethod_new" RENAME TO "SplitMethod";
DROP TYPE "SplitMethod_old";
COMMIT;
