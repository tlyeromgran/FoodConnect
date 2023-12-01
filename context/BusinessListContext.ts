import { createContext, Dispatch, SetStateAction } from "react";

// Define the type for a single business item based on the provided data structure
interface Business {
  business_status: string;
  icon: string;
  icon_background_color: string;
  // Add other properties as needed based on the actual data structure
}

// Define the context type
interface BusinessListContextType {
  businessList: Business[];
  setBusinessList: Dispatch<SetStateAction<Business[]>>;
}

// Create the context with a default value
export const BusinessListContext = createContext<BusinessListContextType>({
  businessList: [], // Initial empty array of businesses
  setBusinessList: () => {}, // Initial function that does nothing
});
