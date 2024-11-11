import { baseUrl } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";

export class ShortlistEntity {
  private static instance: ShortlistEntity;
  private shortlists: UsedCarListing[] = [];
  private shortlistLoaded: boolean = false;

  // Static method to provide access to the single instance of the class
  public static getInstance(): ShortlistEntity {
    if (!ShortlistEntity.instance) {
      ShortlistEntity.instance = new ShortlistEntity();
    }
    return ShortlistEntity.instance;
  }

  public async getShortlist(): Promise<UsedCarListing[]> {
    if (!this.shortlistLoaded) {
      await this.loadShotlists();
    }
    return this.shortlists;
  }

  // Load users from the API, and cache the result
  private async loadShotlists(): Promise<void> {
    try {
      // Fetch shortlist and car listings for the specified email
      const response = await fetch(`${baseUrl}/api/shortlists`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch shortlist entries");
        return;
      }

      const data = await response.json();
      this.shortlists = data.shortlists;
      this.shortlistLoaded = true;
    } catch (error) {
      console.error("Failed to fetch used car listings:", error);
    }
  }

  public async viewBuyerSpecificShortlistEntity(): Promise<UsedCarListing[]> {
    const shortlistsCar = await this.getShortlist();
    return shortlistsCar;
  }

  public async searchBuyerShortlistEntity(
    title: string
  ): Promise<UsedCarListing[] | null> {
    const shortlistsCar = await this.getShortlist();
    const searchTerm = title.toLowerCase();
    const result = shortlistsCar.filter((car) =>
      car.title.toLowerCase().includes(searchTerm)
    );
    return result.length > 0 ? result : null;
  }

  public async checkCarInShortListEntity(car_id: string): Promise<boolean> {
    try {
      const response = await fetch(`${baseUrl}/api/shortlists/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ car_id }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      return Boolean(data.exists); // Return true if `exists` is true, false otherwise
    } catch (error) {
      console.error("Error fetching shortlist status:", error);
      return false;
    }
  }

  public async handleShortlistEntity(car_id: string): Promise<boolean> {
    try {
      const response = await fetch(`${baseUrl}/api/shortlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ car_id }),
      });
      if (!response.ok) {
        return false;
      }

      this.shortlistLoaded = false;

      return true;
    } catch (error) {
      console.error("Failed to create user:", error);
      return false;
    }
  }
}
