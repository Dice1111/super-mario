import { ShortlistEntity } from "@/entities/Shortlist";
import { UsedCarListing } from "@prisma/client";

export class SearchBuyerShortlistController {
  private static instance: SearchBuyerShortlistController;
  private shortlistEntity: ShortlistEntity;

  private constructor(shortlistEntity: ShortlistEntity) {
    this.shortlistEntity = shortlistEntity;
  }

  public static getInstance(): SearchBuyerShortlistController {
    if (!SearchBuyerShortlistController.instance) {
      SearchBuyerShortlistController.instance =
        new SearchBuyerShortlistController(ShortlistEntity.getInstance());
    }
    return SearchBuyerShortlistController.instance;
  }

  public async searchBuyerShortlistController(
    title: string
  ): Promise<UsedCarListing[] | null> {
    const success = await this.shortlistEntity.searchBuyerShortlistEntity(
      title
    );
    return success;
  }
}
