import { baseUrl } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";

export class ShortlistEntity {
  private static instance: ShortlistEntity;
  private shortlists: UsedCarListing[] = [];
  private sessionEmail: string = "";
  private shortlistLoaded: boolean = false;

  // Static method to provide access to the single instance of the class
  public static getInstance(): ShortlistEntity {
    if (!ShortlistEntity.instance) {
      ShortlistEntity.instance = new ShortlistEntity();
    }
    return ShortlistEntity.instance;
  }

  public async getShortlist(): Promise<UsedCarListing[]> {
    if (!this.shortlistLoaded && this.sessionEmail) {
      await this.loadShotlists();
    }
    return this.shortlists;
  }

  // Load users from the API, and cache the result
  private async loadShotlists(): Promise<void> {
    try {
      // Fetch shortlist and car listings for the specified email
      const response = await fetch(
        `${baseUrl}/api/shortlists/${this.sessionEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch shortlist entries");
        return;
      }

      // Parse the response JSON to get the car listings
      const data = await response.json();
      this.shortlists = data.usedCarListings;
      this.shortlistLoaded = true;
    } catch (error) {
      console.error("Failed to fetch used car listings:", error);
    }
  }

  public async viewBuyerSpecificShortlistEntity(
    email: string
  ): Promise<UsedCarListing[]> {
    this.sessionEmail = email;
    const shortlistsCar = await this.getShortlist();
    return shortlistsCar;
  }

  public async searchBuyerShortlistEntity(
    email: string,
    title: string
  ): Promise<UsedCarListing[] | null> {
    this.sessionEmail = email;
    const shortlistsCar = await this.getShortlist();
    const searchTerm = title.toLowerCase();
    const result = shortlistsCar.filter((car) =>
      car.title.toLowerCase().includes(searchTerm)
    );
    return result.length > 0 ? result : null;
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
      const response = await fetch(`${baseUrl}/api/shortlists/${car_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return false;
      }

      await this.loadShotlists(); // Refresh cached listings

      return true;
    } catch (error) {
      console.error("Failed to delete used car listing:", error);
      return false;
    }
  }
}
