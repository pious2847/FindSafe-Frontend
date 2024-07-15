import { getUser } from "@/auth/auth";
import { UserModal } from "../auth/usermodal";

const UserProfile = () => {
  const { user } = getUser();

  return (
    <>
      <div className="flex flex-col gap-10">
        {/* Profile Image Section */}
        <div className="profileimg relative flex">
          <div className="h-[450px] w-full" id="maincardimg">
            <img
              src="/userdefaultpic.jpg"
              className="h-full w-full rounded-lg object-cover blur-md"
              alt="Main Profile"
            />
          </div>
          <div className="h-[45%] w-[45%] absolute bottom-[-40px] left-1">
            <img
              src="/userdefaultpic.jpg"
              className="cardsubimg rounded-full shadow-lg"
              alt="Sub Profile"
            />
          </div>
        </div>
    <br />
        {/* Personal Info Section */}
        <div className="profilecard p-6 rounded-lg shadow-md">
          <div className="header mb-4">
            <h1 className="headr text-xl font-semibold text-gray-700 border-b pb-2">Personal Info</h1>
          </div>
          <div className="info flex flex-col gap-2">
            <div className="flex items-center">
              <h2 className="font-medium text-gray-600">Name:</h2>
              <p className="ml-2 text-gray-800">{user ? user.name : 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <h2 className="font-medium text-gray-600">Email:</h2>
              <p className="ml-2 text-gray-800">{user ? user.email : 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <h2 className="font-medium text-gray-600">Contact:</h2>
              <p className="ml-2 text-gray-800">{user ? user.phone : 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <h2 className="font-medium text-gray-600">Residential Area:</h2>
              <p className="ml-2 text-gray-800">{user ? user.addressinfo.area : 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <h2 className="font-medium text-gray-600">Hse No:</h2>
              <p className="ml-2 text-gray-800">{user ? user.addressinfo.houseNo : 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <h2 className="font-medium text-gray-600">Emergency Contact Name:</h2>
              <p className="ml-2 text-gray-800">{user ? user.emergencycontact.name : 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <h2 className="font-medium text-gray-600">Emergency Contact:</h2>
              <p className="ml-2 text-gray-800">{user ? user.emergencycontact.contact : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Manage Account Section */}
        <div className="flex items-center gap-4 h-[40px] px-5">
          <h2 className="text-blue-500 cursor-pointer">Manage Account</h2>
          <UserModal />
        </div>
      </div>
    </>
  );
}

export default UserProfile;
