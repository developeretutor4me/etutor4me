"use client";
import SignUpNavbar from "@/components/SignUpNavbar";
import React from "react";
import Image from "next/image";
import back from "../../../../public/assets/signup/confirmation.png";

import { useRouter } from "next/navigation";
const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/signin/studentsignin"); // Navigate to /admin
  };
  return (
    <div
      className='"
      '
      style={{ backgroundImage: `url(${back.src})` }}
    >
      <SignUpNavbar />
      <div className="relative min-h-screen w-screen flex items-center justify-center ">
        <div className="  ">
        
          {/* Optional dark overlay */}
          <h1 className="text-darkBlue  font-bold text-xl sm:text-3xl custom-xl:text-7xl  text-center ">
            A confirmation email with a link has been <br /> sent to your inbox.
            <span className="font-light">
              Please check your{" "}
              <a
                href="https://mail.google.com/mail/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-light"
              >
                email
              </a>{" "}
              <br /> to complete the process.
            </span>
          </h1>
        </div>
        <div className="absolute bottom-10 custom-xl:bottom-20 right-5 sm:right-20 custom-xl:right-40  ">
          <div
            onClick={handleNavigate}
            className="rounded-md custom-xl:rounded-3xl text-xl custom-xl:text-4xl bg-[#EDE6FF] text-black px-8 py-3 sm:py-4 custom-xl:px-16 custom-xl:py-9  cursor-pointer mb:text-sm "
          >
            Confirmation
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
