export type PropertyDeal = {
  _id: string;
  address: {
    location?: [number, number];
    googlePlaceId?: string;
    formattedAddress?: string;
    state?: string;
    stateCode?: string;
    streetNumber?: string;
    route?: string;
    locality?: string;
    county?: string;
    zipcode?: string;
    kind?: "house" | "route";
    friendlyUrl?: string;
  };
  userData: {
    inspectionAvailability?: unknown[];
    askingPrice?: number;
    wastewaterType?: "not_sure" | "sewer" | "septic" | "";
    foundationIssues?: boolean;
    hoaFee?: null;
    hoaPeriod?: null;
    linkToPhotos?: null;
    updatedAskingPrice?: unknown[];
  };
  zillowData?: {
    yearBuilt: number;
    lotSize: number;
    zestimate: number;
    rentZestimate: number;
    livingAreaValue: number;
    homeType?:
      | "SINGLE_FAMILY"
      | "MANUFACTURED"
      | "TOWNHOUSE"
      | "CONDO"
      | "MULTI_FAMILY"
      | "APARTMENT"
      | "HOME_TYPE_UNKNOWN"
      | "LOT";
    bedrooms: number;
    bathrooms: number;
    homeStatus?: "OTHER" | "FOR_SALE" | "FOR_RENT" | "SOLD";
    hdpUrl?: string;
    dateSold?: number;
    listing_sub_type: {
      is_FSBA: boolean;
      is_newHome: boolean;
      is_FSBO: boolean;
      is_pending: boolean;
      is_bankOwned: boolean;
      is_openHouse: boolean;
      is_forAuction: boolean;
      is_comingSoon: boolean;
      is_foreclosure: boolean;
    };
    hoaFee?: null;
    schoolRating?: number;
    parkingSpaces?: number;
    hasPool?: null;
  };
};
