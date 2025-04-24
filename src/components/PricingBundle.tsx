"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const BundlePricing = () => {
    const router = useRouter();

  return (
    <div className="w-full flex flex-col custom-lg:mb-6  mx-auto px-4 py-20">
      {/* Header Text */}
      <h1 className="text-center text-[#584A91] text-2xl md:text-[42.79px] leading-normal lg:text-4xl font-medium max-w-[1500px]  mx-auto mb:text-xl mb:px-4">
        Preparing for an upcoming exam? Our flexible bundles, led by expert
        tutors, are perfect for test prep like{" "}
        <span className="text-[#9568ff] font-bold">
          SAT, ACT, GMAT, GRE, IB, GCSE,{" "}
        </span>
        <span className="text-[#9568ff] font-bold">and more!</span>
      </h1>

      {/* Bundles Container */}
      <div className="flex justify-center items-start gap-14 mt-[75px] mb:flex-col lg:gap-6">
        {/* 5 Sessions Bundle */}
        <div className="relative w-full max-w-[510px] mb:max-w-full group ">
          <div className="absolute inset-0 bg-[#cfccde] rounded-[30px] transform -translate-x-5 translate-y-6  mb:-translate-x-2 mb:translate-y-2"></div>
          <div className="relative bg-white rounded-[30px] border-[3px] border-[#5553c4] px-12 py-6 flex flex-col ">
            <h2 className="text-[#8653FF] text-5xl 2xl:text-[74.58px] font-bold leading-tight mb:text-4xl transition-all mt-2 group-hover:scale-105 origin-bottom-left duration-500  transform  group-hover:-translate-y-0.5">
              5 Sessions
            </h2>
            <div className="text-[#8653FF] text-4xl 2xl:text-[46px] leading-tight font-medium mb-2 mb:text-3xl transition-all  group-hover:scale-[1.44] origin-top-left duration-500  ">
              $270.00
            </div>
            <div className="mt-5 hidden group-hover:block duration-500 text-[#aa87ff] text-xl opacity-80 group-hover:opacity-100 mb-4 transition-all ">
              <span className="font-medium text-2xl">AVG </span>
              <span className="font-medium text-4xl">$54.00</span>
              <span className="font-medium text-2xl">/session</span>
            </div>
            <p className="text-[#685aad] text-[30.16px] leading-tight font-medium  mb-12  mt-2.5 flex-grow mb:text-lg transition-all ">
              Perfect for short-term needs and focused learning.
            </p>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                localStorage.setItem("activeSidebarItem", "My Membership");
                router.push("/SignupAs");
              }}
              className=" bg-[#aa87ff] text-white py-3.5 px-[84px] rounded-full text-xl 2xl:text-4xl font-bold hover:bg-[#7B40FF] w-fit mx-auto mb-5"
            >
              Get Bundle
            </button>
          </div>
        </div>
        <div className="relative w-full max-w-[510px] mb:max-w-full group ">
          <div className="absolute inset-0 bg-[#cfccde] rounded-[30px] transform  translate-y-6   mb:translate-y-2"></div>
          <div className="relative bg-white rounded-[30px] border-[3px] border-[#5553c4] px-12 py-6 flex flex-col ">
            <h2 className="text-[#8653FF] text-5xl 2xl:text-[74.58px] font-bold leading-tight mb:text-4xl transition-all mt-2 group-hover:scale-105 origin-bottom-left duration-500  transform  group-hover:-translate-y-0.5">
              10 Sessions
            </h2>
            <div className="text-[#8653FF] text-4xl 2xl:text-[46px] leading-tight font-medium mb-2 mb:text-3xl transition-all  group-hover:scale-[1.44] origin-top-left duration-500  ">
              $530.00
            </div>
            <div className="mt-5 hidden group-hover:block duration-500 text-[#aa87ff] text-xl opacity-80 group-hover:opacity-100 mb-4 transition-all ">
              <span className="font-medium text-2xl">AVG </span>
              <span className="font-medium text-4xl">$53.00</span>
              <span className="font-medium text-2xl">/session</span>
            </div>
            <p className="text-[#685aad] text-[30.16px] leading-tight font-medium  mb-12  mt-2.5 flex-grow mb:text-lg transition-all ">
              Ideal for consistent support and steady progress.
            </p>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                localStorage.setItem("activeSidebarItem", "My Membership");

                router.push("/SignupAs");
              }}
              className=" bg-[#aa87ff] text-white py-3.5 px-[84px] rounded-full text-xl 2xl:text-4xl font-bold hover:bg-[#7B40FF] w-fit mx-auto mb-5"
            >
              Get Bundle
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-[510px] mb:max-w-full group ">
          <div className="absolute inset-0 bg-[#cfccde] rounded-[30px] transform translate-x-5 translate-y-6  mb:translate-x-2 mb:translate-y-2"></div>
          <div className="relative bg-white rounded-[30px] border-[3px] border-[#5553c4] px-12 py-6 flex flex-col ">
            <h2 className="text-[#8653FF] text-5xl 2xl:text-[74.58px] font-bold leading-tight mb:text-4xl transition-all mt-2 group-hover:scale-105 origin-bottom-left duration-500  transform  group-hover:-translate-y-0.5">
              20 Sessions
            </h2>
            <div className="text-[#8653FF] text-4xl 2xl:text-[46px] leading-tight font-medium mb-2 mb:text-3xl transition-all  group-hover:scale-[1.44] origin-top-left duration-500  ">
              $1010.00
            </div>
            <div className="mt-5 hidden group-hover:block duration-500 text-[#aa87ff] text-xl opacity-80 group-hover:opacity-100 mb-4 transition-all ">
              <span className="font-medium text-2xl">AVG </span>
              <span className="font-medium text-4xl">$54.00</span>
              <span className="font-medium text-2xl">/session</span>
            </div>
            <p className="text-[#685aad] text-[30.16px] leading-tight font-medium  mb-12  mt-2.5 flex-grow mb:text-lg transition-all ">
              Great for long-term learning and exam preparation.{" "}
            </p>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                localStorage.setItem("activeSidebarItem", "My Membership");

                router.push("/SignupAs");
              }}
              className=" bg-[#aa87ff] text-white py-3.5 px-[84px] rounded-full text-xl 2xl:text-4xl font-bold hover:bg-[#7B40FF] w-fit mx-auto mb-5"
            >
              Get Bundle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundlePricing;
