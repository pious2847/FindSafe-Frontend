import { useState, useRef } from "react";
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
import { Camera, Upload, X, User, Mail, Phone, MapPin, Home, Users } from "lucide-react";
import { motion } from "framer-motion";

export function UserModal() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);

  const triggerToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const { user } = getUser();

  const [formData, setFormData] = useState({
    username: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    area: user?.addressinfo?.area || "",
    houseNo: user?.addressinfo?.houseNo || "",
    emergencyContactName: user?.emergencycontact?.name || "",
    emergencyContact: user?.emergencycontact?.contact || "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        triggerToast('Please select a valid image file', 'danger');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        triggerToast('Image size should be less than 5MB', 'danger');
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/upload-profile-picture/${user._id}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      triggerToast('Profile picture updated successfully!', 'success');

      // Update user data in localStorage
      const updatedUser = { ...user, profilePicture: data.profilePicture };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Reset image states
      setSelectedFile(null);
      setPreviewImage(null);

      // Refresh page to show new image
      window.location.reload();

    } catch (error) {
      console.error('Error uploading image:', error);
      triggerToast('Failed to upload image. Please try again.', 'danger');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeSelectedImage = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowToast(false);
    setLoading(true);

    try {
      // Prepare the data in the format expected by the backend
      const updateData = {
        username: formData.username,
        phone: formData.phone,
        addressinfo: {
          area: formData.area,
          houseNo: formData.houseNo,
        },
        emergencycontact: {
          name: formData.emergencyContactName,
          contact: formData.emergencyContact,
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        triggerToast(errorData.message || "Failed to update profile", "danger");
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();

      // Update localStorage with new token and user data
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      triggerToast(data.message || "Profile updated successfully!", "success");

      // Close modal after successful update
      setTimeout(() => {
        setIsOpen(false);
        window.location.reload(); // Refresh to show updated data
      }, 1500);

    } catch (error) {
      triggerToast("Error updating profile. Please try again.", "danger");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border-neon-cyan/30 text-white hover:bg-neon-cyan/30 transition-all duration-300">
          <User className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      {showToast && <Toast message={toastMessage} type={toastType} />}
      <DialogContent className="sm:max-w-[700px] bg-black/90 border-neon-cyan/30 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-neon-cyan">Edit Profile</DialogTitle>
            <DialogDescription className="text-white/70">
              Update your profile information and upload a new profile picture.
            </DialogDescription>
          </DialogHeader>

          {/* Profile Picture Section */}
          <div className="py-6 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-neon-purple" />
              Profile Picture
            </h3>
            <div className="flex items-center gap-6">
              {/* Current/Preview Image */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-2 border-neon-cyan/50 overflow-hidden bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20">
                  <img
                    src={previewImage || user?.profilePicture || '/default-avatar.png'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/default-avatar.png';
                    }}
                  />
                </div>
                {previewImage && (
                  <button
                    type="button"
                    onClick={removeSelectedImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    disabled={uploadingImage}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>

                  {selectedFile && (
                    <Button
                      type="button"
                      onClick={handleImageUpload}
                      disabled={uploadingImage}
                      className="bg-neon-green/20 border-neon-green/30 text-neon-green hover:bg-neon-green/30 ml-2"
                    >
                      {uploadingImage ? (
                        <>
                          <Loader size={16} className="mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4 mr-2" />
                          Upload
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <p className="text-xs text-white/50 mt-2">
                  Supported formats: JPG, PNG, GIF. Max size: 5MB
                </p>
              </div>
            </div>
          </div>
          {/* Personal Information Section */}
          <div className="py-6 space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-neon-cyan" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white/80 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-neon-cyan/50"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-neon-cyan/50"
                  placeholder="Enter your email"
                  disabled
                />
                <p className="text-xs text-white/50">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/80 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-neon-cyan/50"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Address Information */}
            <h4 className="text-md font-semibold text-white mt-6 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neon-purple" />
              Address Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="area" className="text-white/80 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Area of Residence
                </Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-neon-cyan/50"
                  placeholder="Enter your area"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="houseNo" className="text-white/80 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  House Number
                </Label>
                <Input
                  id="houseNo"
                  value={formData.houseNo}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-neon-cyan/50"
                  placeholder="Enter house number"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <h4 className="text-md font-semibold text-white mt-6 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-neon-green" />
              Emergency Contact
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName" className="text-white/80 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Contact Name
                </Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-neon-cyan/50"
                  placeholder="Emergency contact name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-white/80 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Number
                </Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-neon-cyan/50"
                  placeholder="Emergency contact number"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="pt-6 border-t border-white/10">
            <div className="flex gap-3 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                disabled={loading || uploadingImage}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || uploadingImage}
                className="flex-1 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border-neon-cyan/30 text-white hover:from-neon-cyan/30 hover:to-neon-purple/30 transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader size={16} />
                    Updating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Save Changes
                  </div>
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
