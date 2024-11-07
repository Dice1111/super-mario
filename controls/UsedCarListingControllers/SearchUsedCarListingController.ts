import { UsedCarListing } from "@prisma/client";
import { UsedCarListingEntity } from "../../entities/UsedCarListing";

export class SearchUsedCarListingController {
  private static instance: SearchUsedCarListingController;
  private usedCarListingEntity: UsedCarListingEntity;

  private constructor(usedCarListingEntity: UsedCarListingEntity) {
    this.usedCarListingEntity = usedCarListingEntity;
  }

  public static getInstance(): SearchUsedCarListingController {
    if (!SearchUsedCarListingController.instance) {
      SearchUsedCarListingController.instance =
        new SearchUsedCarListingController(UsedCarListingEntity.getInstance());
    }
    return SearchUsedCarListingController.instance;
  }

  public async searchUsedCarListingController(
    title: string
  ): Promise<UsedCarListing[] | null> {
    const result = await this.usedCarListingEntity.searchUsedCarListingEntity(
      title
    );
    return result;
  }
}
