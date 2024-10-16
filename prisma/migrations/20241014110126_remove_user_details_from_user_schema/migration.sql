/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageUrl",
DROP COLUMN "name",
DROP COLUMN "role";

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "role" "Role"[] DEFAULT ARRAY['buyer']::"Role"[];
