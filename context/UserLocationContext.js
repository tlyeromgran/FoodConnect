import { createContext, useContext } from 'react';

// Create a context for the static location
const UserLocationContext = createContext({
  lat: 35.04650490168277,
  lng: -85.29532866124336
});

// Custom hook to use the user location context
export const useUserLocation = () => {
  const context = useContext(UserLocationContext);
  if (context === undefined) {
    throw new Error('useUserLocation must be used within a component that is wrapped with UserLocationContext.Provider');
  }
  return context;
};

export default UserLocationContext;
