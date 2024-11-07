import { UsedCarListingEntity } from "@/entities/UsedCarListing";
import { UsedCarListing } from "@prisma/client";

export class ViewSellerSpecificUsedCarListingController {
  private static instance: ViewSellerSpecificUsedCarListingController;
  private usedCarListingEntity: UsedCarListingEntity;

  private constructor(usedCarListingEntity: UsedCarListingEntity) {
    this.usedCarListingEntity = usedCarListingEntity;
  }

  public static getInstance(): ViewSellerSpecificUsedCarListingController {
    if (!ViewSellerSpecificUsedCarListingController.instance) {
      ViewSellerSpecificUsedCarListingController.instance =
        new ViewSellerSpecificUsedCarListingController(UsedCarListingEntity.getInstance());
    }
    return ViewSellerSpecificUsedCarListingController.instance;
  }

  public async viewSellerSpecificUsedCarListingController(email: string): Promise<UsedCarListing[]> {
    const result = await this.usedCarListingEntity.viewUsedCarListingForSellerEntity(email);
    return result;
  }
}
