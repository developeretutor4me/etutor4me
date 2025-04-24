"use client";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useState } from "react";
import Foldericon from "../../../../../public/folder icon with profile badge.svg";
const TaxCountryOptions = [
  { value: "Mathematics", label: "Mathematics" },
  { value: "Algebra", label: "Algebra" },
  { value: "Geometry", label: "Geometry" },
  { value: "Calculus", label: "Calculus" },
  { value: "Trigonometry", label: "Trigonometry" },
  { value: "Statistics", label: "Statistics" },
  { value: "Science", label: "Science" },
  { value: "Biology", label: "Biology" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Physics", label: "Physics" },
  { value: "Environmental Science", label: "Environmental Science" },
  { value: "Earth Science", label: "Earth Science" },
  { value: "English Language Arts", label: "English Language Arts" },
  { value: "Grammar", label: "Grammar" },
  { value: "Literature", label: "Literature" },
  { value: "Writing", label: "Writing" },
  { value: "Reading Comprehension", label: "Reading Comprehension" },
  { value: "Social Studies", label: "Social Studies" },
  {
    value: "History (World, U.S., Ancient)",
    label: "History (World, U.S., Ancient)",
  },
  { value: "Geography", label: "Geography" },
  { value: "Economics", label: "Economics" },
  { value: "Political Science", label: "Political Science" },
  { value: "Foreign Languages", label: "Foreign Languages" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Chinese (Mandarin)", label: "Chinese (Mandarin)" },
  { value: "Japanese", label: "Japanese" },
  { value: "Arabic", label: "Arabic" },
  { value: "Russian", label: "Russian" },
  {
    value: "Specialized & Advanced TaxCountrys",
    label: "Specialized & Advanced TaxCountrys",
  },
  { value: "Advanced Mathematics", label: "Advanced Mathematics" },
  { value: "Differential Equations", label: "Differential Equations" },
  { value: "Linear Algebra", label: "Linear Algebra" },
  { value: "Discrete Math", label: "Discrete Math" },
  {
    value: "Computer Science & Technology",
    label: "Computer Science & Technology",
  },
  {
    value: "Programming (Python, Java, C++)",
    label: "Programming (Python, Java, C++)",
  },
  { value: "Web Development", label: "Web Development" },
  { value: "Data Science", label: "Data Science" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "AI and Machine Learning", label: "AI and Machine Learning" },
  { value: "Business & Economics", label: "Business & Economics" },
  { value: "Accounting", label: "Accounting" },
  { value: "Marketing", label: "Marketing" },
  { value: "Finance", label: "Finance" },
  { value: "Entrepreneurship", label: "Entrepreneurship" },
  {
    value: "Microeconomics/Macroeconomics",
    label: "Microeconomics/Macroeconomics",
  },
];

function MyFiles() {
  const [isTaxCountryDropdownOpen, setIsTaxCountryDropdownOpen] =
    useState(false);
  const [isExpanded, setisExpanded] = useState(false);
  const [selectedTaxCountrys, setSelectedTaxCountrys] = useState("");

  const toggleTaxCountryDropdown = () => {
    setIsTaxCountryDropdownOpen(!isTaxCountryDropdownOpen);
  };

  const handleTaxCountryClick = (TaxCountry: string) => {
    setSelectedTaxCountrys(TaxCountry);
    setIsTaxCountryDropdownOpen(false);
  };
  return (
    <div className="mt-9 px-1 h-full ">
      <div className="bg-[#EDE8FA] rounded-3xl py-7 custom-2xl:py-8 px-6 custom-2xl:px-7 h-full ">
        {/* top header  */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl custom-2xl:text-4xl text-[#685AAD] font-bold pl-9 ">
            My Files
          </h1>

          <div className="flex w-fit gap-14 pt-1 pr-6 items-center ">
            <div className="min-w-[26.7rem]">
              <div className="relative  select-none  w-full">
                <div
                  className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-2.5 rounded-lg cursor-pointer flex justify-between items-center"
                  onClick={toggleTaxCountryDropdown}
                >
                  <span className="my-1">
                    {selectedTaxCountrys.length > 0
                      ? `${selectedTaxCountrys}`
                      : "sort by"}
                  </span>
                  {isTaxCountryDropdownOpen ? (
                    <ChevronUp size={22} className="text-white " />
                  ) : (
                    <ChevronDown size={22} className="text-white " />
                  )}
                </div>

                {isTaxCountryDropdownOpen && (
                  <div
                    onMouseLeave={() => {
                      setIsTaxCountryDropdownOpen(false);
                    }}
                    className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  "
                  >
                    <div
                      id="style-2"
                      className="max-h-[16.4rem] overflow-y-scroll  "
                    >
                      {TaxCountryOptions.map((TaxCountry) => (
                        <div
                          key={TaxCountry.value}
                          className=" py-2 cursor-pointer flex items-center"
                          onClick={() =>
                            handleTaxCountryClick(TaxCountry.value)
                          }
                        >
                          <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 max-w-[80%] truncate">
                            <span className="ml-2 text-xl text-white ">
                              {TaxCountry.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-[26.7rem] relative">
              <input
                type="text"
                className="px-4 py-3.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl placeholder:text-white"
                placeholder="Search by name"
              />
              <Search className="text-white absolute top-1/2 right-6 transform -translate-y-1/2 " />
            </div>
          </div>
        </div>








        <div className="bg-[#B4A5D7] mt-7 rounded-3xl max-h-[389px] h-full px-9 py-7 ">
          <div className=" w-full space-y-6">
            {/* Header Row */}
            <div className="hidden custom-2xl:grid custom-2xl:grid-cols-5 mb-7 text-sm custom-lg text-base:sm:text-xl custom-2xl:pl-32  w-[100%]  text-white">
              <div className="px-4  ">File Name</div>
              <div className="px-4  ">Size</div>
              <div className="px-4  ">Type</div>
              <div className="px-4  ">Date Added</div>
              <div className="px-4  ">Status</div>
            </div>

            {/* Session Card */}

            {/* <div
              className={`w-full  bg-[#7565A4] rounded-lg custom-2xl:pl-9   ${
                isExpanded
                  ? "h-auto custom-2xl:h-fit transition-all duration-1000 ease-out"
                  : "h-auto custom-2xl:h-20 transition-all duration-300 ease-out"
              } overflow-hidden cursor-pointer`}
                onMouseEnter={() =>
                  setisExpanded(true)
                }
                onMouseLeave={() => setisExpanded(false)}
            >
              <div className="flex flex-col  custom-2xl:flex-row custom-2xl:items-start h-full">
                
                <div className="flex-1 p-4 flex flex-col custom-2xl:flex-row items-start custom-2xl:items-center">
                  <div className="grid grid-cols-2 custom-2xl:grid-cols-4 gap-4 w-full">

                    <div className="flex flex-col custom-2xl:block transition-all duration-300 ease-in-out custom-2xl:pt-2">
                      <span className="text-white/60 text-sm custom-2xl:hidden mb-1 text-white">
                        Subject and level
                      </span>
                      <span className="text-white text-base custom-2xl text-base:sm:text-xl  font-medium">
                        hello
                      </span>
                      <div
                        className={`text-white ${
                          isExpanded
                            ? "opacity-100 block transition-all duration-300 ease-in-out"
                            : "opacity-0 hidden transition-all duration-300 ease-in-out"
                        }`}
                      >
                        PAYg session
                      </div>

                        <div
                            className={`text-white mt-4 ${
                            isExpanded
                                ? "opacity-100 block transition-all duration-300 ease-in-out"
                                : "opacity-0 hidden transition-all duration-300 ease-in-out"
                            }`}
                        >
                           
                            <p className="">hello</p>
                        </div>
                    </div>

                  
                    <div className="flex flex-col custom-2xl:block custom-2xl:pt-2">
                      <span className="text-white/60 text-sm custom-2xl:hidden mb-1">
                        eTutor
                      </span>
                      <span className="text-white text-base custom-2xl text-base:sm:text-xl ">
                        hello
                      </span>
                      <div
                        className={` ${
                          isExpanded
                            ? "opacity-100 block transition-all duration-300 ease-in-out"
                            : "opacity-0 hidden transition-all duration-300 ease-in-out "
                        }`}
                      ></div>
                    </div>

                    
                    <div className="flex flex-col custom-2xl:block custom-2xl:pt-2">
                      <span className="text-white/60 text-sm custom-2xl:hidden mb-1">
                        Duration
                      </span>
                      <span className="text-white text-base custom-2xl text-base:sm:text-xl"></span>
                    </div>

                  
                    <div className="flex flex-col custom-2xl:block custom-2xl:pt-2">
                      <span className="text-white/60 text-sm custom-2xl:hidden mb-1">
                        Date and Time
                      </span>
                      <span className="text-white text-base custom-2xl text-base:sm:text-xl">
                        hello
                      </span>
                      <div
                        className={`text-base sm:text-xl text-white ${
                          isExpanded
                            ? "opacity-100 block transition-all duration-300 ease-in-out"
                            : "opacity-0 hidden transition-all duration-300 ease-in-out"
                        }`}
                      >
                        helloo
                      </div>
                    </div>


                  </div>
                </div>

           
                <div
                  className={`flex flex-col custom-2xl:flex-row gap-2  custom-2xl:gap-4  h-full  ${
                    isExpanded ? "py-6 px-4 h-auto custom-2xl:h-28" : "p-4"
                  } custom-2xl:pl-0 `}
                >
                  <button className="w-full  custom-2xl:h-full custom-2xl:w-auto bg-[#655693] text-white px-8 py-2 rounded-md text-sm custom-2xl text-base:sm:text-xl hover:bg-[#5c4c8b] transition-colors">
                    Edit Session
                  </button>
                
                </div>
              </div>
            </div> */}
          </div>
        </div>



        <div className=" mt-10 ">
          <h1 className="text-xl sm:text-2xl custom-2xl:text-4xl text-[#685AAD] font-bold pl-9 ">
            Quick Access
          </h1>
          <div className="bg-[#B4A5D7] mt-9 rounded-3xl max-h-[262px] h-full">
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        #style-2::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #c9bbef;
        }

        #style-2::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }

        #style-2::-webkit-scrollbar-thumb {
          border-radius: 10px;

          background-color: white;
        }
      `}</style>
    </div>
  );
}

export default MyFiles;
