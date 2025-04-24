"use client";
import React, { useState } from "react";
import FormHeading from "../FormHeading";
import InputHeading from "../InputHeading";
import Image from "next/image";
import dropdown from "../../../../../public/assets/icons/purplearrowdown.svg";
import uparrow from "../../../../../public/assets/icons/uparrow.svg";
import ContinueBtn from "@/app/ETutorSignup/components/ContinueBtn";
import ConfirmBtn from "@/app/ParentSignup/Components/ConfirmBtn";

const Education = ({ NextStep }: any) => {
  
  const [isVisibleedu, setisVisibleedu] = useState(false);
  const [majoredu, setmajoredu] = useState(false); // Dropdown toggle state
  const [selectedmajoredu, setSelectedmajoredu] = useState(""); // State for selected majoredu
  const [isDropdownOpenedu, setisDropdownOpenedu] = useState(false); // Dropdown toggle state
  const [selectedYearedu, setselectedYearedu] = useState(""); // State for selected year
  const graduationYears = ["2022", "2023", "2024", "2025"];
  
  const [degree, setDegree] = useState(false); // Dropdown toggle state
  const [selectedDegree, setSelectedDegree] = useState(""); // State for selected degree
  
  const subjects = ["Computer Science", "Engineering", "Business", "Psychology"];
  const degrees = ["Bachelors", "Masters", "PhD", "Associate"];

  const handleDegreeSelect = (subject:any) => {
    setSelectedDegree(subject); // Set selected degree
    setDegree(false); // Close dropdown after selection
  };

  const toggleDropdownedu = (e:any) => {
    e.preventDefault();
    setDegree(!degree); // Toggle dropdown
  };

  const toggleDropdownedumajoredu = (e:any) => {
    e.preventDefault(); // Prevent default behavior
    setmajoredu(!majoredu); // Toggle dropdown
  };

  const handlemajoreduSelect = (subject:any) => {
    setSelectedmajoredu(subject); // Set the selected majoredu
    setmajoredu(false); // Close the dropdown
  };



  const toggleDropdownedugraduationyear = (e:any) => {
    e.preventDefault(); // Prevent default behavior (if needed)
    setisDropdownOpenedu(!isDropdownOpenedu); // Toggle the dropdown
  };

  const handleYearSelect = (year:any) => {
    setselectedYearedu(year); // Set the selected year
    setisDropdownOpenedu(false); // Close the dropdown
  };
  return (
    <div className="bg-questionbg p-14 rounded-[30px]">
      <FormHeading
        className=""
        heading="Education"
        paragraph="Tutors are required to be enrolled in or have a graduation from a four-year college program "
      />
      <form className="pt-12 pr-10 flex flex-col gap-10" action="">
        <div className="w-full flex justify-between">


          <div className="w-[45%]">
            <InputHeading text="University/College " />
            <div className="rounded-full bg-purpleBtn px-10 py-4 ">
              <input
                type="text"
                className="placeholder-darkpurple text-2xl text-[#685AAD] placeholder:text-[22px] w-full bg-transparent outline-none mb:text-xs placeholder:text-[#AD9DDE]"
                placeholder="Search for your school"
              />
            </div>
          </div>


          <div className="w-[45%]">
            <InputHeading text="Degree" />
            <div className="relative w-full flex justify-center items-center">
              <div
                className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
                onClick={toggleDropdownedu}
              >
                <button className="bg-purpleBtn focus:outline-none text-[#AD9DDE]">
                  {selectedDegree ? selectedDegree : "Select a degree"}{" "}
                  {/* Display selected degree */}
                </button>
                {degree ? (
                  <Image  loading="lazy"  src={uparrow} alt="dropdown" />
                ) : (
                  <Image  loading="lazy"  src={dropdown} alt="uparrow" />
                )}
              </div>

              {degree && (
                <div className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-purple">
                  <div className="py-4 px-10">
                    {degrees.map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center p-2 text-darkBlue border-b px-5 py-2 text-2xl border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
                        onClick={() => handleDegreeSelect(subject)} // Set degree and close dropdown
                      >
                        <span>{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className='w-1/2'>

          <InputHeading text='Last Name' />
          <div className='rounded-full bg-purpleBtn px-10 py-4 w-4/5'>
  <input type="text" 
         className='placeholder-darkpurple placeholder:text-[22px] text-2xl text-[#685AAD]  w-full bg-transparent outline-none mb:text-xs' 
         placeholder='Last Name' />
</div>

            </div> */}
        </div>
        <div className="w-full flex justify-between">
        <div className="w-[45%]">
      <InputHeading text="majoredu" />
      <div className="relative w-full flex justify-center items-center">
        <div
          className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-[#AD9DDE] text-2xl mb:text-sm"
          onClick={toggleDropdownedumajoredu}
        >
          <button className="bg-purpleBtn focus:outline-none text-[#AD9DDE]">
            {selectedmajoredu ? selectedmajoredu : "Select"} {/* Show selected majoredu */}
          </button>
          {majoredu ? (
            <Image  loading="lazy"  src={uparrow} alt="dropdown" />
          ) : (
            <Image  loading="lazy"  src={dropdown} alt="uparrow" />
          )}
        </div>

        {majoredu && (
          <div className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-purple">
            <div className="py-4 px-10">
              {subjects.map((subject) => (
                <div
                  key={subject}
                  className="flex items-center p-2 text-darkBlue border-b px-5 py-2 text-2xl border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
                  onClick={() => handlemajoreduSelect(subject)} // Set majoredu and close dropdown
                >
                  <span>{subject}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>



    <div className="w-[45%]">
      <InputHeading text="Graduation Year" />
      <div className="relative w-full flex justify-center items-center">
        <div
          className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
          onClick={toggleDropdownedugraduationyear}
        >
          <button className="bg-purpleBtn focus:outline-none text-[#AD9DDE]">
            {selectedYearedu ? selectedYearedu : "Select a graduation year"} {/* Display selected year */}
          </button>
          {isDropdownOpenedu ? (
            <Image  loading="lazy"  src={uparrow} alt="dropdown" />
          ) : (
            <Image  loading="lazy"  src={dropdown} alt="uparrow" />
          )}
        </div>

        {isDropdownOpenedu && (
          <div className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-purple">
            <div className="py-4 px-10">
              {graduationYears.map((year) => (
                <div
                  key={year}
                  className="flex items-center p-2 text-darkBlue border-b px-5 py-2 text-2xl border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
                  onClick={() => handleYearSelect(year)} // Set selected year and close dropdown
                >
                  <span>{year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>



        </div>
        <div>
          <div className="" onClick={() => setisVisibleedu(true)}>
            <InputHeading
              text="+ Add School "
              className={`!text-[#AE92F9] cursor-pointer !text-4xl ${
                isVisibleedu ? "!text-[#8653FF]" : "!text-[#AE92F9]"
              }`}
            />
          </div>
          {isVisibleedu && (
            <div className="w-[45%]">
              <div className="rounded-full bg-purpleBtn px-10 py-4">
                <input
                  type="text"
                  className="placeholder-darkpurple text-2xl text-[#685AAD] placeholder:text-[22px] w-full bg-transparent outline-none mb:text-xs placeholder:text-[#AD9DDE]"
                  placeholder="Text"
                />
              </div>
            </div>
          )}
          <div>
            <div className=" w-[42%]">
              <ConfirmBtn
                btnName="Continue"
                className="text-3xl font-medium"
                onClick={NextStep}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Education;
