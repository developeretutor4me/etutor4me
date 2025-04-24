"use client";
import React, { useState } from "react";
import tick from "../../../../public/assets/icons/tickicon.svg";
import Image from "next/image";






const CheckboxInput = ({ label, className,id }: any) => {
  const [clicked, setClicked] = useState(false);

  const handleChange = () => {
    setClicked(!clicked);
  };

  return (
    <div className={`${className} flex items-center py-6 relative`}>
      <div className="relative flex items-center justify-center w-7 h-7">
        <input
          type="checkbox"
          id={id}
          checked={clicked}
          onChange={handleChange}
          className="absolute w-7 h-7 opacity-0 cursor-pointer hover:!bg-darkBlue"
        />
        <div
          className={` ${!className} w-7 h-7 border-[3px] border-[#685AAD] rounded-md flex items-center justify-center ${
            clicked ? "bg-[#685AAD]" : "bg-transparent "
          }`}
        >
          {clicked && <Image  loading="lazy"  src={tick} alt="Tick" className="w-10 h-10" />}
        </div>
      </div>
      <label className="text-[#685AAD] text-2xl pl-6" htmlFor="checkbox">
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
