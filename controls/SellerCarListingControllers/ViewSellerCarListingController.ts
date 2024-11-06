import { UsedCarListingEntity } from "@/entities/UsedCarListing";
import { UsedCarListing } from "@prisma/client";

export class ViewSellerCarListingController {
  private static instance: ViewSellerCarListingController;
  private usedCarListingEntity: UsedCarListingEntity;

  private constructor(usedCarListingEntity: UsedCarListingEntity) {
    this.usedCarListingEntity = usedCarListingEntity;
  }

  public static getInstance(): ViewSellerCarListingController {
    if (!ViewSellerCarListingController.instance) {
      ViewSellerCarListingController.instance =
        new ViewSellerCarListingController(UsedCarListingEntity.getInstance());
    }
    return ViewSellerCarListingController.instance;
  }

  public async viewSellerCarListingController(): Promise<UsedCarListing[]> {
    const result = await this.usedCarListingEntity.viewUsedCarListingEntity();
    return result;
  }
}
