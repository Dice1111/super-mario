-- CreateTable
CREATE TABLE "UsedCarListing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "agentEmail" TEXT NOT NULL,
    "sellerEmail" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "manufacturedYear" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsedCarListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentReview" (
    "id" TEXT NOT NULL,
    "agentEmail" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsedCarListing" ADD CONSTRAINT "UsedCarListing_agentEmail_fkey" FOREIGN KEY ("agentEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsedCarListing" ADD CONSTRAINT "UsedCarListing_sellerEmail_fkey" FOREIGN KEY ("sellerEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
