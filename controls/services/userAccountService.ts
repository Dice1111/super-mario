import { UserEntity } from "@/entities/User";
import { ViewUserAccountsController } from "../Controllers/UserAccountContollers/ViewUserAccountController";
import { SuspendUserAccountController } from "@/controls/Controllers/UserAccountContollers/SuspendUserAccountController";
import { SearchUserAccountController } from "@/controls/Controllers/UserAccountContollers/SearchUserAccountController";
import { EditUserAccountController } from "@/controls/Controllers/UserAccountContollers/EditUserAccountController";
import { CreateUserAccountControllers } from "@/controls/Controllers/UserAccountContollers/CreateUserAccountController";

export function createViewAccountControl(): ViewUserAccountsController {
  const userEntity = UserEntity.getInstance();
  return new ViewUserAccountsController(userEntity);
}

export function createSuspendAccountControl(): SuspendUserAccountController {
  const userEntity = UserEntity.getInstance();
  return new SuspendUserAccountController(userEntity);
}

export function createSearchAccountControl(): SearchUserAccountController {
  const userEntity = UserEntity.getInstance();
  return new SearchUserAccountController(userEntity);
}
export function createEditAccountControl(): EditUserAccountController {
  const userEntity = UserEntity.getInstance();
  return new EditUserAccountController(userEntity);
}
export function createUserAccountControl(): CreateUserAccountControllers {
  const userEntity = UserEntity.getInstance();
  return new CreateUserAccountControllers(userEntity);
}
