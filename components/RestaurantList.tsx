"use client"

import RestaurantCard from '@/components/cards/RestaurantCard';
import { fetchAllRestaurants } from '@/lib/actions/restaurant.actions'; // Adjust the path as necessary
import React, { useEffect, useState } from 'react';

// Define the structure of a restaurant object
interface Restaurant {
  name: string;
  description: string;
  logo: string;
  menu: string;
  hours: string;
  email: string;
  phone: string;
  address: string;
  // Add other properties as needed
}

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const response = await fetchAllRestaurants();
        if (response.success) {
          setRestaurants(response.data);
        } else {
          setError('Failed to load restaurants');
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadRestaurants();
  }, []);

  return (
    <div className = "mt-5">
      <h2>Featured Restaurants</h2>
      {error && <p>Error: {error}</p>}
      {!error && (
        <ul>
          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              restaurant={restaurant} onClick={function (): void {
                console.log("Restaurant clicked");
              } }            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantList;
