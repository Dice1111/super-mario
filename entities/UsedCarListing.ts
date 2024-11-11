import { baseUrl } from "@/lib/utils";
import { UsedCarListing } from "@prisma/client";

export class UsedCarListingEntity {
  private static instance: UsedCarListingEntity;
  private usedCarListings: UsedCarListing[] = [];
  private listingLoaded: boolean = false;

  // Singleton instance access
  public static getInstance(): UsedCarListingEntity {
    if (!UsedCarListingEntity.instance) {
      UsedCarListingEntity.instance = new UsedCarListingEntity();
    }
    return UsedCarListingEntity.instance;
  }

  public async getUsedCarListing(): Promise<UsedCarListing[]> {
    if (!this.listingLoaded) {
      await this.loadUsedCarListings();
    }
    return this.usedCarListings;
  }

  public async viewTopFourUsedCarListingsByViewCount(): Promise<
    UsedCarListing[]
  > {
    // Ensure listings are loaded
    const usedCarListings = await this.getUsedCarListing();

    // Sort by viewCount in descending order and get the top 4
    const topFourListings = usedCarListings
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 4);

    return topFourListings;
  }

  public async viewUsedCarListingEntity(): Promise<UsedCarListing[]> {
    const usedCarListings = await this.getUsedCarListing();
    return usedCarListings;
  }

  public async viewUsedCarListingForAgentEntity(
    email: string
  ): Promise<UsedCarListing[]> {
    const useCarListings = await this.getUsedCarListing();
    // Filter listings by agent email
    const result = useCarListings.filter((car) => car.agentEmail === email);
    return result;
  }

  public async viewUsedCarListingForSellerEntity(
    email: string
  ): Promise<UsedCarListing[]> {
    const useCarListings = await this.getUsedCarListing();
    // Filter listings by agent email
    const result = useCarListings.filter((car) => car.sellerEmail === email);
    return result;
  }

  public async addNumberOfViewEntity(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${baseUrl}/api/usedCarListing/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, purpose: "viewCount" }),
      });

      if (!response.ok) {
        return false;
      }

      await this.loadUsedCarListings();
      return true;
    } catch (error) {
      console.error("Failed to increment view count:", error);
      return false;
    }
  }

  public async editUsedCarListingEntity(
    id: string,
    title: string,
    agentEmail: string,
    sellerEmail: string,
    mileage: number,
    color: string,
    condition: string,
    imgUrl: string,
    manufacturedYear: number,
    price: number,
    description: string
  ): Promise<boolean> {
    try {
      const data = {
        id,
        title,
        agentEmail,
        sellerEmail,
        mileage,
        color,
        condition,
        imgUrl,
        manufacturedYear,
        price,
        description,
      };

      const response = await fetch(`${baseUrl}/api/usedCarListing`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return false;
      }

      await this.loadUsedCarListings(); // Refresh cached listings

      return true;
    } catch (error) {
      console.error("Failed to update used car listing:", error);
      return false;
    }
  }

  public async deleteUsedCarListingEntity(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${baseUrl}/api/usedCarListing/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        return false;
      }

      await this.loadUsedCarListings(); // Refresh cached listings

      return true;
    } catch (error) {
      console.error("Failed to delete used car listing:", error);
      return false;
    }
  }

  public async searchAgentSpecificUsedCarListingEntity(
    email: string,
    title: string
  ): Promise<UsedCarListing[] | null> {
    const useCarListings = await this.getUsedCarListing();
    const searchTerm = title.toLowerCase();
    const result = useCarListings.filter(
      (car) =>
        car.agentEmail === email && car.title.toLowerCase().includes(searchTerm)
    );

    return result.length > 0 ? result : null;
  }

  public async searchUsedCarListingEntity(
    title: string
  ): Promise<UsedCarListing[] | null> {
    const useCarListings = await this.getUsedCarListing();
    const searchTerm = title.toLowerCase();
    const result = useCarListings.filter((car) =>
      car.title.toLowerCase().includes(searchTerm)
    );
    return result.length > 0 ? result : null;
  }

  public async createUsedCarListingEntity(
    title: string,
    agentEmail: string,
    sellerEmail: string,
    mileage: number,
    color: string,
    condition: string,
    imgUrl: string,
    manufacturedYear: number,
    price: number,
    description: string
  ): Promise<boolean> {
    try {
      const data = {
        title,
        agentEmail,
        sellerEmail,
        mileage,
        color,
        condition,
        imgUrl,
        manufacturedYear,
        price,
        description,
      };

      const response = await fetch(`${baseUrl}/api/usedCarListing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return false;
      }

      await this.loadUsedCarListings(); // Refresh cached listings

      return true;
    } catch (error) {
      console.error("Failed to create used car listing:", error);
      return false;
    }
  }

  private async loadUsedCarListings(): Promise<void> {
    try {
      const response = await fetch(`${baseUrl}/api/usedCarListing`, {
        cache: "no-cache",
      });

      if (!response.ok) {
        console.error(`Error: Received status ${response.status}`);
        return;
      }

      const res = await response.json();
      this.usedCarListings = res.usedCarListings;
      this.listingLoaded = true;
    } catch (error) {
      console.error("Failed to load car listings:", error);
    }
  }
}
