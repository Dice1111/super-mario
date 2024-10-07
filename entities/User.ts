import { baseUrl } from '@/lib/utils'
import { User } from '@prisma/client'

export class UserEntity {
  // Static property to hold the single instance of the class
  private static instance: UserEntity
  private users: User[] = []

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

  // Fetch users asynchronously and store them in the users array
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

  // Asynchronous method to get users, ensuring they are loaded first
  public async getUsers(): Promise<User[]> {
    if (this.users.length === 0) {
      await this.loadUsers()
    }
    return this.users
  }

  // Asynchronous method to find a user by email
  public async findUserByEmail(email: string): Promise<User | undefined> {
    if (this.users.length === 0) {
      await this.loadUsers()
    }
    return this.users.find((user) => user.email === email)
  }

  // Asynchronous method to find a user by ID
  public async findUserById(id: string): Promise<User | undefined> {
    if (this.users.length === 0) {
      await this.loadUsers()
    }
    return this.users.find((user) => user.clerkUserId === id)
  }
}
