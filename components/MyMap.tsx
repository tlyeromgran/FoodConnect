"use client"

import BusinessList from "@/components/map/BusinessList";
import CategoryList from "@/components/map/CategoryList";
import GoogleMap_ from "@/components/map/GoogleMap_";
import { BusinessListContext } from "@/context/BusinessListContext";
import UserLocationContext from "@/context/UserLocationContext";
import GlobalApi from "@/services/GlobalApi";
import { useContext, useEffect, useState } from "react";

import BusinessToast from "@/components/map/BusinessToast";
import { SelectedBusinessContext } from "@/context/SelectedBusinessContext";

interface Business {
  business_status: string;
  icon: string;
  icon_background_color: string;
  // Add other properties as needed
}

const MyMapComponent = () => {
  const [businessList, setBusinessList] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusinessList] = useState<Business[]>([]);

  const { lat, lng } = useContext(UserLocationContext);
  const userLocation = { lat, lng };

  // Check if Google Maps API key is loaded
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
      console.log("Google Maps API Key is set:", process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
    } else {
      console.error("Google Maps API Key is not set.");
    }
  }, []);

  const getNearByPlace = (category: any) => {
    GlobalApi.getNearByPlace(category, 35.04650490168277, -85.30831527709961)
      .then(resp => {
        setBusinessList(resp.data.results);
        console.log("Business list updated:", resp.data.results);
      })
      .catch(error => {
        console.error("Error fetching nearby places:", error);
      });
  };

  return (
    <div className="flex">
      <SelectedBusinessContext.Provider value={{ selectedBusiness, setSelectedBusinessList }}>
        <BusinessListContext.Provider value={{ businessList, setBusinessList }}>
          <div className="mt-5 grid w-full grid-cols-1 gap-2 px-0 md:grid-cols-2 md:px-10">
            <div>
              {/* Search Bar */}

              {/* Category List */}
              <CategoryList setSelectedCategory={(category: any) => getNearByPlace(category)} />
              {/* Business List */}
              <BusinessList businessListData={businessList} />
            </div>

            {/* Google Map */}
            <div className="order-first md:order-last">
              <GoogleMap_ />
              <div className="mt-5">
              <BusinessToast userLocation={userLocation} />
              </div>
            </div>
          </div>
        </BusinessListContext.Provider>
      </SelectedBusinessContext.Provider>
    </div>
  );
};

export default MyMapComponent;

