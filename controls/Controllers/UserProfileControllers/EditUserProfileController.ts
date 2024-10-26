import { UserProfileEntity } from "@/entities/UserProfile";
import { Role } from "@prisma/client";

export class EditUserProfileController {
  private userProfileEntity: UserProfileEntity;

  constructor(userProfileEntity: UserProfileEntity) {
    this.userProfileEntity = userProfileEntity;
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
