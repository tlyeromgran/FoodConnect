"use client"

/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import BusinessList from "../components/BusinessList";
import CategoryList from "../components/CategoryList";
import GoogleMap_ from "../components/GoogleMap_";
import SearchBar from "../components/SearchBar";
import SideNavBar from "../components/SideNavBar";
import { BusinessListContext } from "../context/BusinessListContext";
import { UserLocationContext } from "../context/UserLocationContext";
import GlobalApi from "../services/GlobalApi";

import BusinessToast from "../components/BusinessToast";
import { SelectedBusinessContext } from "../context/SelectedBusinessContext";

export default function Home() {
  const [businessList,setBusinessList]=useState([]);
  const [selectedBusiness,setSelectedBusiness]=useState([]);

  const {userLocation,setUserLocation}
  =useContext(UserLocationContext)

  useEffect(()=>{
    if(userLocation)
      getNearByPlace('restaurant');
    
   
  },[userLocation])

  const getNearByPlace=(category)=>{
    GlobalApi.getNearByPlace(category,userLocation?.lat,
      userLocation.lng)
    .then(resp=>{
    
      setBusinessList(resp.data.results)
    })
  }
  return (
    <div className="flex">
      <SelectedBusinessContext.Provider value={{selectedBusiness,setSelectedBusiness}}>
      <BusinessListContext.Provider value={{businessList,setBusinessList}}>
      <SideNavBar />
      <div className="grid grid-cols-1
      md:grid-cols-2 px-6 md:px-10 w-full mt-10 gap-8">
      
        <div>
          {/* Search Bar  */}
          <SearchBar/>
          {/* Category List  */}
          <CategoryList setSelectedCategory={(category)=>
            getNearByPlace(category)} />
          {/* Business List */}
          <BusinessList businessListData={businessList} />
        </div>

        {/* Google Map */}
        <div className="order-first md:order-last">
          <GoogleMap_/>
          <BusinessToast userLocation={userLocation} />
        </div>
      </div>
      </BusinessListContext.Provider>
      </SelectedBusinessContext.Provider>
    </div>
  );
}
