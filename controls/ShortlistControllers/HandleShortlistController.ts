import { ShortlistEntity } from "@/entities/Shortlist";

export class HandleShortlistController {
  private static instance: HandleShortlistController;
  private shortlistEntity: ShortlistEntity;

  private constructor(shortlistEntity: ShortlistEntity) {
    this.shortlistEntity = shortlistEntity;
  }

  public static getInstance(): HandleShortlistController {
    if (!HandleShortlistController.instance) {
      HandleShortlistController.instance = new HandleShortlistController(
        ShortlistEntity.getInstance()
      );
    }
    return HandleShortlistController.instance;
  }

  public async handleShortlistController(car_id: string): Promise<boolean> {
    const success = await this.shortlistEntity.handleShortlistEntity(car_id);
    return success;
  }
}
