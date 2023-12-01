import { createContext, Dispatch, SetStateAction } from "react";

// Define the type for a single business item based on the provided data structure
interface Business {
  business_status: string;
  icon: string;
  icon_background_color: string;
  // Add other properties as needed based on the actual data structure
}

// Define the context type
interface SelectedBusinessContextType {
  selectedBusiness: Business[];
  setSelectedBusinessList: Dispatch<SetStateAction<Business[]>>;
}

// Create the context with a default value
export const SelectedBusinessContext = createContext<SelectedBusinessContextType>({
  selectedBusiness: [], // Initial empty array of businesses
  setSelectedBusinessList: () => {}, // Initial function that does nothing
});
