// controllers/AuthControl.ts
import { UserEntity } from "../../entities/User";

export class AuthControl {
  private static instance: AuthControl;
  private userEntity: UserEntity;

  private constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public static getInstance(): AuthControl {
    if (!AuthControl.instance) {
      AuthControl.instance = new AuthControl(UserEntity.getInstance());
    }
    return AuthControl.instance;
  }

  public async logoutAccountController(): Promise<boolean> {
    const success = await this.userEntity.logoutAccountEntity();
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
