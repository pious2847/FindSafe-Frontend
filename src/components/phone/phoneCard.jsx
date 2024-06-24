/* eslint-disable react/prop-types */
import { useState } from "react";
import { useCollapse } from "react-collapsed";
import { BsSoundwave } from "react-icons/bs";
import { GrSecure } from "react-icons/gr";
import { IoMapOutline } from "react-icons/io5";
import { Button } from "../ui/button";

const PhoneCards = ({Phone}) => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  function handleOnClick() {
    setExpanded(!isExpanded);
  }

    // Add this console log to verify the props
    console.log('Phone prop:', Phone);

    
  return (
    <div className="collapsible">
      <div
        className="header shadow-sm shadow-slate-400 rounded-md"
        {...getToggleProps({ onClick: handleOnClick })}
      >
        <div className="flex gap-3 w-[100%] p-2 ">
          <img
            src={Phone.image}
            alt=""
            className="h-[45px] w-[45px] rounded-3xl shadow-xl"
          />
          <div>
            <h4>{Phone.devicename}</h4>
            <p className="text-[12px]">{Phone.mode}</p>
          </div>
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content p-4 flex flex-col gap-1">
          <Button className="devicetriggersbtn flex gap-3 text-left justify-start " >
          <BsSoundwave/> 
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
      </div>
    </div>
  );
};

export default PhoneCards;
