import { UserProfileEntity } from "@/entities/UserProfile";
import { Role } from "@prisma/client";

export class CreateUserProfileController {
  private static instance: CreateUserProfileController;
  private userProfileEntity: UserProfileEntity;

  private constructor(userProfileEntity: UserProfileEntity) {
    this.userProfileEntity = userProfileEntity;
  }

  public static getInstance(): CreateUserProfileController {
    if (!CreateUserProfileController.instance) {
      CreateUserProfileController.instance = new CreateUserProfileController(
        UserProfileEntity.getInstance()
      );
    }
    return CreateUserProfileController.instance;
  }

  public async createUserProfileController(
    name: string,
    userEmail: string,
    role: Role,
    address: string,
    mobileNumber: string
  ): Promise<boolean> {
    const success = await this.userProfileEntity.createUserProfileEntity(
      name,
      userEmail,
      role,
      address,
      mobileNumber
    );
    return success;
  }
}
