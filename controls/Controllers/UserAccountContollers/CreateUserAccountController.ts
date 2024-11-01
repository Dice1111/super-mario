// controllers/CreateUserAccountControllers.ts
import { UserEntity } from "../../../entities/User";

export class CreateUserAccountControllers {
  private static instance: CreateUserAccountControllers;
  private userEntity: UserEntity;

  private constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public static getInstance(): CreateUserAccountControllers {
    if (!CreateUserAccountControllers.instance) {
      CreateUserAccountControllers.instance = new CreateUserAccountControllers(
        UserEntity.getInstance()
      );
    }
    return CreateUserAccountControllers.instance;
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
