import { baseUrl } from '@/lib/utils'
import { User, UserProfile } from '@prisma/client'

type VerifyAccountReturnType = {
  error: boolean
}

type CreateAccountReturnType = {
  error: boolean
}

export class UserEntity {
  // Static property to hold the single instance of the class
  private static instance: UserEntity
  private users: User[] = []
  private usersLoaded: boolean = false

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.loadUsers()
  }

  // Static method to provide access to the single instance of the class
  public static getInstance(): UserEntity {
    if (!UserEntity.instance) {
      UserEntity.instance = new UserEntity()
    }
    return UserEntity.instance
  }

  public async getUsers(): Promise<User[]> {
    if (!this.usersLoaded) {
      await this.loadUsers()
    }

    return this.users
  }

  // Load users from the API, and cache the result
  private async loadUsers(): Promise<void> {
    try {
      const response = await fetch(`${baseUrl}/api/users`)

      if (!response.ok) {
        console.error(`Error: Received status ${response.status}`)
        return
      }

      const res = await response.json()

      this.users = res
      this.usersLoaded = true
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  public async createUserAccountEntity(
    user: User,
    profile: UserProfile
  ): Promise<CreateAccountReturnType> {
    try {
      const data = {
        ...user,
        ...profile,
      }
      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        return {
          error: true,
        }
      }

      this.loadUsers()

      return {
        error: false,
      }
    } catch (error) {
      console.error('Failed to create user:', error)
      return {
        error: true,
      }
    }
  }

  public async verifyAccount({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<VerifyAccountReturnType> {
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      // Check if the response is not successful (status 200-299)
      if (!response.ok) {
        return {
          error: true,
        }
      }

      return {
        error: false,
      }
    } catch (error) {
      console.error('Failed to authenticate user:', error)
      return {
        error: true,
      }
    }
  }
}
