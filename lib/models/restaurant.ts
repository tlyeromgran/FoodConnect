import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  menu: {
    type: String,
    required: true
  },
  hours: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Restaurant = mongoose.models.restaurants || mongoose.model('restaurants', RestaurantSchema);

export default Restaurant;