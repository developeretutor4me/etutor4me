import Headings from "@/components/Headings";
import React from "react";
import balance from "../../../../public/assets/homepage/balance.png";
import trial from "../../../../public/assets/homepage/trial.png";
import flexible from "../../../../public/assets/homepage/flexible.png";
import Image from "next/image";
const Membership = () => {
  return (
    <>
      <div className="bg-[#e8e2f9]  flex flex-col justify-center items-center pb-[105px] pt-[76px] mb-3 mb:text-center mb:p-6 mt-3 ">
        <h2 className="text-[65px] 2xl:text-[82px] font-extrabold text-[#685AAD] mb:text-2xl">
          Customise your membership
        </h2>
        <p className="text-xl 2xl:text-[35px] leading-tight max-w-screen-lg max-w-[1427.49px] w-full mt-3 custom-lg:mt-[25px] text-[#534988] text-center mb:text-sm">
          Experience customized tutoring with eTutors: affordable rates, 1:1
          sessions from expert-matched tutors, flexible lesson packages, and
          convenient scheduling options.
        </p>
      </div>
      <div className="w-[80%] m-auto gap-12 items-center flex pb-[11.5rem] pt-64  xl:py-44 mb:py-24 mb:flex-col mb:gap-10 lg:py-32">
        <div className="w-1/3 flex flex-col gap-3 items-center text-center mb:w-full">
          <Image loading="lazy" className="" alt="pricing" src={balance} />
          <h2 className="text-darkBlue 2xl:mt-5 text-3xl 2xl:text-[50.79px] 2xl:leading-normal font-extrabold">
            {" "}
            Sensible Pricing
          </h2>
          <p className="text-xl text-[#473171] 2xl:text-3xl leading-6 2xl:mt-1 text-center custom-lg:max-w-[28rem]">
          our sensible pricing ensures flexible 
and affordable rates for both college 
students and parents aiming to help
their children achieve their goals 
          </p>
        </div>
        <div className="w-1/3 flex flex-col gap-3 items-center text-center mb:w-full">
          <Image loading="lazy" className="" alt="pricing" src={trial} />
          <h2 className="text-darkBlue 2xl:mt-5 text-3xl 2xl:text-[50.79px] 2xl:leading-normal font-extrabold">
            {" "}
            2 Free Trials
          </h2>
          <p className="text-xl text-[#473171] 2xl:text-3xl leading-6 2xl:mt-1 text-center custom-lg:max-w-[28rem]">
          You get 2 free trials   <br  className="hidden custom-lg:block"/>
to find the perfect eTutor, with only 1
 free trial per eTutor
          </p>
        </div>
        <div className="w-1/3 flex flex-col gap-3 items-center text-center mb:w-full">
          <Image loading="lazy" className="" alt="pricing" src={flexible} />
          <h2 className="text-darkBlue 2xl:mt-5 text-3xl 2xl:text-[50.79px] 2xl:leading-normal font-extrabold">
            {" "}
            Flexibility
          </h2>
          <p className="text-xl text-[#473171] 2xl:text-3xl leading-6 2xl:mt-1 text-center custom-lg:max-w-[27rem]">
          Enjoy the flexibility of rescheduling or
choosing to complete your
purchased sessions with a different 
eTutor 
          </p>
        </div>
      </div>
    </>
  );
};

export default Membership;
