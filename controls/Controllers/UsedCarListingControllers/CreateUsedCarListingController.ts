import { UsedCarListingEntity } from "../../../entities/UsedCarListing";

export class CreateUsedCarListingController {
  private static instance: CreateUsedCarListingController;
  private usedCarListingEntity: UsedCarListingEntity;

  private constructor(usedCarListingEntity: UsedCarListingEntity) {
    this.usedCarListingEntity = usedCarListingEntity;
  }

  public static getInstance(): CreateUsedCarListingController {
    if (!CreateUsedCarListingController.instance) {
      CreateUsedCarListingController.instance = new CreateUsedCarListingController(
        UsedCarListingEntity.getInstance()
      );
    }
    return CreateUsedCarListingController.instance;
  }

  public async createUsedCarListingController(
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
    const success = await this.usedCarListingEntity.createUsedCarListingEntity(
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