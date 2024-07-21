/* eslint-disable react/prop-types */
import { getUser } from "@/auth/auth";
import { UserModal } from "../../components/modal/usermodal";

const UserProfile = () => {
  const { user } = getUser();

  return (
    <div className="w-full mx-auto pb-12">
      <div className="relative mb-16">
        <div className="h-72 w-full">
          <img src="/userdefaultpic.jpg" className="h-full w-full rounded-t-lg object-cover blur-md" alt="Background" />
        </div>
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          <img src="/userdefaultpic.jpg" className="w-32 h-32 rounded-full border-4 border-white shadow-lg" alt="Profile" />
        </div>
      </div>

      <div className=" shadow rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold ">Personal Info</h1>
          <UserModal />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Name" value={user?.name} />
          <InfoItem label="Email" value={user?.email} />
          <InfoItem label="Contact" value={user?.phone} />
          <InfoItem label="Residential Area" value={user?.addressinfo?.area} />
          <InfoItem label="House No" value={user?.addressinfo?.houseNo} />
          <InfoItem label="Emergency Contact Personel" value={user?.emergencycontact?.name} />
          <InfoItem label="Emergency Contact" value={user?.emergencycontact?.contact} />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="text-blue-500 hover:text-blue-600 font-medium">
          Manage Account
        </button>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-300">{label}</span>
    <span className="mt-1 text-lg text-gray-500">{value || 'N/A'}</span>
  </div>
);

export default UserProfile;