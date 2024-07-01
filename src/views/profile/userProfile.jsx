import { getUser } from "@/auth/auth";
import { UserModal } from "../auth/usermodal";

const UserProfile = () => {
  const { user } = getUser();

    return ( 
        <>
        <div className="flex flex-col  gap-10">
            <div className="profileimg relative flex ">
                <div className="h-[450px] w-[100%]" id="maincardimg">
                    <img src="/userdefaultpic.jpg" className="h-[450px] w-[100%] rounded-lg object-cover blur-md" />
                </div>
                <div className="h-[45% w-[45%] absolute bottom-[-40px] left-1 ">
                    <img src="/userdefaultpic.jpg" className=" cardsubimg rounded-full shadow-lg" />
                </div>
            </div>
            <p></p>
            <div className="profilecard flex flex-col gap-3 px-5">
                <div className="header">
                    <h1 className="headr text-lg">Personal Info</h1>
                </div>
                <div className="info flex flex-col gap-1">
                    <h2>Name : {user? user.name: null} </h2>
                    <h2>Email : {user? user.email: null} </h2>
                    <h2>Contact : {user? user.phone: null} </h2>
                    <h2>Residential Area : {user? user.addressinfo.area: null} </h2>
                    <h2>Hse No : {user? user.addressinfo.houseNo: null} </h2>
                    <h2>Emergency  : {user? user.emergencycontact.name: null} </h2>
                    <h2>Emergency  : {user? user.emergencycontact.contact: null} </h2>
                </div>
            </div>
            <div className="flex items-center gap-4  h-[40px] px-5"> 
                <h2 className="text-blue-500">Manage Account</h2>
                <UserModal/>
            </div>
        </div>
        </>
     );
}
 
export default UserProfile;