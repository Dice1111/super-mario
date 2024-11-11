import { ShortlistEntity } from "@/entities/Shortlist";
import { UsedCarListing } from "@prisma/client";

export class SearchBuyerShortlistUI {
  private static instance: SearchBuyerShortlistUI;
  private shortlistEntity: ShortlistEntity;

  private constructor(shortlistEntity: ShortlistEntity) {
    this.shortlistEntity = shortlistEntity;
  }

  public static getInstance(): SearchBuyerShortlistUI {
    if (!SearchBuyerShortlistUI.instance) {
      SearchBuyerShortlistUI.instance = new SearchBuyerShortlistUI(
        ShortlistEntity.getInstance()
      );
    }
    return SearchBuyerShortlistUI.instance;
  }

  public async searchBuyerShortlistUI(
    email: string,
    title: string
  ): Promise<UsedCarListing[] | null> {
    const success = await this.shortlistEntity.searchBuyerShortlistEntity(
      email,
      title
    );
    return success;
  }
}
