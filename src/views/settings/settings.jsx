import { FaPalette } from "react-icons/fa";
import { ModeToggle } from "@/components/mode-toggle";
import { CiUser } from "react-icons/ci";

const SettingsPage = () => {

  return (
    <div className="flex flex-col gap-4 settingspage h-screen">
      <h2 className="text-xl font-semibold mb-6">Settings</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaPalette className="text-xl" />
          <span>Dark Mode</span>
        </div>
        <ModeToggle />
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CiUser className="text-xl" />
          <span>Account</span>
        </div>
        <button className="text-blue-500">Manage</button>
      </div>
    </div>
  );
};

export default SettingsPage;
