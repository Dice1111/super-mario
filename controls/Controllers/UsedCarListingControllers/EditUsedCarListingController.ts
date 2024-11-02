import { UsedCarListingEntity } from "../../../entities/UsedCarListing";

export class EditUsedCarListingController {
  private static instance: EditUsedCarListingController;
  private usedCarListingEntity: UsedCarListingEntity;

  private constructor(usedCarListingEntity: UsedCarListingEntity) {
    this.usedCarListingEntity = usedCarListingEntity;
  }

  public static getInstance(): EditUsedCarListingController {
    if (!EditUsedCarListingController.instance) {
      EditUsedCarListingController.instance = new EditUsedCarListingController(
        UsedCarListingEntity.getInstance()
      );
    }
    return EditUsedCarListingController.instance;
  }

  public async editUsedCarListingController(
    id: string,
    title: string,
    agentEmail: string,
    sellerEmail: string,
    mileage: number,
    color: string,
    condition: string,
    imgUrl: string,
    manufacturedYear: number,
    price: number,
    description: string
  ): Promise<boolean> {
    const success = await this.usedCarListingEntity.editUsedCarListingEntity(
      id,
      title,
      agentEmail,
      sellerEmail,
      mileage,
      color,
      condition,
      imgUrl,
      manufacturedYear,
      price,
      description
    );
    return success;
  }
}