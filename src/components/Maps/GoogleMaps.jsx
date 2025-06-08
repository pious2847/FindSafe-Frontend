import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { fetchUserDevices } from "@/services/device";
import { fetchDeviceLocationsWithNames } from "@/services/locations";
import { getUserId } from "@/auth/auth";
import { Navigation, MapPin, Route, Crosshair } from "lucide-react";

const GoogleMaps = ({ selectedDeviceId = null }) => {
    const [userPosition, setUserPosition] = useState({ lat: 37.7749, lng: -122.4194 }); // Default position
    const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [routeDirections, setRouteDirections] = useState(null);
    const [showRoute, setShowRoute] = useState(false);
    const mapRef = useRef(null);
    const directionsService = useRef(null);
    const directionsRenderer = useRef(null);

    // Dark theme map styles
    const darkMapStyles = [
        { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#00ffff" }],
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#8b5cf6" }],
        },
        {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
        },
        {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
        },
        {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
        },
    ];

    // Get user's current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserPosition(userPos);
                    setMapCenter(userPos);
                },
                (error) => {
                    console.warn('Error getting user location:', error);
                    // Keep default position
                }
            );
        }
    }, []);

    // Fetch real device data and locations
    useEffect(() => {
        const fetchDeviceData = async () => {
            try {
                setLoading(true);
                const userId = getUserId();
                if (!userId) {
                    console.warn('No userId found');
                    setLoading(false);
                    return;
                }

                // Fetch user devices
                const userDevices = await fetchUserDevices(userId);
                if (!userDevices || userDevices.length === 0) {
                    setDevices([]);
                    setMarkers([]);
                    setLoading(false);
                    return;
                }

                setDevices(userDevices);

                // Fetch locations for each device
                const deviceMarkers = [];
                for (const device of userDevices) {
                    try {
                        const locations = await fetchDeviceLocationsWithNames(device._id);
                        if (locations && locations.length > 0) {
                            // Get the most recent location
                            const latestLocation = locations[0];

                            deviceMarkers.push({
                                id: device._id,
                                deviceId: device._id,
                                position: {
                                    lat: parseFloat(latestLocation.latitude),
                                    lng: parseFloat(latestLocation.longitude)
                                },
                                title: device.devicename,
                                status: device.mode === 'active' ? 'online' :
                                       device.mode === 'disabled' ? 'warning' : 'offline',
                                lastSeen: new Date(latestLocation.timestamp).toLocaleString(),
                                battery: "Unknown", // Would need battery data from device
                                address: latestLocation.address || 'Unknown location',
                                device: device
                            });
                        }
                    } catch (error) {
                        console.error(`Error fetching locations for device ${device._id}:`, error);
                    }
                }

                setMarkers(deviceMarkers);
            } catch (error) {
                console.error('Error fetching device data:', error);
                // No fallback data - show error state
            } finally {
                setLoading(false);
            }
        };

        fetchDeviceData();
    }, []);

    // Handle selected device from parent component
    useEffect(() => {
        if (selectedDeviceId && markers.length > 0) {
            const selectedDevice = markers.find(marker => marker.deviceId === selectedDeviceId);
            if (selectedDevice) {
                setSelectedMarker(selectedDevice);
                setMapCenter(selectedDevice.position);
                // Show route to selected device
                showRouteToDevice(selectedDevice);
            }
        }
    }, [selectedDeviceId, markers]);

    const getMarkerColor = (status) => {
        switch (status) {
            case 'online': return '#00ffff';
            case 'offline': return '#ff4444';
            case 'warning': return '#ff6600';
            default: return '#8b5cf6';
        }
    };

    // Initialize Google Maps services
    const initializeMapServices = (map) => {
        if (window.google && window.google.maps) {
            directionsService.current = new window.google.maps.DirectionsService();
            directionsRenderer.current = new window.google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: '#00ffff',
                    strokeWeight: 4,
                    strokeOpacity: 0.8
                }
            });
            directionsRenderer.current.setMap(map);
        }
    };

    // Show route to device
    const showRouteToDevice = async (deviceMarker) => {
        if (!directionsService.current || !directionsRenderer.current) return;

        try {
            const request = {
                origin: userPosition,
                destination: deviceMarker.position,
                travelMode: window.google.maps.TravelMode.DRIVING,
            };

            directionsService.current.route(request, (result, status) => {
                if (status === 'OK') {
                    directionsRenderer.current.setDirections(result);
                    setRouteDirections(result);
                    setShowRoute(true);

                    // Show toast with route info
                    if (window.showToast) {
                        const route = result.routes[0];
                        const leg = route.legs[0];
                        window.showToast(
                            `Route to ${deviceMarker.title}: ${leg.distance.text}, ${leg.duration.text}`,
                            'info',
                            8000
                        );
                    }
                } else {
                    console.error('Directions request failed due to ' + status);
                    if (window.showToast) {
                        window.showToast('Unable to calculate route to device', 'error');
                    }
                }
            });
        } catch (error) {
            console.error('Error showing route:', error);
        }
    };

    // Clear route
    const clearRoute = () => {
        if (directionsRenderer.current) {
            directionsRenderer.current.setDirections({ routes: [] });
        }
        setRouteDirections(null);
        setShowRoute(false);
    };

    // Center map on user location
    const centerOnUser = () => {
        setMapCenter(userPosition);
        clearRoute();
    };

    // Center map on all devices
    const centerOnDevices = () => {
        if (markers.length === 0) return;

        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(marker => {
            bounds.extend(marker.position);
        });

        // Also include user position
        bounds.extend(userPosition);

        if (mapRef.current) {
            mapRef.current.fitBounds(bounds);
        }
    };

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <div className="h-full w-full relative">
                {loading && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="text-white text-center">
                            <div className="animate-spin w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p>Loading device locations...</p>
                        </div>
                    </div>
                )}

                <Map
                    ref={mapRef}
                    zoom={13}
                    center={mapCenter}
                    styles={darkMapStyles}
                    disableDefaultUI={true}
                    zoomControl={true}
                    mapTypeControl={false}
                    streetViewControl={false}
                    fullscreenControl={false}
                    gestureHandling="greedy"
                    className="rounded-lg"
                    onLoad={initializeMapServices}
                >
                    {/* User location marker */}
                    <AdvancedMarker
                        position={userPosition}
                        title="Your Location"
                    >
                        <motion.div
                            className="relative"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                            <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                        </motion.div>
                    </AdvancedMarker>
                    {markers.map((marker) => (
                        <AdvancedMarker
                            key={marker.id}
                            position={marker.position}
                            onClick={() => setSelectedMarker(marker)}
                        >
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.1 }}
                                animate={{
                                    boxShadow: [
                                        `0 0 10px ${getMarkerColor(marker.status)}`,
                                        `0 0 20px ${getMarkerColor(marker.status)}`,
                                        `0 0 10px ${getMarkerColor(marker.status)}`
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Pin
                                    background={getMarkerColor(marker.status)}
                                    borderColor="#ffffff"
                                    glyphColor="#000000"
                                    scale={1.2}
                                />
                                <motion.div
                                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                                    style={{ backgroundColor: getMarkerColor(marker.status) }}
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </motion.div>
                        </AdvancedMarker>
                    ))}

                    {selectedMarker && (
                        <InfoWindow
                            position={selectedMarker.position}
                            onCloseClick={() => {
                                setSelectedMarker(null);
                                clearRoute();
                            }}
                        >
                            <motion.div
                                className="p-4 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg text-white min-w-[250px]"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-bold text-lg mb-2" style={{ color: getMarkerColor(selectedMarker.status) }}>
                                    {selectedMarker.title}
                                </h3>
                                <div className="space-y-1 text-sm mb-3">
                                    <div className="flex justify-between">
                                        <span className="text-white/70">Status:</span>
                                        <span className={`font-medium ${selectedMarker.status === 'online' ? 'text-green-400' : selectedMarker.status === 'warning' ? 'text-orange-400' : 'text-red-400'}`}>
                                            {selectedMarker.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/70">Last Seen:</span>
                                        <span className="text-white text-xs">{selectedMarker.lastSeen}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/70">Address:</span>
                                        <span className="text-white text-xs max-w-[150px] truncate">{selectedMarker.address}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => showRouteToDevice(selectedMarker)}
                                        className="flex-1 px-3 py-2 bg-neon-cyan/20 border border-neon-cyan/30 text-neon-cyan rounded-lg text-xs hover:bg-neon-cyan/30 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <Navigation className="w-3 h-3" />
                                        Get Directions
                                    </button>
                                    <button
                                        onClick={() => setMapCenter(selectedMarker.position)}
                                        className="px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-xs hover:bg-white/20 transition-colors"
                                    >
                                        <Crosshair className="w-3 h-3" />
                                    </button>
                                </div>
                            </motion.div>
                        </InfoWindow>
                    )}
                </Map>

                {/* Map Controls Overlay */}
                <div className="absolute top-4 right-4 space-y-2">
                    <motion.button
                        className="p-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={centerOnUser}
                        title="Center on your location"
                    >
                        <Crosshair className="w-4 h-4" />
                        <span className="text-xs">My Location</span>
                    </motion.button>

                    <motion.button
                        className="p-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={centerOnDevices}
                        title="Show all devices"
                    >
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs">All Devices</span>
                    </motion.button>

                    {showRoute && (
                        <motion.button
                            className="p-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={clearRoute}
                            title="Clear route"
                        >
                            <Route className="w-4 h-4" />
                            <span className="text-xs">Clear Route</span>
                        </motion.button>
                    )}
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md border border-white/20 rounded-lg p-3 text-white text-xs">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                            <span>Online</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <span>Offline</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                            <span>Warning</span>
                        </div>
                    </div>
                </div>
            </div>
        </APIProvider>
    );
}

export default GoogleMaps;