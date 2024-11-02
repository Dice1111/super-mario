import { UsedCarListingEntity } from "../../../entities/UsedCarListing";

export class DeleteUsedCarListingController {
  private static instance: DeleteUsedCarListingController;
  private usedCarListingEntity: UsedCarListingEntity;

  private constructor(usedCarListingEntity: UsedCarListingEntity) {
    this.usedCarListingEntity = usedCarListingEntity;
  }

  public static getInstance(): DeleteUsedCarListingController {
    if (!DeleteUsedCarListingController.instance) {
      DeleteUsedCarListingController.instance = new DeleteUsedCarListingController(
        UsedCarListingEntity.getInstance()
      );
    }
    return DeleteUsedCarListingController.instance;
  }

  public async deleteUsedCarListingController(id: string): Promise<boolean> {
    const success = await this.usedCarListingEntity.deleteUsedCarListingEntity(
      id
    );
    return success;
  }
}