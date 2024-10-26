import { UserProfileEntity } from "@/entities/UserProfile";
import { UserProfile } from "@prisma/client";

export class SearchUserProfileController {
  [x: string]: any;
  private userProfileEntity: UserProfileEntity;

  constructor(userProfileEntity: UserProfileEntity) {
    this.userProfileEntity = userProfileEntity;
  }

  public async searchUserProfileController(
    email: string
  ): Promise<UserProfile | null> {
    const users = await this.userProfileEntity.searchUserProfileEntity(email);
    return users;
  }
}
