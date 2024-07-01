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
  import { fetchDeviceLocationsWithNames } from "@/services/locations";
  import { Skeleton } from "@/components/ui/skeleton"

  const LocationsTable = () => {
    const [phones, setPhones] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isloading, setIsLoading] = useState(false);
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
      setIsLoading(true)
      const fetchedLocations = await fetchDeviceLocationsWithNames(deviceId);
      console.log('Fetched Locations', fetchedLocations)
      setLocations(fetchedLocations);
      setCurrentPage(1);
    };
  
    // Pagination logic
    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);
  
    const totalPages = Math.ceil(locations.length / locationsPerPage);
  
    return (
      <div className="flex flex-col w-full gap-4">
        <div >
          <Select onValueChange={handleDeviceSelect}>
            <SelectTrigger className="w-[40%] ">
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
            <TableCaption>Select device’s for recent locations.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/12">S/N</TableHead>
                <TableHead className="w-1/5">City/Region</TableHead>
                <TableHead className="w-1/5">Last Seen</TableHead>
                <TableHead className="w-1/6">Longitude</TableHead>
                <TableHead className="w-1/6">Latitude</TableHead>
                <TableHead className="w-1/3">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLocations.length > 0 ? (
                currentLocations.map((location, index) => (
                  <TableRow key={index}>
                    <TableCell>{indexOfFirstLocation + index + 1}</TableCell>
                    <TableCell>{location.name}</TableCell>
                    <TableCell>{location.lastseen}</TableCell>
                    <TableCell>{location.longitude}</TableCell>
                    <TableCell>{location.latitude}</TableCell>
                    <TableCell>{new Date(location.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell >
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell >
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell >
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell >
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell >
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
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
  