import { UserProfileEntity } from "@/entities/UserProfile";
import { Status } from "@prisma/client";

export class SuspendUserProfileController {
  private static instance: SuspendUserProfileController;
  private userProfileEntity: UserProfileEntity;

  private constructor(userProfileEntity: UserProfileEntity) {
    this.userProfileEntity = userProfileEntity;
  }

  public static getInstance(): SuspendUserProfileController {
    if (!SuspendUserProfileController.instance) {
      SuspendUserProfileController.instance = new SuspendUserProfileController(
        UserProfileEntity.getInstance()
      );
    }
    return SuspendUserProfileController.instance;
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
