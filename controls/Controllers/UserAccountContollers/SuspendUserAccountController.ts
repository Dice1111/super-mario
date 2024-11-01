import { UserEntity } from "@/entities/User";
import { Status } from "@prisma/client";

export class SuspendUserAccountController {
  private static instance: SuspendUserAccountController;
  private userEntity: UserEntity;

  private constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public static getInstance(): SuspendUserAccountController {
    if (!SuspendUserAccountController.instance) {
      SuspendUserAccountController.instance = new SuspendUserAccountController(
        UserEntity.getInstance()
      );
    }
    return SuspendUserAccountController.instance;
  }

  public async suspendUserAccountController(
    id: string,
    status: Status
  ): Promise<boolean> {
    const users = await this.userEntity.suspendUserAccountEntity(id, status);
    return users;
  }
}
