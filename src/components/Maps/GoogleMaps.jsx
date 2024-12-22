import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

const GoogleMaps = () => {
    const position = { lat: 0, lng: 0 };
    return (
        <APIProvider apiKey={import.meta.env.GOOGLE_MAPS_API_KEY}>
            <div className="h-[100%] w-[100%]">
                <Map zoom={50} center={position}>

                </Map>
            </div>
        </APIProvider>
    );
}

export default GoogleMaps;