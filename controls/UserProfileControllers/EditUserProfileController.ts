import { UserProfileEntity } from "@/entities/UserProfile";
import { Role } from "@prisma/client";

export class EditUserProfileController {
  private static instance: EditUserProfileController;
  private userProfileEntity: UserProfileEntity;

  private constructor(userProfileEntity: UserProfileEntity) {
    this.userProfileEntity = userProfileEntity;
  }

  public static getInstance(): EditUserProfileController {
    if (!EditUserProfileController.instance) {
      EditUserProfileController.instance = new EditUserProfileController(
        UserProfileEntity.getInstance()
      );
    }
    return EditUserProfileController.instance;
  }

  public async editUserProfileController(
    id: string,
    name: string,
    role: Role,
    address: string | null,
    mobileNumber: string | null
  ): Promise<boolean> {
    const users = await this.userProfileEntity.editUserProfileEntity(
      id,
      name,
      role,
      address,
      mobileNumber
    );
    return users;
  }
}
