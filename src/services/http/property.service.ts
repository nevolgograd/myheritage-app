import type { PropertyDeal } from "src/features/Property/components/types";
import { HttpService } from ".";

type DealFilters = {
  priceMin?: string;
  priceMax?: string;
  bedrooms?: string;
  bathrooms?: string;
  pool?: string;
  livingAreaMin?: string;
  livingAreaMax?: string;
  lotSizeMin?: string;
  lotSizeMax?: string;
  yearBuiltMin?: string;
  yearBuiltMax?: string;
  maxHOA?: string;
};

type GetDealsPayload = {
  page?: number;
  filters?: DealFilters;
  sort?: "newest" | "oldest";
};

type GetDealsResponse = {
  success: boolean;
  deals: PropertyDeal[];
};

type GetDealsResult = {
  deals: PropertyDeal[];
  total: number;
  pageSize: number;
};

class ProperyHttpService extends HttpService {
  private fakeDealsFilter(
    { userData, zillowData }: PropertyDeal,
    filters: DealFilters,
  ) {
    const priceMin = filters.priceMin ? Number(filters.priceMin) : null;
    const priceMax = filters.priceMax ? Number(filters.priceMax) : null;
    const bedroomsMin = filters.bedrooms ? Number(filters.bedrooms) : null;
    const bathroomsMin = filters.bathrooms ? Number(filters.bathrooms) : null;
    const livingAreaMin = filters.livingAreaMin
      ? Number(filters.livingAreaMin)
      : null;
    const livingAreaMax = filters.livingAreaMax
      ? Number(filters.livingAreaMax)
      : null;
    const lotSizeMin = filters.lotSizeMin ? Number(filters.lotSizeMin) : null;
    const lotSizeMax = filters.lotSizeMax ? Number(filters.lotSizeMax) : null;
    const yearBuiltMin = filters.yearBuiltMin
      ? Number(filters.yearBuiltMin)
      : null;
    const yearBuiltMax = filters.yearBuiltMax
      ? Number(filters.yearBuiltMax)
      : null;
    const maxHOA = filters.maxHOA ? Number(filters.maxHOA) : null;

    // HOA can appears in userData and zillowData
    const hoaFee =
      userData.hoaFee != null ? userData.hoaFee : zillowData?.hoaFee;

    // 1) Price filters
    if (priceMin != null && !userData.askingPrice) {
      return false;
    }
    if (
      priceMin != null &&
      userData.askingPrice &&
      userData.askingPrice < priceMin
    ) {
      return false;
    }
    if (
      priceMax != null &&
      userData.askingPrice &&
      userData.askingPrice > priceMax
    ) {
      return false;
    }

    // 2) Bedrooms, bathrooms (e.g., only check if filter is set)
    if (
      bedroomsMin != null &&
      zillowData?.bedrooms &&
      zillowData.bathrooms < bedroomsMin
    ) {
      return false;
    }
    if (
      bathroomsMin != null &&
      zillowData?.bathrooms &&
      zillowData.bathrooms < bathroomsMin
    ) {
      return false;
    }

    // 3) Pool (if "true", must have a pool; if "false", must not have a pool)
    if (filters.pool === "true" && !zillowData?.hasPool) return false;
    if (filters.pool === "false" && zillowData?.hasPool) return false;

    // 4) Living area
    if (
      livingAreaMin != null &&
      zillowData?.livingAreaValue &&
      zillowData.livingAreaValue < livingAreaMin
    ) {
      return false;
    }
    if (
      livingAreaMax != null &&
      zillowData?.livingAreaValue &&
      zillowData.livingAreaValue > livingAreaMax
    ) {
      return false;
    }

    // 5) Lot size
    if (
      lotSizeMin != null &&
      zillowData?.lotSize &&
      zillowData.lotSize < lotSizeMin
    ) {
      return false;
    }
    if (
      lotSizeMax != null &&
      zillowData?.lotSize &&
      zillowData.lotSize > lotSizeMax
    ) {
      return false;
    }

    // 6) Year built
    if (
      yearBuiltMin != null &&
      zillowData?.yearBuilt &&
      zillowData?.yearBuilt < yearBuiltMin
    ) {
      return false;
    }
    if (
      yearBuiltMax != null &&
      zillowData?.yearBuilt &&
      zillowData.yearBuilt > yearBuiltMax
    ) {
      return false;
    }

    // 7) HOA fee
    // Decide how to handle missing (null) HOA.
    // For example, exclude if no HOA info is available but we have a maxHOA:
    if (maxHOA != null) {
      // Option A: Exclude if HOA is known and above max, or if HOA is null
      // return (hoaFee != null && hoaFee <= maxHOA);

      // Option B: Exclude only if HOA is known and above max (keep if null)
      if (hoaFee != null && hoaFee > maxHOA) return false;
    }

    // If all checks pass, keep the deal
    return true;
  }

  /**
   * Sort listings from newest to oldest based on yearBuilt.
   * Listings missing yearBuilt are pushed to the end.
   */
  private fakeSortDescending(a: PropertyDeal, b: PropertyDeal) {
    const yearA = a.zillowData?.yearBuilt;
    const yearB = b.zillowData?.yearBuilt;

    if (!yearA && !yearB) return 0;
    if (!yearA) return 1; // a goes after b
    if (!yearB) return -1; // b goes after a

    return yearB - yearA;
  }

  /**
   * Sort listings from oldest to newest based on yearBuilt.
   * Listings missing yearBuilt are pushed to the end.
   */
  private fakeSortAscending(a: PropertyDeal, b: PropertyDeal) {
    const yearA = a.zillowData?.yearBuilt;
    const yearB = b.zillowData?.yearBuilt;

    // Check for null or undefined.
    if (!yearA && !yearB) return 0;
    if (!yearA) return 1; // a goes after b
    if (!yearB) return -1; // b goes after a

    return yearA - yearB;
  }

  async getDeals(payload?: GetDealsPayload): Promise<GetDealsResult | null> {
    const response = await this.get<GetDealsResponse>("/get-listings");

    if (response?.success) {
      // fake pagination
      const pageSize = 20;
      const startIndex =
        payload?.page && payload?.page !== 1 ? pageSize * payload.page - 1 : 0;

      const total =
        payload?.filters && Object.keys(payload.filters).length
          ? response.deals.filter((d) =>
              this.fakeDealsFilter(d, payload.filters as DealFilters),
            )
          : response.deals;

      const totalSorted = !payload?.sort
        ? total
        : total.toSorted(
            payload.sort === "newest"
              ? this.fakeSortDescending
              : this.fakeSortAscending,
          );

      return {
        deals: [...totalSorted].splice(startIndex, pageSize),
        total: totalSorted.length,
        pageSize,
      };
    }

    return null;
  }
}

export const propertyHttpService = new ProperyHttpService(
  "https://u2oyhiwlmc.execute-api.us-east-1.amazonaws.com/production",
);
