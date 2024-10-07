// controllers/AuthControl.ts
import { UserEntity } from '../entities/User'
import { baseUrl } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'

export class AuthControl {
  private userEntity: UserEntity

  constructor(userEntity: UserEntity) {
    this.userEntity = userEntity
  }

  public async checkUser() {
    const user = await currentUser()

    // If the user is not logged in, return null
    if (!user) {
      return null
    }

    // Check if the user is already in the database
    const existingUserByClerkID = await this.userEntity.findUserById(user.id)

    // If the user is in the database, return the user
    if (existingUserByClerkID) {
      return existingUserByClerkID
    }

    // Check if the user with the same email is in the database
    const email = user.primaryEmailAddress?.emailAddress || ''
    const existingUserByEmail = await this.userEntity.findUserByEmail(email)

    if (existingUserByEmail) {
      return existingUserByEmail
    }

    // If the user is not in the database, create the user
    try {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkUserId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: `${user.firstName} ${user.lastName}`,
          imageUrl: user.imageUrl,
        }),
      })

      const newUser = await response.json()
      return newUser
    } catch (error) {
      console.error('Failed to create user:', error)
      return null
    }
  }
}
