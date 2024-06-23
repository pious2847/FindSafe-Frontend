import { useState } from "react";
import { APIProvider,  Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";

const GoogleMaps = () => {
    const position = {lat: 0, lng: 0};
    return ( 
        <APIProvider apiKey='AIzaSyDOC1ilsKxlbVsYfPgO__Xy26LTJGA8Eaw'>
            <div className="h-[100%] w-[100%]">
                <Map zoom={50} tilt={15.0} center={position}>

                </Map>
            </div>
        </APIProvider>
     );
} 
 
export default GoogleMaps;