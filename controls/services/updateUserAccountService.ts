import { UserEntity } from "@/entities/User";
import { UpdateUserAccountController } from "../UpdateUserAccountController";

// Factory function to create an instance of AuthControl with dependencies injected
export function createUpdateAccountControl(): UpdateUserAccountController {
  const userEntity = UserEntity.getInstance(); // Create the UserEntity instance
  return new UpdateUserAccountController(userEntity); // Inject it into AuthControl
}
