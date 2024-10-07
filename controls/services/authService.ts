import { UserEntity } from '@/entities/User'
import { AuthControl } from '../AuthControl'

// Factory function to create an instance of AuthControl with dependencies injected
export function createAuthControl(): AuthControl {
  const userEntity = UserEntity.getInstance() // Create the UserEntity instance
  return new AuthControl(userEntity) // Inject it into AuthControl
}
