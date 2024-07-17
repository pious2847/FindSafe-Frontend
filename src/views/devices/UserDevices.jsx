import DevicesCardPage from "@/components/phone/DevicesCard";

const UserDevices = () => {
    return (  
        <>
        <div className="container w-full flex flex-col gap-3">
        <h2 className="text-xl font-semibold mb-6">Devices</h2>
        <DevicesCardPage />
        </div>
        </>
    );
}
 
export default UserDevices;