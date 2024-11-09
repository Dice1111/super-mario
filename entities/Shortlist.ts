import { baseUrl } from "@/lib/utils";
import { Shortlist } from "@prisma/client";


export class ShortlistEntity {

  private static instance: ShortlistEntity;
  private shortlists: Shortlist[] = [];
  private shortlistLoaded: boolean = false;

  // Static method to provide access to the single instance of the class
  public static getInstance(): ShortlistEntity {
    if (!ShortlistEntity.instance) {
      ShortlistEntity.instance = new ShortlistEntity();
    }
    return ShortlistEntity.instance;
  }

  public async getShotlist(): Promise<Shortlist[]> {
    if (!this.shortlistLoaded) {
      await this.loadShotlists();
    }
    return this.shortlists;
  }

  public async viewUserAccountsEntity(): Promise<Shortlist[]> {
    const users = await this.getShotlist();
    return users;
  }

  // Load users from the API, and cache the result
  private async loadShotlists(): Promise<void> {
    try {
      const response = await fetch(`${baseUrl}/api/shortlists`, {
        cache: "no-cache",
      });
      if (!response.ok) {
        console.error(`Error: Received status ${response.status}`);
        return;
      }

      const res = await response.json();

      this.shortlists = res.shortlists;

      this.shortlistLoaded = true;
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }

  public async createShortlistEntity(
    car_id: string,
    userEmail: string
  ): Promise<boolean> {
    try {
      const data = {
        car_id,
        userEmail,
      };
      console.log("entity",data);
      const response = await fetch(`${baseUrl}/api/shortlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return false;
      }

      await this.loadShotlists();

      return true;
    } catch (error) {
      console.error("Failed to create user:", error);
      return false;
    }
  }

  public async deleteShortlistEntity(car_id: string): Promise<boolean> {
    try {
      console.log(car_id);
      const response = await fetch(`${baseUrl}/api/shortlists/${car_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Failed to delete listing");
        return false;
      }

      console.log("Listing deleted successfully");
      await this.loadShotlists(); // Refresh cached listings

      return true;
    } catch (error) {
      console.error("Failed to delete used car listing:", error);
      return false;
    }
  }
  


}

