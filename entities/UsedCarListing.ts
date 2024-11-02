import { UserAccountFormSchemaType } from "@/components/Forms/UserAccountFormSchema";
import { baseUrl } from "@/lib/utils";
import { Status, UsedCarListing } from "@prisma/client";

export class UsedCarListingEntity {
  [x: string]: any;
  // Static property to hold the single instance of the class
  private static instance: UsedCarListingEntity
  private usedCarListings: UsedCarListing[] = [];
  private usersLoaded: boolean = false;

  // Static method to provide access to the single instance of the class
  public static getInstance(): UsedCarListingEntity {
    if (!UsedCarListingEntity.instance) {
      UsedCarListingEntity.instance = new UsedCarListingEntity();
    }
    return UsedCarListingEntity.instance;
  }

  public async getUsedCarListing(): Promise<UsedCarListing[]> {
    if (!this.usersLoaded) {
      await this.loadUsedCarListings();
    }
    return this.usedCarListings;
  }

  public async viewUsedCarListingEntity(): Promise<UsedCarListing[]> {
    const usedCarListings = await this.getUsedCarListing();
    return usedCarListings;
  }

  public async editUsedCarListingEntity(
    id             :String,
  title            :String,
  agentEmail       :String,     
  sellerEmail      :String, 
  mileage          :Number,
  color            :String,
  condition        :String,
  imgUrl           :String,
  manufacturedYear :Number,
  price            :Number,
  description      :String,
 
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
        console.log("Entity update failed");
        return false;
      }
      console.log("Entity update success");
      await this.loadUsers();

      return true;
    } catch (error) {
      console.error("Failed to create usedCarlisting:", error);
      return false;
    }
  }

  public async deleteUsedCarListingEntity(id: String): Promise<boolean> {
    try {
      const response = await fetch(`${baseUrl}/api/usedCarListing/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        console.log("Entity deletion failed");
        return false;
      }
  
      console.log("Entity deletion success");
      await this.loadUsedCarListings();
  
      return true;
    } catch (error) {
      console.error("Failed to delete usedCarlisting:", error);
      return false;
    }
  }

  public async searchUsedCarListingEntity(title: string): Promise<UsedCarListing | null> {
    try {
      const response = await fetch(`${baseUrl}/api/usedCarListing/${title}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Error fetching usedcarlisting:", response.statusText);
        return null;
      }

      const res = await response.json();

      return res;
    } catch (error) {
      console.error("Failed to fetch usedcarlisting:", error);
      return null;
    }
  }

  
  public async createUsedCarListingEntity(
title: string, agentEmail:string, sellerEmail: string, mileage: number, color: string, condition: string, imgUrl: string, manufacturedYear: number, price: number, description: string  ): Promise<boolean> {
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
      this.loadUsedCarListings();
      return true;
    } catch (error) {
      console.error("Failed to create used car listing:", error);
      return false;
    }
  }
  // Load users from the API, and cache the result
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
  
      this.users = res.users;
  
      this.usersLoaded = true;
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }
  
}
