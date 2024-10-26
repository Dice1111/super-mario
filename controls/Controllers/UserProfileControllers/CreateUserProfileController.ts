import { UserProfileEntity } from "@/entities/UserProfile";
import { UserProfile } from "@prisma/client";

export class CreateUserProfileController {
  private userProfileEntity: UserProfileEntity;

  constructor(userProfileEntity: UserProfileEntity) {
    this.userProfileEntity = userProfileEntity;
  }

  public async createUserProfileController(
    userProfile: UserProfile
  ): Promise<boolean> {
    const success = await this.userProfileEntity.createUserProfileEntity(
      userProfile
    );

    return success;
  }
}
