import { ShortlistEntity } from "@/entities/Shortlist";
import { Shortlist, UsedCarListing } from "@prisma/client";

export class ViewShortlistController {
  private static instance: ViewShortlistController;
  private shortlistEntity: ShortlistEntity;

  private constructor(shortlistEntity: ShortlistEntity) {
    this.shortlistEntity = shortlistEntity;
  }

  public static getInstance(): ViewShortlistController {
    if (!ViewShortlistController.instance) {
      ViewShortlistController.instance = new ViewShortlistController(
        ShortlistEntity.getInstance()
      );
    }
    return ViewShortlistController.instance;
  }

  public async viewShortlistController(): Promise<UsedCarListing[]> {
    const result =
      await this.shortlistEntity.viewBuyerSpecificShortlistEntity();
    return result;
  }

  public async checkCarInShortListController(car_id: string): Promise<boolean> {
    const result = await this.shortlistEntity.checkCarInShortListEntity(car_id);
    return result;
  }
}
