import axios from 'axios';

export interface RestaurantData {
  name: string;
  logo: string;
  menu: string;
  hours: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

export const submitRestaurant = async (data: RestaurantData) => {
  console.log("Submitting data:", data);
  try {
    const response = await axios.post('/api/restaurants', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      console.error('Error data:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to submit restaurant');
    } else {
      // Unknown error
      console.error('Unknown error:', error);
      throw new Error('Unknown error occurred while submitting restaurant');
    }
  }
};


export const fetchRestaurant = async (id: string) => {
  try {
    const response = await axios.get(`/api/restaurants/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching restaurant data:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch restaurant');
  }
};

export const deleteRestaurant = async (id: string) => {
  try {
    const response = await axios.delete(`/api/restaurants/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting restaurant data:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete restaurant');
  }
};

export const fetchAllRestaurants = async () => {
  try {
    const response = await axios.get('/api/restaurants');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching all restaurants:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch restaurants');
  }
};