/* eslint-disable no-unused-vars */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from 'react';
import { BsSoundwave } from "react-icons/bs";
import { GrSecure } from "react-icons/gr";
import { IoMapOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { fetchUserDevices } from "@/services/device";
import { getUserId } from "@/auth/auth";
import { useWebSocketCommand } from "@/services/websocketUtils";

const PhoneCard = () => {
    const [phones, setPhones] = useState([]);
    const { sendCommandToDevice, readyState,lastMessage } = useWebSocketCommand();

    const handleSendCommand = (deviceId) => {
      if (readyState === WebSocket.OPEN) {
        sendCommandToDevice(deviceId, 'play_alarm');
      } else {
        console.log('WebSocket is not connected');
        // Provide user feedback that the connection is not ready
      }
    };
    useEffect(() => {
      if (lastMessage !== null) {
        // Handle incoming messages
        console.log('Received message:', lastMessage.data);
      }
    }, [lastMessage]);

    useEffect(() => {
      const fetchData = async () => {
        const userId = getUserId();
        const fetchedPhones = await fetchUserDevices(userId);
        setPhones(fetchedPhones);
      };
  
      fetchData();
    }, []); 
    

  return (
  <>
  {phones && phones.length > 0 ?
  (
    phones.map((phone, index) => (
        <Accordion type="single" collapsible key={phone._id} className="header shadow-sm shadow-slate-400 rounded-md px-1">
        <AccordionItem value={`item-${index}`}>
          <AccordionTrigger>  
          <div className="flex gap-3 w-[100%] p-2 text-left">
            <img
              src={phone.image}
              alt=""
              className="h-[45px] w-[45px] rounded-3xl shadow-xl"
            />
            <div>
              <h4>{phone.devicename}</h4>
              <p className="text-[12px]">{phone.mode}</p>
            </div>
          </div>
            </AccordionTrigger>
          <AccordionContent>
          <div className="content p-4 flex flex-col gap-1">
            <div>
            <Button className="devicetriggersbtn flex gap-3 text-left justify-start" variant="link" onClick={()=> handleSendCommand(phone._id)} >
              <BsSoundwave />
              <p className="text-sm">Play Alarm</p>
            </Button>
            </div>

            <Button className="devicetriggersbtn flex gap-3 text-left justify-start" variant="link">
              <GrSecure />
              <p className="text-sm">Secure Device</p>
            </Button>
            <Button className="devicetriggersbtn flex gap-3 text-left justify-start" variant="link">
              <IoMapOutline />
              <p className="text-sm">Locate Device</p>
            </Button>
          </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ))
  ):(<p>No phones found Please wait</p>)}
  
  </>
   
  );
};

export default PhoneCard;
