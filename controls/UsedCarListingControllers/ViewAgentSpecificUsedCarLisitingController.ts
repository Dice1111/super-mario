import { UsedCarListing } from "@prisma/client";
import { UsedCarListingEntity } from "../../entities/UsedCarListing";

export class ViewAgentSpecifcUsedCarListingController {
  private static instance: ViewAgentSpecifcUsedCarListingController;
  private usedCarListingEntity: UsedCarListingEntity;

  private constructor(usedCarListingEntity: UsedCarListingEntity) {
    this.usedCarListingEntity = usedCarListingEntity;
  }

  public static getInstance(): ViewAgentSpecifcUsedCarListingController {
    if (!ViewAgentSpecifcUsedCarListingController.instance) {
      ViewAgentSpecifcUsedCarListingController.instance = new ViewAgentSpecifcUsedCarListingController(
        UsedCarListingEntity.getInstance()
      );
    }
    return ViewAgentSpecifcUsedCarListingController.instance;
  }

  public async viewAgentSpecifcUsedCarListingController(email: string): Promise<UsedCarListing[]> {
    console.log("email: ", email);
    const result = await this.usedCarListingEntity.viewUsedCarListingForAgentEntity(email);
    return result;
  }
}
