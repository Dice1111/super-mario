import { SearchUserAccountController } from "@/controls/Controllers/UserAccountContollers/SearchUserAccountController";
import { UserEntity } from "@/entities/User";

export function createSearchAccountControl(): SearchUserAccountController {
  const userEntity = UserEntity.getInstance();
  return new SearchUserAccountController(userEntity);
}
