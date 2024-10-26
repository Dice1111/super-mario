// controllers/CreateUserAccountControllers.ts
import { User } from "@prisma/client";
import { UserEntity } from "../../../entities/User";

export class CreateUserAccountControllers {
  private userEntity: UserEntity;

  constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public async createUserAccountController(user: User): Promise<boolean> {
    const success = await this.userEntity.createUserAccountEntity(user);

    return success;
  }
}
