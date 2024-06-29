import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Button } from "@/components/ui/button";
  import { useState, useEffect } from "react";
  import { fetchUserDevices } from "@/services/device";
  import { getUserId } from "@/auth/auth";
  import { fetchDevicesLocations } from "@/services/locations";
  
  const LocationsTable = () => {
    const [phones, setPhones] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [locationsPerPage] = useState(10);
  
    useEffect(() => {
      const fetchData = async () => {
        const userId = getUserId();
        const fetchedPhones = await fetchUserDevices(userId);
        setPhones(fetchedPhones);
      };
  
      fetchData();
    }, []);
  
    const handleDeviceSelect = async (deviceId) => {
      const fetchedLocations = await fetchDevicesLocations(deviceId);
      setLocations(fetchedLocations);
      setCurrentPage(1);
    };
  
    // Pagination logic
    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);
  
    const totalPages = Math.ceil(locations.length / locationsPerPage);
  
    return (
      <div className="flex flex-col w-full gap-2">
        <div className="w-1/2">
          <Select onValueChange={handleDeviceSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a device" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Devices</SelectLabel>
                {phones.length > 0 ? (
                  phones.map((phone) => (
                    <SelectItem value={phone._id} key={phone._id}>
                      {phone.devicename}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled>No devices found</SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Table>
            <TableCaption>A list of your device’s recent locations.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6">S/N</TableHead>
                <TableHead className="w-1/4">Longitude</TableHead>
                <TableHead className="w-1/4">Latitude</TableHead>
                <TableHead className="w-1/3">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLocations.length > 0 ? (
                currentLocations.map((location, index) => (
                  <TableRow key={index}>
                    <TableCell>{indexOfFirstLocation + index + 1}</TableCell>
                    <TableCell>{location.longitude}</TableCell>
                    <TableCell>{location.latitude}</TableCell>
                    <TableCell>{new Date(location.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No locations available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-around items-center mt-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LocationsTable;
  