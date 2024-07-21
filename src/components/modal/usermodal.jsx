import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUser } from "@/auth/auth";
import Toast from "@/components/toastmsg";
import { Loader } from "@/components/loader";

export function UserModal() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);

  const triggerToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const { user } = getUser();

  const [formData, setFormData] = useState({
    username: user ? user.name : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    area: user ? user.addressinfo.area : "",
    houseNo: user ? user.addressinfo.houseNo : "",
    name: user ? user.emergencycontact.name : "",
    contact: user ? user.emergencycontact.contact : "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowToast(false);
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        triggerToast("Network response was not ok", "danger");
        throw new Error("");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      triggerToast(`${data.message || "Account login successful"} `, "success");

      // Handle successful response
      console.log("Profile updated successfully:", data);
    } catch (error) {
      triggerToast("Error updating profile", "danger");

      // Handle error
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      {showToast && <Toast message={toastMessage} type={toastType} />}
      <DialogContent className="sm:max-w-[60%]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.username}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="area" className="text-right">
                Area of Residence
              </Label>
              <Input
                id="area"
                value={formData.area}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="houseNo" className="text-right">
                Hse No
              </Label>
              <Input
                id="houseNo"
                value={formData.houseNo}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="emergencyContactName" className="text-right">
                Emergency Contact Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="emergencyContact" className="text-right">
                Contact
              </Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="w-full ">
            <Button
            variant="outline"
            disabled={loading}
             type="submit" 
             className="w-full">
              {loading ? (
                <p className="flex items-center gap-2">
                  <Loader size={30} /> Loading...
                </p>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
