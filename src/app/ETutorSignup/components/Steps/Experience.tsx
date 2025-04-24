"use client";
import React, { useState } from "react";
import FormHeading from "../FormHeading";
import ConfirmBtn from "@/app/ParentSignup/Components/ConfirmBtn";
import RadioInput from "../RadioInput";
import CheckboxInput from "../CheckboxInput";
import Dropdown from "@/components/Dropdonw";
// import DaysHeading from "@/components/DaysHeading";
import tick from "../../../../../public/assets/icons/tickicon.svg";
import DaysOfWeek from "../DaysOfWeek";
import Image from "next/image";
import DayRow from "../DayRow";

const ExperienceQuestions = ({ question, className, span }: any) => {
  return (
    <div>
      <h2
        className={`${className} text-[#534988] py-5 text-[26px] font-medium `}
      >
        {question} <span className="!font-light">{span}</span>
      </h2>
    </div>
  );
};

const Experience = ({ NextStep }: any) => {
  const [hasTutoringExperience, setHasTutoringExperience] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedLevelsexp, setselectedLevelsexp] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedInstructionsexp, setselectedInstructionsexp] = useState<string[]>([]);
  const [startDateexp, setstartDateexp] = useState("");
  const [selectedHoursexp, setselectedHoursexp] = useState("");
  const [availabilityexp, setavailabilityexp] = useState<Record<string, string[]>>({});
  const [classroomteachingexp, setclassroomteachingexp] = useState("")


  const handleTimeSlotChange = (day: string, timeSlot: string) => {
    setavailabilityexp((prev) => {
        const currentDaySlots = prev[day] || [];
        if (currentDaySlots.includes(timeSlot)) {
            // If the time slot is already selected, remove it
            return { ...prev, [day]: currentDaySlots.filter(slot => slot !== timeSlot) };
        } else {
            // Otherwise, add the time slot
            return { ...prev, [day]: [...currentDaySlots, timeSlot] };
        }
    });
};

  // Function to handle the change of the radio input
  const handleHoursChange = (value: string) => {
    setselectedHoursexp(value); // Update the state with the selected value
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setstartDateexp(e.target.value); // Update the state with the selected date
  };

  const levels = [
    "Pre-Kindergarten",
    "Kindergarten-2nd grade",
    "3rd-5th Grade",
    "Middle School",
    "High School",
    "College",
    "Graduate",
    "Adult",
  ];

  const handleCheckboxChange = (level: string) => {
    setselectedLevelsexp(
      (prevSelected) =>
        prevSelected.includes(level)
          ? prevSelected.filter((item) => item !== level) // Remove if already selected
          : [...prevSelected, level] // Add if not selected
    );
  };

  const languages = ["English", "Spanish", "French", "German"];
  const subjects = ["Math", "Science", "Arts", "History"];
  const timeSlots = ["Morning", "Afternoon", "Evening"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const handleLanguageSelect = (selectedLanguages: string[]) => {
  };

  const handleSubjectSelect = (selectedSubjects: string[]) => {
  };

  const handleRadioChange = (value: any) => {
    setHasTutoringExperience(value);
  };

  const handleCheckboxChangenumberofstudents = (label: string) => {
    setselectedInstructionsexp(
      (prev) =>
        prev.includes(label)
          ? prev.filter((item) => item !== label) // Remove if already selected
          : [...prev, label] // Add if not selected
    );
  };
  return (
    <div className="bg-questionbg p-14 rounded-[40px]">
      <FormHeading
        className=""
        heading="Teaching & Tutoring"
        paragraph="Previous experience is not requirement. Experts with a variety of background have been successful on our 
platform."
      />
      <form className="pt-12 pr-10 flex flex-col " action="">
        <div>
          <ExperienceQuestions question="Do you have tutoring experience?* " />
          <RadioInput
            id="experienceYes"
            name="tutoringExperience"
            value="yes"
            checked={hasTutoringExperience === "yes"}
            onChange={() => handleRadioChange("yes")}
            label="Yes"
          />
          <RadioInput
            id="experienceNo"
            name="tutoringExperience"
            value="no"
            checked={hasTutoringExperience === "no"}
            onChange={() => handleRadioChange("no")}
            label="No"
          />
        </div>
        <div>
          <ExperienceQuestions
            question="What level(s) are you interested in tutoring? "
            span="(Select all that apply)*"
          />

          {levels.map((level) => {
            const clicked = selectedLevelsexp.includes(level); // Check if selected

            return (
              <div key={level} className="flex items-center py-6 relative">
                <div className="relative flex items-center justify-center w-7 h-7">
                  <input
                    type="checkbox"
                    id={`checkbox-${level}`} // Unique ID for each checkbox
                    checked={clicked}
                    onChange={() => handleCheckboxChange(level)}
                    className="absolute w-7 h-7 opacity-0 cursor-pointer hover:!bg-darkBlue"
                  />
                  <div
                    className={`w-7 h-7 border-[3px] border-[#685AAD] rounded-md flex items-center justify-center ${
                      clicked ? "bg-[#685AAD]" : "bg-transparent"
                    }`}
                  >
                    {clicked && (
                      // eslint-disable-next-line react/jsx-no-undef
                      <Image  loading="lazy" 
                        src={tick} // Replace with the correct path for the tick icon
                        alt="Tick"
                        className="w-10 h-10"
                      />
                    )}
                  </div>
                </div>
                <label
                  className="text-darkBlue  text-2xl pl-6"
                  htmlFor={`checkbox-${level}`}
                >
                  {level}
                </label>
              </div>
            );
          })}

          {/* You can display the selected levels array for debugging purposes */}
          <div className="text-darkBlue">
            Selected Levels: {selectedLevelsexp.join(", ")}
          </div>
        </div>
        <div className="mt-5">
          <ExperienceQuestions question="What subject(s) can you tutor in?" />
          <Dropdown
            options={subjects}
            label="select subject(s)"
            className="!text-xl"
            onSelect={handleSubjectSelect}
            initialSelectedOptions={[]}
          />
        </div>

        <div className="mt-10">
          <ExperienceQuestions question="What languages can you tutor in?" />
          <Dropdown
            options={languages}
            label="select language(s)"
            className="!text-xl"
            onSelect={handleSubjectSelect}
            initialSelectedOptions={["English", "French"]}
          />
        </div>

        <div className="mt-16">
          <ExperienceQuestions
            question="What type of instruction are you interested in? "
            span="(Select all that apply)*"
          />
          <div className="flex items-center py-6 relative">
            <div className="relative flex items-center justify-center w-7 h-7">
              <input
                type="checkbox"
                id="instructionOne"
                checked={selectedInstructionsexp.includes("1-on-1")}
                onChange={() => handleCheckboxChangenumberofstudents("1-on-1")}
                className="absolute w-7 h-7 opacity-0 cursor-pointer hover:!bg-darkBlue"
              />
              <div
                className={`w-7 h-7 border-[3px] border-[#685AAD] rounded-md flex items-center justify-center ${
                  selectedInstructionsexp.includes("1-on-1")
                    ? "bg-[#685AAD]"
                    : "bg-transparent"
                }`}
              >
                {selectedInstructionsexp.includes("1-on-1") && (
                  <Image  loading="lazy"  src={tick} alt="Tick" className="w-10 h-10" />
                )}
              </div>
            </div>
            <label
              className="text-[#685AAD] text-2xl pl-6"
              htmlFor="instructionOne"
            >
              1-on-1
            </label>
          </div>

          <div className="flex items-center py-6 relative">
            <div className="relative flex items-center justify-center w-7 h-7">
              <input
                type="checkbox"
                id="instructionGroup"
                checked={selectedInstructionsexp.includes(
                  "Small group (5 to 15 students)"
                )}
                onChange={() =>
                  handleCheckboxChangenumberofstudents(
                    "Small group (5 to 15 students)"
                  )
                }
                className="absolute w-7 h-7 opacity-0 cursor-pointer hover:!bg-darkBlue"
              />
              <div
                className={`w-7 h-7 border-[3px] border-[#685AAD] rounded-md flex items-center justify-center ${
                  selectedInstructionsexp.includes(
                    "Small group (5 to 15 students)"
                  )
                    ? "bg-[#685AAD]"
                    : "bg-transparent"
                }`}
              >
                {selectedInstructionsexp.includes(
                  "Small group (5 to 15 students)"
                ) && <Image  loading="lazy"  src={tick} alt="Tick" className="w-10 h-10" />}
              </div>
            </div>
            <label
              className="text-[#685AAD] text-2xl pl-6"
              htmlFor="instructionGroup"
            >
              Small group (5 to 15 students)
            </label>
          </div>

          {/* Debugging: Display selected instructions */}
          {/* <div>Selected Instructions: {selectedInstructionsexp.join(", ")}</div> */}
        </div>

        <div className="mt-28">
          <ExperienceQuestions question="How many hours are you available to tutor each week?* " />
          <RadioInput
            id="hoursLessThan5"
            name="tutoringHours"
            value="Less than 5 hours"
            checked={selectedHoursexp === "Less than 5 hours"} // Check if selected
            onChange={() => handleHoursChange("Less than 5 hours")} // Handle change
            label="Less than 5 hours"
          />
          <RadioInput
            id="hours5To10"
            name="tutoringHours"
            value="5-10 hours"
            checked={selectedHoursexp === "5-10 hours"} // Check if selected
            onChange={() => handleHoursChange("5-10 hours")} // Handle change
            label="5-10 hours"
          />
          <RadioInput
            id="hours10To20"
            name="tutoringHours"
            value="10-20 hours"
            checked={selectedHoursexp === "10-20 hours"} // Check if selected
            onChange={() => handleHoursChange("10-20 hours")} // Handle change
            label="10-20 hours"
          />
          <RadioInput
            id="hoursMoreThan20"
            name="tutoringHours"
            value="More than 20 hours"
            checked={selectedHoursexp === "More than 20 hours"} // Check if selected
            onChange={() => handleHoursChange("More than 20 hours")} // Handle change
            label="More than 20 hours"
          />
        </div>

        <div className="mt-8">
          <ExperienceQuestions question="What date can you start tutoring?" />
          <input
            className="w-1/2 px-12 py-3 rounded-full bg-purpleBtn mt-5"
            type="date"
            value={startDateexp} // Bind the value to the state
            onChange={handleDateChange} // Handle change event
          />
        </div>









        <div className="mt-16">
            <ExperienceQuestions
                question="What’s your general availabilityexp? "
                span="(Select all that apply)"
            />

            <div className="w-[85%]">
                {days.map((day) => (
                    <div key={day} className="flex pl-8 justify-between items-center mb-2">
                        <span className="text-darkBlue text-[25px] w-1/5">{day}</span>
                        {timeSlots.map((timeSlot) => {
                            const isChecked = availabilityexp[day]?.includes(timeSlot) || false;

                            return (
                                <div key={timeSlot} className="flex items-center space-x-2">
                                    <div className="flex items-center py-6 relative">
                                        <div className="relative flex items-center justify-center w-7 h-7">
                                            <input
                                                type="checkbox"
                                                id={`${day}-${timeSlot}`}
                                                checked={isChecked}
                                                onChange={() => handleTimeSlotChange(day, timeSlot)}
                                                className="absolute w-7 h-7 opacity-0 cursor-pointer hover:!bg-darkBlue"
                                            />
                                            <div
                                                className={`w-7 h-7 border-[3px] border-[#685AAD] rounded-md flex items-center justify-center ${
                                                    isChecked ? 'bg-[#685AAD]' : 'bg-transparent '
                                                }`}
                                            >
                                                {isChecked && (
                                                    <Image  loading="lazy" 
                                                        src={tick}
                                                        alt="Tick"
                                                        className="w-10 h-10"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <label htmlFor={`${day}-${timeSlot}`} className='text-[#685AAD] text-2xl pl-6'>
                                            {timeSlot}
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>





        <div>
            <ExperienceQuestions question="Do you have classroom teaching experience?* " />
            <RadioInput
                id="experienceYes"
                name="tutoringExperience"
                value="yes"
                checked={classroomteachingexp === "yes"}
                onChange={() => setclassroomteachingexp("yes")} // Corrected function name
                label="Yes"
            />
            <RadioInput
                id="experienceNo"
                name="tutoringExperience"
                value="no"
                checked={classroomteachingexp === "no"}
                onChange={() => setclassroomteachingexp("no")} // Corrected function name
                label="No"
            />
        </div>

        <div className=" w-[42%] mt-20">
          <ConfirmBtn
            btnName="Continue"
            className="text-3xl font-medium"
            onClick={NextStep}
          />
        </div>
      </form>
    </div>
  );
};

export default Experience;
