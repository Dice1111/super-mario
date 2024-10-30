import { UserProfileEntity } from "@/entities/UserProfile";
import { Status } from "@prisma/client";

export class SuspendUserProfileController {
  private userProfileEntity: UserProfileEntity;

  constructor(userProfileEntity: UserProfileEntity) {
    this.userProfileEntity = userProfileEntity;
  }

  public async suspendUserProfileController(
    id: string,
    status: Status
  ): Promise<boolean> {
    const users = await this.userProfileEntity.suspendUserProfileEntity(
      id,
      status
    );
    return users;
  }
}
