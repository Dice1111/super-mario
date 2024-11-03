import { UsedCarListing } from "@prisma/client";
import { UsedCarListingEntity } from "../../entities/UsedCarListing";

export class ViewUsedCarListingController {
  private static instance: ViewUsedCarListingController;
  private usedCarListingEntity: UsedCarListingEntity;

  private constructor(usedCarListingEntity: UsedCarListingEntity) {
    this.usedCarListingEntity = usedCarListingEntity;
  }

  public static getInstance(): ViewUsedCarListingController {
    if (!ViewUsedCarListingController.instance) {
      ViewUsedCarListingController.instance = new ViewUsedCarListingController(
        UsedCarListingEntity.getInstance()
      );
    }
    return ViewUsedCarListingController.instance;
  }

  public async viewUsedCarListingController(): Promise<UsedCarListing[]> {
    const result = await this.usedCarListingEntity.viewUsedCarListingEntity();
    return result;
  }
}
