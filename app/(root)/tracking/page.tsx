/* eslint-disable tailwindcss/classnames-order */
"use client"

import { useEffect, useState } from 'react';

const API_KEY = 'zcrLHCDL4ug8Jc1XAwpXosZGbdNNUPhhqtSEIARe';

const ESSENTIAL_NUTRIENTS = ['Energy', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference'];

interface NutrientInfo {
  name: string;
  amount: number;
  unitName: string;
}

interface FoodItem {
  fdcId: number;
  description: string;
  nutrients: NutrientInfo[];
}

const FoodTrackerPage = () => {
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);
  const [query, setQuery] = useState('');
  const [totalNutrients, setTotalNutrients] = useState<NutrientInfo[]>([]);

  useEffect(() => {
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }

    const searchFood = async () => {
      try {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${encodeURIComponent(query)}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const foods: FoodItem[] = data.foods.map((food: any) => ({
          fdcId: food.fdcId,
          description: food.description,
          nutrients: food.foodNutrients
            .filter((n: any) => ESSENTIAL_NUTRIENTS.includes(n.nutrientName))
            .map((n: any) => ({
              name: n.nutrientName,
              amount: n.value,
              unitName: n.unitName,
            })),
        }));

        setSearchResults(foods);
      } catch (error) {
        console.error('There was an error fetching the food data:', error);
      }
    };

    searchFood();
  }, [query]);

  const addToMeal = (foodItem: FoodItem) => {
    setSelectedItems([...selectedItems, foodItem]);
    calculateTotalNutrients([...selectedItems, foodItem]);
  };

  const calculateTotalNutrients = (items: FoodItem[]) => {
    const nutrientSums: { [key: string]: NutrientInfo } = {};

    items.forEach(item => {
      item.nutrients.forEach(nutrient => {
        if (ESSENTIAL_NUTRIENTS.includes(nutrient.name)) {
          if (!nutrientSums[nutrient.name]) {
            nutrientSums[nutrient.name] = { ...nutrient, amount: 0 };
          }
          nutrientSums[nutrient.name].amount += nutrient.amount;
        }
      });
    });

    setTotalNutrients(Object.values(nutrientSums));
  };

  return (
    <div className="main-container bg-dark-1 text-light-1 rounded p-4">
    <div className="mb-4">
      <input
        className="searchbar_input w-full py-2 px-3 rounded leading-tight"
        type="text"
        placeholder="Search for food"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>

    {searchResults.length > 0 && (
      <div className="mb-4">
        <label className="block font-bold mb-2 text-light-3" htmlFor="foodSelect">
          Select Food Item
        </label>
        <select
          id="foodSelect"
          className="block w-full bg-dark-2 border border-dark-4 text-white py-3 px-4 pr-8 rounded leading-tight"
          onChange={(e) => addToMeal(searchResults[e.target.selectedIndex])}
        >
          {searchResults.map((food, index) => (
            <option key={food.fdcId} value={index}>
              {food.description}
            </option>
          ))}
        </select>
      </div>
    )}

    <h3 className="head-text2 mb-2">Selected Foods:</h3>
    <ul className="mb-4">
      {selectedItems.map((item, index) => (
        <li key={index} className="head-text7">{item.description}</li>
      ))}
    </ul>

    <h3 className="head-text2 mb-2">Total Nutritional Information:</h3>
    <ul>
      {totalNutrients.map((nutrient, index) => (
        <li key={index} className="head-text7">
          {nutrient.name}: {nutrient.amount.toFixed(2)} {nutrient.unitName}
        </li>
      ))}
    </ul>
  </div>
);
      };
export default FoodTrackerPage;
