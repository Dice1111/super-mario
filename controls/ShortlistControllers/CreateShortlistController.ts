import { ShortlistEntity } from "@/entities/Shortlist";

export class CreateShortlistController {
  private static instance: CreateShortlistController;
  private shortlistEntity: ShortlistEntity;

  private constructor(shortlistEntity: ShortlistEntity) {
    this.shortlistEntity = shortlistEntity;
  }

  public static getInstance(): CreateShortlistController {
    if (!CreateShortlistController.instance) {
      CreateShortlistController.instance = new CreateShortlistController(
        ShortlistEntity.getInstance()
      );
    }
    return CreateShortlistController.instance;
  }

  public async createShortlistController(
    car_id:string,
    userEmail:string
  ): Promise<boolean> {
    const success = await this.shortlistEntity.createShortlistEntity(
      car_id,
      userEmail
    );
    return success;
  }
}