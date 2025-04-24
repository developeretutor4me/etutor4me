"use client";
import Button from "@/components/Button";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const FindEtutor = () => {
  const router = useRouter();
  return (
    <div className=" flex flex-col justify-center items-center  gap-9  mb:gap-6 h-[80vh] lg:h-[70vh] mb:h-[60vh]">
      <h2 className="text-darkBlue text-[93px] leading-normal font-extrabold mb:text-3xl xl:text-[4rem] lg:text-[3.5rem] custom-2xl:mt-10">
        {" "}
        Find Your <span className="text-customOrange">eTutor</span>
      </h2>
      <p className=" max-w-[950px] text-[46.03px] font-medium leading-tight text-[#473171]  mb:text-base xl:text-[2rem] lg:text-[1.5rem] text-center">
        Find the best private tutors online, book a free trial and arrange a
        meeting with one of our vetted tutors.
      </p>

      <span className="mt-[115px] mb:mt-8">
        <span onClick={(e:any)=>{
          e.preventDefault(); 
          localStorage.setItem('activeSidebarItem',"My Sessions")
          localStorage.setItem('activeTab',"trial")
          router.push('/SignupAs')
        }}>
        {" "}

        <Button className="py-[25px] px-20 mb:py-4" btnName="BOOK A FREE SESSION" />
        </span>
      </span>
    </div>
  );
};

export default FindEtutor;
