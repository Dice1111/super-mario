// controllers/CreateUserAccountController.ts
import { UserEntity } from "../../entities/User";

export class CreateUserAccountController {
  private static instance: CreateUserAccountController;
  private userEntity: UserEntity;

  private constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public static getInstance(): CreateUserAccountController {
    if (!CreateUserAccountController.instance) {
      CreateUserAccountController.instance = new CreateUserAccountController(
        UserEntity.getInstance()
      );
    }
    return CreateUserAccountController.instance;
  }

  public async createUserAccountController(
    email: string,
    password: string
  ): Promise<boolean> {
    const success = await this.userEntity.createUserAccountEntity(
      email,
      password
    );
    return success;
  }
}
