/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userEmail_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserProfile";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Status";
