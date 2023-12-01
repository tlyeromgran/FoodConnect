/* eslint-disable no-unused-vars */
import { SelectedBusinessContext } from '@/context/SelectedBusinessContext';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useContext, useState } from 'react';
import Marker from './Marker';
function GoogleMap_() {
    const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext);

    // Fixed coordinates
    const fixedLocation = {
        lat: 35.04650490168277, 
        lng: -85.29532866124336
    };

    const containerStyle = {
        width: '100%',
        height: '500px',
        borderRadius: 20
    };
    const [restaurants, setRestaurants] = useState([]);

    const fetchRestaurants = (map) => {
        const service = new window.google.maps.places.PlacesService(map);
        const request = {
            location: fixedLocation,
            radius: '5000', // Search within 5000 meters
            type: ['restaurant'] // Search for restaurants
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setRestaurants(results);
            }
        });
    };

    return (
        <div>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} 
                            libraries={["places"]}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={
                        !selectedBusiness.name ? fixedLocation : selectedBusiness.geometry.location
                    }
                    zoom={selectedBusiness.name ? 16 : 15}
                >
                    {restaurants.map((restaurant, index) => (
                        <Marker
                            key={index}
                            position={restaurant.geometry.location}
                            title={restaurant.name}
                        />
                    ))}
                    <>
                        <Marker userLocation={fixedLocation} />
                    </>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMap_;
