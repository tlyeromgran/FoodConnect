// RestaurantForm.tsx
"use client"

import OrganizationAuthChecker from '@/components/OrganizationAuthChecker';
import { RestaurantData, submitRestaurant } from '@/lib/actions/restaurant.actions';
import React, { useState } from 'react';

interface RestaurantFormProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  onSubmitSuccess?: () => void; // Add this line
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ onSuccess, onError, onSubmitSuccess  }) => {
  const [formData, setFormData] = useState<RestaurantData>({
    name: '',
    logo: '',
    menu: '',
    hours: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    // Basic validation rules
    if (!formData.name.trim()) {
      newErrors.name = 'Restaurant name is required';
      isValid = false;
    }
    if (!formData.logo.trim()) {
      newErrors.logo = 'Logo URL is required';
      isValid = false;
    }
    if (!formData.menu.trim()) {
      newErrors.menu = 'Menu URL is required';
      isValid = false;
    }
    if (!formData.hours.trim()) {
      newErrors.hours = 'Business hours are required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await submitRestaurant(formData);
        onSuccess?.();
        onSubmitSuccess?.(); // Call the success handler
      } catch (error) {
        onError?.(error);
      }
    }
  };

  return (

    <form onSubmit={handleSubmit} className="restaurant-form">
      <OrganizationAuthChecker />
    <div>
      <label className="restaurant-label" htmlFor="name">Restaurant Name:</label>
      <input className="restaurant-input" type="text" id="name" name="name" value={formData.name} onChange= {handleChange}  />
      {errors.name && <p className ="restaurant-error">{errors.name}</p>}
    </div>
    
    <div>
      <label className="restaurant-label" htmlFor="logo">Logo URL:</label>
      <input className="restaurant-input" type="text" id="logo" name="logo" value={formData.logo} onChange={handleChange} />
      {errors.logo && <p className ="restaurant-error">{errors.logo}</p>}
    </div>

    <div>
      <label className="restaurant-label" htmlFor="menu">Menu URL:</label>
      <input className="restaurant-input" type="text" id="menu" name="menu" value={formData.menu} onChange={handleChange} />
      {errors.menu && <p className ="restaurant-error">{errors.menu}</p>}
    </div>

    <div>
      <label className="restaurant-label" htmlFor="hours">Business Hours:</label>
      <input className="restaurant-input" type="text" id="hours" name="hours" value={formData.hours} onChange={handleChange} />
      {errors.hours && <p className ="restaurant-error">{errors.hours}</p>}
    </div>

      <div>
      <label className="restaurant-label" htmlFor="email">Email:</label>
      <input className="restaurant-input" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      {errors.email && <p className ="restaurant-error">{errors.email}</p>}
    </div>
    <div>
      <label className="restaurant-label" htmlFor="phone">Phone Number:</label>
      <input className="restaurant-input" type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
      {errors.phone && <p className ="restaurant-error">{errors.phone}</p>}
    </div>

    <div>
      <label className="restaurant-label" htmlFor="address">Address:</label>
      <input className="restaurant-input" type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
      {errors.address && <p className ="restaurant-error">{errors.address}</p>}
    </div>

    <div>
      <label className="restaurant-label" htmlFor="description">Description:</label>
      <textarea className="restaurant-input" id="description" name="description" value={formData.description} onChange={handleChange} />
      {errors.description && <p className ="restaurant-error">{errors.description}</p>}
    </div>

    <button className="restaurant-btn" type="submit">Submit Restaurant</button>
  </form>
  );
};

export default RestaurantForm;
