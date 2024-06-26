import { useState, useEffect } from 'react';
import GoogleMaps from "@/components/Maps/GoogleMaps";
import PhoneCards from "@/components/phone/phoneCard";
import { fetchUserDevices } from "@/services/device";
import { getUserId } from "@/auth/auth";

const UserDashboard = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userId = getUserId();
      try {
        const fetchedPhones = await fetchUserDevices(userId);
        console.log('Fetched phones:', fetchedPhones); // Log the fetched data
        setPhones(fetchedPhones);
      } catch (error) {
        console.error('Error fetching phones:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while data is being fetched
  }

  return (
    <>
      <div className="flex gap-5 w-[100%] dashboardContainer">
        <div className="mapcard overflow-hidden shadow-sm shadow-slate-700 h-[600px] p-0 rounded-md">
          <GoogleMaps />
        </div>
        <div className="flex flex-col gap-4 devicecard shadow-sm shadow-slate-700 rounded-md h-[600px] p-2 overflow-auto">
          {phones && phones.length > 0 ? (
            phones.map((phone) => (
              <PhoneCards key={phone._id} Phone={phone} />
            ))
          ) : (
            <p>No phones found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
