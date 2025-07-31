import React from "react";
import Image from "next/image";
import Link from "next/link";
import Headings from "./Headings";
import axios from "axios";
import level1 from "../../public/level-1.svg";
import level2 from "../../public/level-2.svg";
import level3 from "../../public/level-3.svg";
import level4 from "../../public/level-4.svg";
import level5 from "../../public/level-5.svg";
import level6 from "../../public/level-6.svg";
import level7 from "../../public/level-7.svg";
import level8 from "../../public/level-8.svg";
import level9 from "../../public/level-9.svg";
import level10 from "../../public/level-10.svg";

import { useTeacher } from "@/app/admin/hooks/useTeacher";

const MeeteTutors = () => {
  const { teacher, isLoading3, error3 } = useTeacher();

  if (isLoading3) {
    return <p>loading...</p>;
  }
  if (error3) {
    return <p>{error3.message}</p>;
  }

  return (
    <div className=" pt-44  custom-xl:mt-16 px-[53px]  mb:p-0 lg:pt-16 lg:px-5 xl:pt-28">
      <div className=" flex justify-between items-end  tb:flex-row">
        <Headings className="" heading="Meet Our eTutors" />
        <Link
          href="/ETutorSearch"
          className="text-customBlue underline mb:text-sm text-[38.35px] leading-[2.25rem] pb-2.5 font-extrabold lg:text-lg xl:text-lg tb:text-sm "
        >
          More eTutors
        </Link>
      </div>
      <div className="flex   flex-wrap items-center   relative gap-2 sm:gap-4  2xl:gap-11  py-5 custom-lg:py-10 custom-xl:py-[67px] ">
        {teacher
          .filter(
            (teacher: any) =>
              teacher?.isApproved === true && teacher?.user?.verified === true
          )
          .sort(
            (a: any, b: any) =>
              b.totalBooking - a.totalBooking || b.level - a.level
          )
          .slice(0, 4)
          .map((teacher: any) => (
            <div
              className=" flex flex-col  max-h-[543px] w-24 sm:w-40 custom-lg:w-52 custom-xl:w-72 custom-2xl:w-96 bg-cardbg px-11 py-[30px] rounded-3xl gap-1  sm:flex-1  lg:rounded-2xl lg:p-4 lg:gap-2 xl:p-7 mb:rounded-2xl mb:px-2 mb:py-2"
              key={teacher._id}
            >
              <div className="relative mx-auto max-w-[100%] w-full max-h-[100%] h-full rounded-2xl ">
                <img

                  className="object-cover rounded-2xl aspect-square"
                  alt=""
                  src={teacher?.user?.profilePicture}
                />
                <Image
                  loading="lazy"
                  alt=""
                  src={
                    teacher?.level == "1"
                      ? level1
                      : teacher?.level == "2"
                        ? level2
                        : teacher?.level == "3"
                          ? level3
                          : teacher?.level == "4"
                            ? level4
                            : teacher?.level == "5"
                              ? level5
                              : teacher?.level == "6"
                                ? level6
                                : teacher?.level == "7"
                                  ? level7
                                  : teacher?.level == "8"
                                    ? level8
                                    : teacher?.level == "9"
                                      ? level9
                                      : teacher?.level == "10"
                                        ? level10
                                        : level1
                  }
                  // style={{ right: "-13.5%", bottom: "-11%" }}
                  className="w-8 sm:w-12 h-8 sm:h-12 custom-lg:w-16 custom-lg:h-16 custom-xl:w-[94.94px] custom-xl:h-[98.12px] absolute mb:right-[-5%] xl:right-[-8%] right-[-13.5%] xl:bottom-[-10%] bottom-[-10%]"
                />
              </div>
              <h3 className="text-darkBlue custom-lg:pt-[22px] capitalize custom-xl:text-[51.27px] custom-xl:leading-none font-extrabold lg:text-3xl xl:text-4xl text-sm sm:text-2xl truncate">
                {teacher?.contactInformation?.firstName}
              </h3>
              <p className="text-customBlue custom-xl:text-[36px]  lg:text-xl xl:text-2xl text-sm sm:text-base custom-2xl:mt-3">
                {teacher?.totalbooking > 0
                  ? teacher?.totalbooking + "+ Bookings"
                  : "No Bookings"}
              </p>
              <p className="text-[#473171] custom-xl:text-[36.21px] custom-xl:leading-tight  lg:text-xl xl:text-2xl text-sm sm:text-base custom-2xl:mt-2 font-bold mb:leading-none ">
                $60<span className="text-[#887cc4] font-light">/session</span>
              </p>
            </div>
          ))}
      </div>
      <div className="text-[#473171] text-[28px] leading-8   py-2 sm:py-5 mb:text-xs custom-xl:pt-3.5 custom-xl:pb-16 mb:leading-normal  xl:text-2xl lg:text-lg custom-2xl:pr-12  ">
        <p>
          Our eTutors are top students selected for their exceptional knowledge
          and ability to connect with peers. They understand your challenges and
          provide practical, effective solutions. Always striving to level up,
          their progress is based on experience, student improvements, and
          reviews. This gamer-like drive ensures you get the best support
          possible.
        </p>
        <p className="mt-2 sm:mt-3 custom-xl:mt-5 ">
          Want to become an eTutor?{" "}
          <Link
            href="/for-etutor"
            className="text-customBlue underline font-bold"
          >
            {" "}
            <span>Join us </span>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default MeeteTutors;
