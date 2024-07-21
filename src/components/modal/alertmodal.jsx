/* eslint-disable react/prop-types */

import { useState,  } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Toast from '@/components/toastmsg';
import { Loader } from "@/components/loader";
import { DeleteUserDevice } from '@/services/device';


const DeviceModal = ({ isOpen, onClose, device, onUpdateSuccess }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isLoading, setIsLoading] = useState(false);

   const triggerToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleDeviceDelete =  async ()=>{
    setIsLoading(true);
    try{
      const responsemsg = await DeleteUserDevice(device._id);
      if (responsemsg){
        triggerToast(`${responsemsg} `, 'success')
        onUpdateSuccess();
        onClose();
      }
    }catch(error){
      triggerToast('Error updating device mode', 'danger')
      console.error('Error updating device mode:', error);
    }finally{
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div>
        {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
        />
      )}
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            device and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeviceDelete} > {isLoading ? <p className="flex items-center gap-2"><Loader size={30}/> Please Wait...</p> : 'Continue'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}

export default DeviceModal;
