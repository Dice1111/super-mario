import { UserProfileEntity } from "@/entities/UserProfile";
import { UserProfile } from "@prisma/client";

export class ViewUsedCarAgentProfileController {
  private static instance: ViewUsedCarAgentProfileController;
  private userProfileEntity: UserProfileEntity;

  private constructor(userProfileEntity: UserProfileEntity) {
    this.userProfileEntity = userProfileEntity;
  }

  public static getInstance(): ViewUsedCarAgentProfileController {
    if (!ViewUsedCarAgentProfileController.instance) {
      ViewUsedCarAgentProfileController.instance =
        new ViewUsedCarAgentProfileController(UserProfileEntity.getInstance());
    }
    return ViewUsedCarAgentProfileController.instance;
  }

  public async viewUsedCarAgentProfileController(): Promise<UserProfile[]> {
    const result = await this.userProfileEntity.viewUsedCarAgentProfileEntity();
    return result;
  }
}
