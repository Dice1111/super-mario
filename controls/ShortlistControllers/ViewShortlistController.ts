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

  public async viewShortlistController(email: string): Promise<UsedCarListing[]> {
    const result = await this.shortlistEntity.viewBuyerSpecificShortlistEntity(email);
    return result;
  }
}
