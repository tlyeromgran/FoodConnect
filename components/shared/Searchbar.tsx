"use client"

import RestaurantCard from "@/components/cards/RestaurantCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Restaurant = {
  _id: string;
  name: string;
  logo: string;
  menu: string;
  hours: string;
  email: string;
  phone: string;
  address: string;
  description: string;
};

function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [restaurantResults, setRestaurantResults] = useState<Restaurant[]>([]);



  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`); // Use router to navigate
  };

  return (
    <div className='searchbar'>
      <Image
        src='/assets/search-gray.svg'
        alt='search'
        width={24}
        height={24}
        className='object-contain'
      />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search restaurants'
        className='no-focus searchbar_input'
      />
      <div>
        {restaurantResults.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            restaurant={restaurant}
            onClick={() => handleRestaurantClick(restaurant._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Searchbar;
