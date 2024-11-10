import { UsedCarListingEntity } from "@/entities/UsedCarListing";
import { UserProfileEntity } from "@/entities/UserProfile";
import { UsedCarListing, UserProfile } from "@prisma/client";

export class ViewTopUsedCarListingController {
  private static instance: ViewTopUsedCarListingController;
  private usedCarListing: UsedCarListingEntity;

  private constructor(usedCarListing: UsedCarListingEntity) {
    this.usedCarListing = usedCarListing;
  }

  public static getInstance(): ViewTopUsedCarListingController {
    if (!ViewTopUsedCarListingController.instance) {
      ViewTopUsedCarListingController.instance =
        new ViewTopUsedCarListingController(UsedCarListingEntity.getInstance());
    }
    return ViewTopUsedCarListingController.instance;
  }

  public async viewTopUsedCarListingController(): Promise<UsedCarListing[]> {
    const result = await this.usedCarListing.viewTopFourUsedCarListingsByViewCount();
    return result;
  }
}
