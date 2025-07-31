"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import icon from "../../../public/assets/icons/darkmode.svg";
import hamburger from "../../../public/assets/icons/hamburger-button.svg";
import cross from "../../../public/assets/icons/crossicon.svg";
import Link from "next/link";
import Button from "../Button";
import VLine from "../../../public/VerticalLine3.svg";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import DropDown from "./DropDown";

const Navbar = () => {
  const router = useRouter();
  const path = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center py-12  px-[100px] mx-auto  mb:p-5 mb:flex-col xl:px-16 lg:px-10 lg:py-8 ">
      <div className="hidden custom-2xl:block">
        <Link href="/">
          <Image loading="lazy" className="w-[10.1rem]" src={logo} alt="" />
        </Link>
      </div>

      <div className="hidden custom-2xl:flex  items-center justify-between gap-8 xl:gap-6 lg:gap-6 w-[82.6%] ">
        <ul className="flex  max-w-[47.4rem] w-full  justify-between items-center  text-[#473171]  xl:text-xl lg:w-[50%] lg:gap-1 lg:text-[15px] ">
          <Link href="/" passHref>
            <li
              className={`flex items-center justify-center leading-tight px-1.5 custom-2xl:w-[138px]  ${
                path === "/"
                  ? "text-[25px] border-b-2 border-[#a8a3c3]  font-medium "
                  : "text-[23px]"
              }`}
            >
              How&nbsp;it&nbsp;works
            </li>
          </Link>
          <Link href="/ETutorSearch">
            <li
              className={`flex items-center justify-center leading-tight px-1 custom-2xl:w-[94px] ${
                path === "/ETutorSearch"
                  ? "text-[25px] border-b-2 border-[#a8a3c3]  font-medium "
                  : "text-[23px]"
              }`}
            >
              eTutors
            </li>
          </Link>
          <Link href="/Packages">
            <li
              className={`flex items-center justify-center leading-tight px-1 custom-2xl:w-[94px] ${
                path === "/Packages"
                  ? "text-[25px] border-b-2 border-[#a8a3c3]  font-medium "
                  : "text-[23px]"
              }`}
            >
              Packages
            </li>
          </Link>
          <Link href="/Faqs">
            <li
              className={`flex items-center justify-center leading-tight px-1 custom-2xl:w-[70px] ${
                path === "/Faqs"
                  ? "text-[25px] border-b-2 border-[#a8a3c3]  font-medium "
                  : "text-[23px]"
              }`}
            >
              <p>FAQs</p>
            </li>
          </Link>
          <li className="text-[#a8a3c3]">
            <Image src={VLine} alt="" className="hidden custom-2xl:block " />
          </li>
          <Link href="/for-etutor">
            <li
              className={`flex items-center justify-center leading-8 px-1 custom-2xl:w-[130px]  ${
                path === "/for-etutor"
                  ? "text-[27px] border-b-2 border-[#a8a3c3]  font-medium "
                  : "text-[23px]"
              }`}
            >
              <p>For&nbsp;eTutors</p>
            </li>
          </Link>
        </ul>

        <div className=" flex justify-between items-center max-w-[35.5rem] w-full ">
          <div className="">
            <DropDown />
          </div>

          <div className="max-w-[18.8rem] w-full  flex justify-between items-center">
            <Link href="/signin">
              <button className="  font-medium text-customBlue !text-[25px] focus:outline-none	xl:!text-2xl lg:!text-lg">
                SIGN&nbsp;IN
              </button>
            </Link>

            <Link href="/SignupAs">
              <Button
                className="!text-[24px] !py-3.5 !px-6 sm:!px-8 md:!px-10 custom-lg:!px-12 custom-xl:!px-[41px] custom-2xl:!px-[41px] !rounded-full xl:!text-2xl lg:!text-lg "
                btnName="SIGN&nbsp;UP"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* //mobile navbar */}

      <div className="custom-2xl:hidden block w-full relative  ">
        <div className="flex justify-between items-center w-full">
          <div>
            <Link href="/">
              <Image
                loading="lazy"
                className="w-[160px] h-[30px]"
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>
          <div>
            {isOpen ? (
              <Image
                loading="lazy"
                className="h-8 w-8 cursor-pointer"
                src={cross}
                alt="Close Menu"
                onClick={toggleMenu}
              />
            ) : (
              <Image
                loading="lazy"
                className="h-8 w-8 cursor-pointer"
                src={hamburger}
                alt="Open Menu"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>

        <div
          className={`absolute top-0 left-0 w-full transition-all duration-300 transform  px-4 py-4  ${
            isOpen
              ? "translate-y-12 opacity-100"
              : "-translate-y-full opacity-0"
          } bg-white z-50`}
        >
          <ul className="flex font-bold text-darkBlue flex-col gap-3 py-4">
            <Link href="/">
              <li>How it works</li>
            </Link>
            <Link href="/ETutorSearch">
              <li>eTutors</li>
            </Link>
            <Link href="/Packages">
              <li>Packages</li>
            </Link>
            <Link href="/Faqs">
              <li>FAQs</li>
            </Link>
            <li className="hidden">|</li>
            <Link href="/for-etutor">
              <li>For eTutors</li>
            </Link>
          </ul>
          <div className="flex flex-col gap-4">
            <DropDown />

            <Link href="/signin">
              <button className="text-customBlue focus:outline-none font-bold w-full">
                SIGN IN
              </button>
            </Link>
            <Link href="/SignupAs">
              <Button
                className="mb:text-sm font-bold text-xs w-full"
                btnName="SIGN UP"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
