import { AuthControl } from "@/controls/Controllers/AuthenticationControllers/AuthControl";
import { UserEntity } from "@/entities/User";

export function createAuthControl(): AuthControl {
  const userEntity = UserEntity.getInstance();
  return new AuthControl(userEntity);
}
