/*
  Warnings:

  - Made the column `address` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mobileNumber` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "mobileNumber" SET NOT NULL;
