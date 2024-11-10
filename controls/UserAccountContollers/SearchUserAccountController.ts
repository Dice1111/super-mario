import { UserEntity } from "@/entities/User";
import { User } from "@prisma/client";

export class SearchUserAccountController {
  private userEntity: UserEntity;
  private static instance: SearchUserAccountController;

  private constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public static getInstance(): SearchUserAccountController {
    if (!SearchUserAccountController.instance) {
      SearchUserAccountController.instance = new SearchUserAccountController(
        UserEntity.getInstance()
      );
    }
    return SearchUserAccountController.instance;
  }

  public async searchUserAccountController(
    email: string
  ): Promise<User | null> {
    const users = await this.userEntity.searchUserAccountEntity(email);
    return users;
  }
}
