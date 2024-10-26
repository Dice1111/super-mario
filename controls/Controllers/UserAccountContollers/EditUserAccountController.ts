import { UserEntity } from "@/entities/User";

export class EditUserAccountController {
  private userEntity: UserEntity;

  constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public async editUserAccountController(
    id: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const users = await this.userEntity.editUserAccountEntity(
      id,
      email,
      password
    );
    return users;
  }
}
