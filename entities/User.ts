import { UserAccountFormSchemaType } from "@/components/Forms/UserAccountFormSchema";
import { baseUrl } from "@/lib/utils";
import { Status, User } from "@prisma/client";
import { signIn, signOut } from "next-auth/react";

export class UserEntity {
  // Static property to hold the single instance of the class
  private static instance: UserEntity;
  private users: User[] = [];
  private usersLoaded: boolean = false;

  // Static method to provide access to the single instance of the class
  public static getInstance(): UserEntity {
    if (!UserEntity.instance) {
      UserEntity.instance = new UserEntity();
    }
    return UserEntity.instance;
  }

  public async getUsers(): Promise<User[]> {
    if (!this.usersLoaded) {
      await this.loadUsers();
    }
    return this.users;
  }

  public async viewUserAccountsEntity(): Promise<User[]> {
    const users = await this.getUsers();
    return users;
  }

  public async editUserAccountEntity(
    id: string,
    password: string
  ): Promise<boolean> {
    try {
      const data = {
        id,
        password,
      };
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return false;
      }

      await this.loadUsers();

      return true;
    } catch (error) {
      console.error("Failed to create user:", error);
      return false;
    }
  }

  public async suspendUserAccountEntity(
    id: string,
    status: Status
  ): Promise<boolean> {
    try {
      const data = {
        id,
        status,
      };

      const response = await fetch(`${baseUrl}/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return false;
      }

      await this.loadUsers();

      return true;
    } catch (error) {
      console.error("Failed to create user:", error);
      return false;
    }
  }

  public async searchUserAccountEntity(email: string): Promise<User | null> {
    try {
      const response = await fetch(`${baseUrl}/api/users/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        //console.error("Error fetching user:", response.statusText);
        return null;
      }

      const res = await response.json();

      return res;
    } catch (error) {
      //console.error("Failed to fetch user account:", error);
      return null;
    }
  }

  // Load users from the API, and cache the result
  private async loadUsers(): Promise<void> {
    try {
      const response = await fetch(`${baseUrl}/api/users`, {
        cache: "no-cache",
      });
      if (!response.ok) {
        console.error(`Error: Received status ${response.status}`);
        return;
      }

      const res = await response.json();

      this.users = res.users;

      this.usersLoaded = true;
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }

  public async createUserAccountEntity(
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const data: UserAccountFormSchemaType = {
        email,
        password,
      };
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return false;
      }

      await this.loadUsers();

      return true;
    } catch (error) {
      console.error("Failed to create user:", error);
      return false;
    }
  }

  public logoutAccountEntity = async (): Promise<boolean> => {
    try {
      await signOut({ redirect: false });
    } catch (error) {
      return false;
    }
    return true;
  };

  public async verifyAccount({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> {
    try {
      const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      // Check if the response is not successful (status 200-299)
      if (!response?.ok) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("Failed to authenticate user:", error);
      return false;
    }
  }
}
