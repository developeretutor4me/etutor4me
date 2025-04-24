import Headings from "@/components/Headings";
import React from "react";
import blackbg from "../../../../public/assets/homepage/listbackpic.png";
import Button from "@/components/Button";
import Link from "next/link";
import "./TutorsList.css";
import { useRouter } from "next/navigation";
interface SeeTutorsListprops {
  filteredTutors: any;
}
const SeeTutorsList = ({ filteredTutors }: SeeTutorsListprops) => {
  const router = useRouter();
  return (
    <div className="tutor_list flex  max-w-[1776.84px] mx-auto items-center sm:gap-2 justify-center  flex-col bg-cover custom-lg:pb-[130px] custom-lg:pt-[150px] mb-[16rem] mt-48  bg-center  w-full rounded-3xl custom-lg:rounded-[35px]    mb:gap-0 text-center mb:px-0 mb:py-5 mb:my-8 xl:py-50">
      <h2 className="text-[72px] text-[#8179A7] mb:text-xl lg:text-[40px] xl:text-[50px]">
        {filteredTutors?.length}+&nbsp;More eTutors found
      </h2>

      <h1 className="mb:text-2xl  text-[86px] leading-none font-extrabold text-darkBlue lg:text-5xl  xl:text-6xl ">Sign up to see the full list</h1>

      <span className="mt-2 custom-lg:mt-[86px]  mb:mt-4">
      <button
      className="rounded-full"
      onClick={(e:any)=>{
          e.preventDefault(); 
          localStorage.setItem('activeSidebarItem',"Find eTutor")
          localStorage.setItem('activeTab',"trial")
          router.push('/SignupAs')
        }}>

       
          <button className="py-[22px] px-[90px]  lg:text-[25px]  text-[37px]     font-extrabold bg-customBlue   border-none focus:outline-none text-white rounded-full lg:text-2xl   xl:text-2xl  mb:px-8 mb:py-2.5 mb:text-base">
          SEE THE FULL LIST
          </button>
          </button>
      </span>
    </div>
  );
};

export default SeeTutorsList;
