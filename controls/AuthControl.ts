// controllers/AuthControl.ts
import { User, UserProfile } from '@prisma/client'
import { UserEntity } from '../entities/User'

export class AuthControl {
  private userEntity: UserEntity

  constructor(userEntity: UserEntity) {
    this.userEntity = userEntity
  }

  public async checkUser() {
    console.log(this.userEntity.users)
  }

  public async CreateUser(
    user: User,
    profile: UserProfile
  ): Promise<{
    error: boolean
    message: string
  }> {
    const { error, message } = await this.userEntity.createUser(user, profile)

    return { error, message }
  }

  public async AuthenticateUser(
    email: string,
    password: string
  ): Promise<{
    error: boolean
    message: string
  }> {
    const { error, message } = await this.userEntity.authenticateUser({
      email,
      password,
    })

    return { error, message }
  }
}
