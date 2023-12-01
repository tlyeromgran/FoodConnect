"use client"

// RestaurantPage.tsx
import RestaurantForm from '@/components/forms/RestaurantForm';
import SuccessPopup from '@/components/ui/successPopup';
import { useState } from 'react';

const RestaurantPage = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSuccess = () => {
    console.log('Form submission successful');
    setShowSuccessPopup(true); // Show the success pop-up
    setTimeout(() => setShowSuccessPopup(false), 3000); // Hide the pop-up after 3 seconds
  };

  const handleError = (error: any) => {
    console.error('Form submission error:', error);
    // Handle form submission error here
  };

  return (
    <div>
      <RestaurantForm 
        onSuccess={handleSuccess} 
        onError={handleError} // Corrected: define and use handleError
        onSubmitSuccess={handleSuccess} // Add this prop
      />
      {showSuccessPopup && <SuccessPopup />}
    </div>
  );
};

export default RestaurantPage;

