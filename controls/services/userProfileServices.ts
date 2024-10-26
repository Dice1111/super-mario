import { CreateUserProfileController } from "@/controls/Controllers/UserProfileControllers/CreateUserProfileController";
import { EditUserProfileController } from "@/controls/Controllers/UserProfileControllers/EditUserProfileController";
import { SearchUserProfileController } from "@/controls/Controllers/UserProfileControllers/SearchUserProfileController";
import { SuspendUserProfileController } from "@/controls/Controllers/UserProfileControllers/SuspendUserProfileController";
import { ViewUserProfileController } from "@/controls/Controllers/UserProfileControllers/ViewUserProfileController";
import { UserProfileEntity } from "@/entities/UserProfile";

export function createSearchProfileControl(): SearchUserProfileController {
  const userProfileEntity = UserProfileEntity.getInstance();
  return new SearchUserProfileController(userProfileEntity);
}

export function createUserProfileControl(): CreateUserProfileController {
  const userProfileEntity = UserProfileEntity.getInstance();
  return new CreateUserProfileController(userProfileEntity);
}

export function createEditProfileControl(): EditUserProfileController {
  const userProfileEntity = UserProfileEntity.getInstance();
  return new EditUserProfileController(userProfileEntity);
}

export function createViewProfileControl(): ViewUserProfileController {
  const userProfileEntity = UserProfileEntity.getInstance();
  return new ViewUserProfileController(userProfileEntity);
}

export function createSuspendProfileControl(): SuspendUserProfileController {
  const userProfileEntity = UserProfileEntity.getInstance();
  return new SuspendUserProfileController(userProfileEntity);
}
