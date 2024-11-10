import { UsedCarListing } from "@prisma/client";
import { UsedCarListingEntity } from "../../entities/UsedCarListing";

export class SearchAgentSpecificUsedCarListingController {
  private static instance: SearchAgentSpecificUsedCarListingController;
  private usedCarListingEntity: UsedCarListingEntity;

  private constructor(usedCarListingEntity: UsedCarListingEntity) {
    this.usedCarListingEntity = usedCarListingEntity;
  }

  public static getInstance(): SearchAgentSpecificUsedCarListingController {
    if (!SearchAgentSpecificUsedCarListingController.instance) {
      SearchAgentSpecificUsedCarListingController.instance =
        new SearchAgentSpecificUsedCarListingController(
          UsedCarListingEntity.getInstance()
        );
    }
    return SearchAgentSpecificUsedCarListingController.instance;
  }

  public async searchAgentSpecificUsedCarListingController(
    email: string,
    title: string
  ): Promise<UsedCarListing[] | null> {
    const result =
      await this.usedCarListingEntity.searchAgentSpecificUsedCarListingEntity(
        email,
        title
      );
    return result;
  }
}
