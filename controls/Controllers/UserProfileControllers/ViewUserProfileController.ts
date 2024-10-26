import { UserProfileEntity } from "@/entities/UserProfile";
import { UserProfile } from "@prisma/client";

export class ViewUserProfileController {
  private userProfileEntity: UserProfileEntity;

  constructor(userProfileEntity: UserProfileEntity) {
    this.userProfileEntity = userProfileEntity;
  }

  public async viewUserProfileController(): Promise<UserProfile[]> {
    const users = await this.userProfileEntity.viewUserProfileEntity();
    return users;
  }
}
