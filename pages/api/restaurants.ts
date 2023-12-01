import type { NextApiRequest, NextApiResponse } from 'next';
import Restaurant from '../../lib/models/restaurant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log("Request body:", req.body);
    try {
      const restaurant = new Restaurant(req.body);
      const savedRestaurant = await restaurant.save();
      res.status(200).json({ success: true, data: savedRestaurant });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: 'Unknown error occurred' });
      }
    }
  } else if (req.method === 'GET') {
    try {
      const { search } = req.query; // Extracting search query parameter

      let query = {};
      if (typeof search === 'string') {
        query = { name: { $regex: search, $options: 'i' } }; // Performing a case-insensitive search
      }

      const restaurants = await Restaurant.find(query);

      res.status(200).json({ success: true, data: restaurants });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: 'Unknown error occurred' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
