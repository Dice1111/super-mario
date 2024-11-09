import { UsedCarListingEntity } from "@/entities/UsedCarListing";



export class AddNumberOfViewController {
  private static instance: AddNumberOfViewController;
  private usedCarListingEntity: UsedCarListingEntity;

  private constructor(usedCarListingEntity: UsedCarListingEntity) {
    this.usedCarListingEntity = usedCarListingEntity;
  }

  public static getInstance(): AddNumberOfViewController {
    if (!AddNumberOfViewController.instance) {
      AddNumberOfViewController.instance = new AddNumberOfViewController(
        UsedCarListingEntity.getInstance()
      );
    }
    return AddNumberOfViewController.instance;
  }

  public async addNumberOfViewController(
    id: string,
  ): Promise<boolean> {
    const users = await this.usedCarListingEntity.addNumberOfViewEntity(
      id
    );
    return users;
  }
}
