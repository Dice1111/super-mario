import { UserProfileEntity } from "@/entities/UserProfile";
import { UserProfile } from "@prisma/client";

export class SearchUserProfileController {
  private static instance: SearchUserProfileController;
  private userProfileEntity: UserProfileEntity;

  private constructor(userProfileEntity: UserProfileEntity) {
    this.userProfileEntity = userProfileEntity;
  }
  public static getInstance(): SearchUserProfileController {
    if (!SearchUserProfileController.instance) {
      SearchUserProfileController.instance = new SearchUserProfileController(
        UserProfileEntity.getInstance()
      );
    }
    return SearchUserProfileController.instance;
  }

  public async searchUserProfileController(
    email: string
  ): Promise<UserProfile | null> {
    const users = await this.userProfileEntity.searchUserProfileEntity(email);
    return users;
  }
}
