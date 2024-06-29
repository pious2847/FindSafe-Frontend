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

const PhoneCard = () => {
    const [phones, setPhones] = useState([]);

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
        <Accordion type="single" collapsible key={phone._id}>
        <AccordionItem value={`item-${index}`}>
          <AccordionTrigger>
          <div className="flex gap-3 w-[100%] p-2">
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
            <Button className="devicetriggersbtn flex gap-3 text-left justify-start">
              <BsSoundwave />
              <p className="text-sm">Play Alarm</p>
            </Button>
            <Button className="devicetriggersbtn flex gap-3 text-left justify-start">
              <GrSecure />
              <p className="text-sm">Secure Device</p>
            </Button>
            <Button className="devicetriggersbtn flex gap-3 text-left justify-start">
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
