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

  public async viewUsedCarListingEntity(): Promise<UsedCarListing[]> {
    const usedCarListings = await this.getUsedCarListing();
    console.log("Loaded used car listings:", usedCarListings);
    return usedCarListings;
  }

  public async viewUsedCarListingForAgentEntity(email: string): Promise<UsedCarListing[]> {
  
    const useCarListings = await this.getUsedCarListing();
    // Filter listings by agent email
    const result = useCarListings.filter((car) => car.agentEmail === email);
    return result;
  }


  public async viewUsedCarListingForSellerEntity(email: string): Promise<UsedCarListing[]> {
  
    const useCarListings = await this.getUsedCarListing();
    // Filter listings by agent email
    const result = useCarListings.filter((car) => car.sellerEmail === email);
    return result;
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
        console.log("Failed to update listing");
        return false;
      }

      console.log("Listing updated successfully");
      await this.loadUsedCarListings(); // Refresh cached listings

      return true;
    } catch (error) {
      console.error("Failed to update used car listing:", error);
      return false;
    }
  }

  public async deleteUsedCarListingEntity(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${baseUrl}/api/usedCarListing/${id}`, {
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
      await this.loadUsedCarListings(); // Refresh cached listings

      return true;
    } catch (error) {
      console.error("Failed to delete used car listing:", error);
      return false;
    }
  }

  public async searchUsedCarListingEntity(title: string): Promise<UsedCarListing[] | null> {
    try {
      const response = await fetch(`${baseUrl}/api/usedCarListing/${title}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Error fetching used car listing:", response.statusText);
        return null;
      }

      const res = await response.json();
      console.log(res.usedCarListings);
      return res.usedCarListings;
    } catch (error) {
      console.error("Failed to fetch used car listing:", error);
      return null;
    }
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
        console.log("Failed to create listing");
        return false;
      }

      console.log("Listing created successfully");
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
