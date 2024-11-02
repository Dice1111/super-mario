import { UserEntity } from "@/entities/User";
import { User } from "@prisma/client";

export class ViewUserAccountsController {
  private static instance: ViewUserAccountsController;
  private userEntity: UserEntity;

  private constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public static getInstance(): ViewUserAccountsController {
    if (!ViewUserAccountsController.instance) {
      ViewUserAccountsController.instance = new ViewUserAccountsController(
        UserEntity.getInstance()
      );
    }
    return ViewUserAccountsController.instance;
  }

  public async viewUserAccountsController(): Promise<User[]> {
    const users = await this.userEntity.viewUserAccountsEntity();
    return users;
  }
}
