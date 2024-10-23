import { UserEntity } from '@/entities/User'
import { User } from '@prisma/client'

export class ViewUserAccountsController {
  private userEntity: UserEntity

  constructor(userEntity: UserEntity) {
    this.userEntity = userEntity
  }

  public async viewUserAccountsController(): Promise<User[]> {
    const users = await this.userEntity.viewUserAccountsEntity()
    return users
  }
}
