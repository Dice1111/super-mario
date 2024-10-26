// controllers/AuthControl.ts
import { User } from "@prisma/client";
import { UserEntity } from "../../../entities/User";

export class AuthControl {
  private userEntity: UserEntity;

  constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public async checkUser() {
    const users: User[] = await this.userEntity.getUsers();

    return users;
  }

  public async createUserAccountController(user: User): Promise<boolean> {
    const success = await this.userEntity.createUserAccountEntity(user);

    return success;
  }

  public async verifyAccount(
    email: string,
    password: string
  ): Promise<boolean> {
    const success = await this.userEntity.verifyAccount({
      email,
      password,
    });

    return success;
  }
}
