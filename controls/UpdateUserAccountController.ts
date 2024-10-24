import { UserEntity } from "@/entities/User";

export class UpdateUserAccountController {
  private userEntity: UserEntity;

  constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public async updateUserAccountController(
    id: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const users = await this.userEntity.updateUserAccountEntity(
      id,
      email,
      password
    );
    return users;
  }
}
