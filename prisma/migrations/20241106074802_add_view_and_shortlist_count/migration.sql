-- AlterTable
ALTER TABLE "UsedCarListing" ADD COLUMN     "shortlistCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;
