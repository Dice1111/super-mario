import { UserProfileEntity } from "@/entities/UserProfile";
import { UserProfile } from "@prisma/client";

export class ViewUserProfileController {
  private static instance: ViewUserProfileController;
  private userProfileEntity: UserProfileEntity;

  // Private constructor to prevent direct instantiation
  private constructor(userProfileEntity: UserProfileEntity) {
    this.userProfileEntity = userProfileEntity;
  }

  // Static method to get the singleton instance
  public static getInstance(): ViewUserProfileController {
    if (!ViewUserProfileController.instance) {
      // Initialize the UserProfileEntity instance only once
      ViewUserProfileController.instance = new ViewUserProfileController(
        UserProfileEntity.getInstance()
      );
    }
    return ViewUserProfileController.instance;
  }

  public async viewUserProfileController(): Promise<UserProfile[]> {
    const userProfiles = await this.userProfileEntity.viewUserProfileEntity();
    return userProfiles;
  }
}
