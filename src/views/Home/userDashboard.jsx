import GoogleMaps from "@/components/Maps/GoogleMaps";
// import PhoneCards from "@/components/phone/phoneCard";
import PhoneCard from "@/components/phone/phoneCards";

const UserDashboard = () => {
  return (
    <>
      <div className="flex gap-5 w-[100%] dashboardContainer">
        <div className="mapcard overflow-hidden shadow-sm shadow-slate-700 h-[600px] p-0 rounded-md">
          <GoogleMaps />
        </div>
        <div className="flex flex-col gap-4 devicecard shadow-sm shadow-slate-700 rounded-md h-[600px] p-2 overflow-auto">
          <PhoneCard />
        </div>
      </div>
      <br/>
    </>
  );
};

export default UserDashboard;