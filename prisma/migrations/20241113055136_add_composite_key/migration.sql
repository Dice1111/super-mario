/*
  Warnings:

  - A unique constraint covering the columns `[userEmail,listingId]` on the table `Shortlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shortlist_userEmail_listingId_key" ON "Shortlist"("userEmail", "listingId");
