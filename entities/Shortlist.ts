import { baseUrl } from "@/lib/utils";
import { UsedCarListing, Shortlist } from "@prisma/client";

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

  public async getShortlist(): Promise<Shortlist[]> {
    if (!this.shortlistLoaded) {
      await this.loadShotlists();
    }
    return this.shortlists;
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

  public async viewBuyerSpecificShortlistEntity(
    email: string
  ): Promise<UsedCarListing[]> {
    try {
      // Fetch shortlist and car listings for the specified email
      const response = await fetch(`${baseUrl}/api/shortlists/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch shortlist entries");
        return [];
      }

      // Parse the response JSON to get the car listings
      const data = await response.json();
      const usedCarListings: UsedCarListing[] = data.usedCarListings;

      // Optionally, cache the car listings here if needed
      return usedCarListings;
    } catch (error) {
      console.error("Failed to fetch used car listings:", error);
      return [];
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
      console.log("entity", data);
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
