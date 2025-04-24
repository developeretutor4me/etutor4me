"use client";
import React, { useState } from "react";
import FormHeading from "../../ETutorSignup/components/FormHeading";
import InputHeading from "../../ETutorSignup/components/InputHeading";
import Image from "next/image";
import dropdown from "../../../../public/assets/icons/downarrow.svg";
import uparrow from "../../../../public/assets/icons/uparrow.svg";
import ContinueBtn from "@/app/ETutorSignup/components/ContinueBtn";
import ConfirmBtn from "@/app/ParentSignup/Components/ConfirmBtn";





const ContactInformation = ({ NextStep }:any) => {
  const [country, setCountry] = useState(""); // State for selected country
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [Zip, setZip] = useState("")
  const [email, setemail] = useState("")









  const countries = ["USA", "Canada", "UK", "Australia"]; 





  const handleCountrySelect = (selectedCountry:any) => {
    setCountry(selectedCountry); // Update the selected country
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown open/close
  };
  return (
    <div className="bg-questionbg p-14 rounded-[30px]">
      <FormHeading
        className=""
        heading="Contact Information"
        paragraph="Thank you for your interest in becoming an etutor! Complete this application and take the next step 
toward empowering learners."
      />
      <form className="pt-12 pr-10 flex flex-col gap-10" action="">
      <div>
      <InputHeading text="Select a Country" />
      <div className="relative w-1/2 flex justify-center items-center">
        <div
          className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
          onClick={toggleDropdown}
        >
          <button className="bg-purpleBtn focus:outline-none text-darkpurple">
            {country ? country : "Select a country"} {/* Show selected country */}
          </button>
          {isDropdownOpen ? (
            <Image  loading="lazy"  src={uparrow} alt="dropdown" />
          ) : (
            <Image  loading="lazy"  src={dropdown} alt="uparrow" />
          )}
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-purple">
            <div className="py-4 px-10">
              {countries.map((subject) => (
                <div
                  key={subject}
                  className="flex items-center p-2 text-darkBlue border-b px-5 py-2 text-2xl border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
                  onClick={() => handleCountrySelect(subject)} // Handle country selection
                >
                  <span>{subject}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
        <div className="w-full flex">
          <div className="w-1/2">
            <InputHeading text="First Name" />
            <div className="rounded-full bg-purpleBtn px-10 py-4 w-4/5">
              <input
                type="text"
                className="placeholder-darkpurple text-2xl text-[#685AAD] placeholder:text-[22px] w-full bg-transparent outline-none mb:text-xs"
                placeholder="First Name"
                value={firstname}
                onChange={(e)=>{setFirstname(e.target.value)}}
              />
            </div>
          </div>
          <div className="w-1/2">
            <InputHeading text="Last Name" />
            <div className="rounded-full bg-purpleBtn px-10 py-4 w-4/5">
              <input
                type="text"
                className="placeholder-darkpurple placeholder:text-[22px] text-2xl text-[#685AAD]  w-full bg-transparent outline-none mb:text-xs"
                placeholder="Last Name"
                value={lastname}
                onChange={(e)=>{setLastname(e.target.value)}}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/2">
            <InputHeading text="Zip Name" />
            <div className="rounded-full bg-purpleBtn px-10 py-4 w-4/5">
              <input
                type="text"
                className="placeholder-darkpurple text-2xl text-[#685AAD] placeholder:text-[22px] w-full bg-transparent outline-none mb:text-xs"
                placeholder="Zip Code"
                value={Zip}
                onChange={(e)=>{setZip(e.target.value)}}
              />
            </div>
            <div className=" w-4/5">
              <ConfirmBtn
                btnName="Continue"
                className="text-3xl font-medium"
                onClick={NextStep}
              />
            </div>
          </div>
          <div className="w-1/2">
            <InputHeading text="Email" />
            <div className="rounded-full bg-purpleBtn px-10 py-4 w-4/5">
              <input
                type="email"
                required
                className="placeholder-darkpurple text-2xl text-[#685AAD] placeholder:text-[22px] w-full bg-transparent outline-none mb:text-xs"
                placeholder="Email"
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactInformation;
function setSelectedOptions(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}

