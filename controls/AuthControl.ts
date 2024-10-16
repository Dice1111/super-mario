// controllers/AuthControl.ts
import { User, UserProfile } from '@prisma/client'
import { UserEntity } from '../entities/User'

type VerifyAccountReturnType = {
  error: boolean
}

type CreateAccountReturnType = {
  error: boolean
}

export class AuthControl {
  private userEntity: UserEntity

  constructor(userEntity: UserEntity) {
    this.userEntity = userEntity
  }

  public async checkUser() {
    const users: User[] = await this.userEntity.getUsers()

    return users
  }

  public async createUserAccountController(
    user: User,
    profile: UserProfile
  ): Promise<CreateAccountReturnType> {
    const { error } = await this.userEntity.createUserAccountEntity(
      user,
      profile
    )

    return { error }
  }

  public async verifyAccount(
    email: string,
    password: string
  ): Promise<VerifyAccountReturnType> {
    const { error } = await this.userEntity.verifyAccount({
      email,
      password,
    })

    return { error }
  }
}
