import { UserEntity } from "@/entities/User";
import { Status } from "@prisma/client";

export class SuspendUserAccountController {
  private userEntity: UserEntity;

  constructor(userEntity: UserEntity) {
    this.userEntity = userEntity;
  }

  public async suspendUserAccountController(
    id: string,
    status: Status
  ): Promise<boolean> {
    const users = await this.userEntity.suspendUserAccountEntity(id, status);
    return users;
  }
}
