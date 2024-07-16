/* eslint-disable react/prop-types */
import { FaPalette, FaUser, FaBell, FaLock, FaQuestionCircle } from "react-icons/fa";
import { ModeToggle } from "@/components/mode-toggle";
import { UserModal } from "../auth/usermodal";

const SettingsPage = () => {
  return (
    <div className="w-full mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="bg-card rounded-lg shadow-md overflow-hidden">
        <SettingItem
          icon={<FaPalette className="text-xl" />}
          title="Appearance"
          description="Toggle dark mode"
          action={<ModeToggle />}
        />
        
        <SettingItem
          icon={<FaUser className="text-xl" />}
          title="Account"
          description="Manage your account details"
          action={<UserModal />}
        />
        
        <SettingItem
          icon={<FaBell className="text-xl" />}
          title="Notifications"
          description="Configure your notification preferences"
          action={<button className="text-primary hover:underline">Manage</button>}
        />
        
        <SettingItem
          icon={<FaLock className="text-xl" />}
          title="Privacy"
          description="Control your privacy settings"
          action={<button className="text-primary hover:underline">Adjust</button>}
        />
        
        <SettingItem
          icon={<FaQuestionCircle className="text-xl" />}
          title="Help & Support"
          description="Get assistance or report an issue"
          action={<button className="text-primary hover:underline">Contact</button>}
        />
      </div>
    </div>
  );
};

const SettingItem = ({ icon, title, description, action }) => (
  <div className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
    <div className="flex items-center space-x-4">
      <div className="text-primary">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <div className="relative">{action}</div>
  </div>
);

export default SettingsPage;