import { UserEntity } from "@/entities/User";

export class EditUserAccountController {
  private static instance: EditUserAccountController;
  private userEntity: UserEntity;

  private constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public static getInstance(): EditUserAccountController {
    if (!EditUserAccountController.instance) {
      EditUserAccountController.instance = new EditUserAccountController(
        UserEntity.getInstance()
      );
    }
    return EditUserAccountController.instance;
  }

  public async editUserAccountController(
    id: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const success = await this.userEntity.editUserAccountEntity(
      id,
      email,
      password
    );
    return success;
  }
}
