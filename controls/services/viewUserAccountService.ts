import { UserEntity } from "@/entities/User";
import { ViewUserAccountsController } from "../ViewUserAccountsController";

// Factory function to create an instance of AuthControl with dependencies injected
export function createViewAccountControl(): ViewUserAccountsController {
  const userEntity = UserEntity.getInstance(); // Create the UserEntity instance
  return new ViewUserAccountsController(userEntity); // Inject it into AuthControl
}
