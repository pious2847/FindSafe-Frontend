import { useState } from "react";
import { APIProvider,  Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";

const GoogleMaps = () => {
    const position = {lat: 0, lng: 0};
    return ( 
        <APIProvider apiKey='AIzaSyBU7cuBHlqgsfW_wD2XrDgdQYzmdnm-_CM'>
            <div className="h-[100%] w-[100%]">
                <Map zoom={50}  center={position}>

                </Map>
            </div>
        </APIProvider>
     );
} 
 
export default GoogleMaps;