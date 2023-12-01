"use client"

/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import { BusinessListContext } from "@/context/BusinessListContext";
import { InfoBox, MarkerF } from "@react-google-maps/api";
import { useContext } from "react";

function Marker({ userLocation }) {
  const { businessList, setBusinessList } = useContext(BusinessListContext);
  return (
    <div>
      {businessList &&
        businessList.map(
          (business, index) =>
            index <= 40 && (
              <MarkerF key={index}
                position={business.geometry.location}
                icon={{
                  url: "/location-pin.png",
                  scaledSize: {
                    width: 50,
                    height: 50,
                  },
                }}
              >
                <InfoBox position={business.geometry.location}>
                  <div
                    style={{
                      backgroundColor: "white",
                      backgroundColor: "#FDB736",
                      opacity: 1,
                      padding: 7,
                      color: "white",
                      borderRadius: 10,
                      width: 100,
                    }}
                  >
                    <div style={{ fontSize: 13, fontColor: `#08233B` }}>
                      {business.name}
                    </div>
                  </div>
                </InfoBox>
              </MarkerF>
            )
        )}
      <MarkerF
        position={userLocation}
        icon={{
          url: "/user-location.png",
          scaledSize: {
            width: 50,
            height: 50,
          },
        }}
      ></MarkerF>
    </div>
  );
}

export default Marker;
