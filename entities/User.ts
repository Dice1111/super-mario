import { baseUrl } from '@/lib/utils'
import { User, UserProfile } from '@prisma/client'

export class UserEntity {
  // Static property to hold the single instance of the class
  private static instance: UserEntity
  public users: User[] = []

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

  private async loadUsers(): Promise<void> {
    try {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const users: User[] = await response.json()
      this.users = users
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  public async createUser(
    user: User,
    profile: UserProfile
  ): Promise<{
    error: boolean
    message: string
  }> {
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
        const result = await response.json()
        return {
          error: true,
          message: result.error || 'Failed to create user.',
        }
      }

      const newUser = await response.json()
      this.users.push(newUser)

      return {
        error: false,
        message: 'Successfully created new user',
      }
    } catch (error) {
      return {
        error: true,
        message: 'Unknown error occurred during login',
      }
    }
  }

  public async authenticateUser({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<{
    error: boolean
    message: string
  }> {
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
        const result = await response.json()
        return {
          error: true,
          message: result.error || 'Failed to authenticate user',
        }
      }

      // If successful, parse the response
      const result = await response.json()

      return {
        error: false,
        message: result.success || 'Successfully logged in',
      }
    } catch (error) {
      return {
        error: true,
        message: 'Unknown error occurred during login',
      }
    }
  }
}
