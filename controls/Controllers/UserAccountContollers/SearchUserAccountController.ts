import { UserEntity } from "@/entities/User";
import { User } from "@prisma/client";

export class SearchUserAccountController {
  private userEntity: UserEntity;

  constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public async SearchUserAccountController(
    email: string
  ): Promise<User | null> {
    const users = await this.userEntity.searchUserAccountEntity(email);
    return users;
  }
}
