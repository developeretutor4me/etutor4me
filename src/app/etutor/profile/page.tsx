"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import logo from "../../../../public/etutorlogo.svg";
import adminLogo from "../../../../public/etutuorAdminLogo.svg";
import Image from "next/image";
import Home1 from "../../../../public/homeicon.svg";
import calender from "../../../../public/calander.svg";
import eicon from "../../../../public/eicon.svg";
import membership from "../../../../public/earnings.svg";
import contact from "../../../../public/contactandsupporticon.svg";
import translate from "../../../../public/translateicon.svg";
import dark from "../../../../public/darkicon.svg";
import { useRouter } from "next/navigation";
import homeinactive from "../../../../public/home inactive.svg";
import sessioninactive from "../../../../public/sessionoverview inactive.svg";
import einactive from "../../../../public/e inactive.svg";
import calanderinactive from "../../../../public/calander inactive.svg";
import earningsinactive from "../../../../public/earnings inactive.svg";
import supportinactive from "../../../../public/support inactive.svg";
import useSWR from "swr";
import Link from "next/link";
import rightarrow from "../../../../public/arrowwww.svg";
import bell from "../../../../public/bellicon.svg";
import profile from '../../../../public/profile.svg'
import activeprofile from '../../../../public/activeprofileicon.svg'
import bankdetails from '../../../../public/bankdetails.svg'
import activebankdetails from '../../../../public/activeBankdetails.svg'
import taxinformation from '../../../../public/taxinformation.svg'
import activetaxinformation from '../../../../public/activeTaxinfo.svg'
import awards from '../../../../public/awards.svg'
import activeawards from '../../../../public/activeAwards.svg'
import myfiles from '../../../../public/myfiles.svg'
import activemyfiles from '../../../../public/activeMyfiles.svg'
import pause from '../../../../public/pauseorresign.svg'
import activepause from '../../../../public/activePauseOrresign.svg'
import Profile from "./components/Profile";
import BankDetails from "./components/BankDetails";
import TaxInfo from "./components/TaxInfo";
import Awards from "./components/Awards";
import MyFiles from "./components/MyFiles";
import PauseOrResign from "./components/PauseOrResign";


interface Student {
  profile: {
    firstName: String;
  };
  email: string;
  contactInformation: {
    country: string;
    phone: string;
    address: string;
  };
}

interface Teacher {
  name: string;
  email: string;
  contactInformation: {
    firstName: string;
    country: string;
    phone: string;
    address: string;
  };
}

interface BookingRequest {
  meetingCompleted: boolean;
  joinLink: string | undefined;
  _id: string;
  student: Student;
  teacher: Teacher;
  subjects: string[];
  level: string;
  date: string;
  time: string;
  status: string;
}


const SessionsDashboard = () => {
  const router = useRouter()
  const value = "hello"
  const [activeSidebarItem, setActiveSidebarItem] = useState("Profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [previousSidebarItem, setPreviousSidebarItem] = useState("");
 
  const { data: session,update } = useSession(); // Get the session data
  const targetRef = useRef<HTMLDivElement>(null); // Reference to your component
  const [firstname, setFirstname] = useState("");
  const [profilepicture, setProfilepicture] = useState("");

  const [teacher, setTeacher] = useState<Teacher>();







  const handleImpersonate = async () => {
   
    await update({
      user:{
        email: 'admin@gmail.com',
        role: 'admin',
        id: 'admin',
        isAdmin: true,
        isParent:false
      }
    })
    setTimeout(() => {
     router.push("/admin")
    }, 3000);
   
  };






  // fetching the user data----------------------------
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Teacher not found or internal server error");
    }
    return response.json();
  };

  // Use SWR hook
  const { data: teacherData, isLoading } = useSWR(
    "/api/Teacher-Apis/teacher-data",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onSuccess: (data) => {
        setTeacher(data);
      },
      onError: (err) => {
     "helo"
      },
    }
  );






  const sidebarItems = [
    {
      name: "Profile",
      icon: activeSidebarItem === "Profile" ? activeprofile : profile,
    },
    {
      name: "Bank Details",
      icon:
        activeSidebarItem === "Bank Details" ? activebankdetails : bankdetails,
    },
    {
      name: "Tax Information",
      icon: activeSidebarItem === "Tax Information" ? activetaxinformation : taxinformation,
    },
    {
      name: "Awards",
      icon: activeSidebarItem === "Awards" ? activeawards : awards,
    },

    {
      name: "My Files",
      icon: activeSidebarItem === "My Files" ?  activemyfiles: myfiles,
    },
    {
      name: "Pause or Resign",
      icon: activeSidebarItem === "Pause or Resign" ? activepause : pause ,
    },
    {
      name: "Dashboard",
      icon: activeSidebarItem === "Dashboard" ? Home1 : homeinactive,
    },
   
  ];

  const toggleSidebar = () => {
    localStorage.removeItem('active')
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1849px)");

    // Set initial value based on the media query match
    setIsLargeScreen(mediaQuery.matches);

    // Define a listener for changes
    const handleMediaChange = (e: any) => setIsLargeScreen(e.matches);

    // Add the event listener
    mediaQuery.addEventListener("change", handleMediaChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);
  //@ts-ignore
  const renderContent:voide = () => {
    switch (activeSidebarItem) {
      case "Profile":
        return <Profile />
      case "Bank Details":
        return <BankDetails/>
      case "Tax Information":
        return <TaxInfo/>
      case "Awards":
        return <Awards/>
      case "My Files":
        return <MyFiles/>
      case "Pause or Resign":
        return <PauseOrResign teacher={teacher}/>
      case "Dashboard":
        return router.push('/etutor')

      default:
        return <div>Select a tab from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen bg-white relative z-0">
      {/* Sidebar */}
      <aside
        className={` ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } custom-lg:translate-x-0 fixed custom-lg:static inset-y-0 left-0 z-50 max-w-[20rem] sm:max-w-[25rem] w-full  min-h-screen  rounded-tr-3xl rounded-br-3xl bg-[#E6E4F2] text-white flex flex-col transition-transform duration-300 ease-in-out pl-5 pr-9 pt-8 custom-2xl:pt-11 pb-4`}
      >
        <div className="flex items-center mb-[23.5%] pb-2 pl-7">
          {session?.user?.isAdmin === true ?(

            <Image  loading="lazy"  src={adminLogo} alt="" className="w-52 sm:w-[17rem]" />
          ):(

            <Image  loading="lazy"  src={logo} alt="" className="w-52 sm:w-[17rem]" />
          )}
        </div>
        <nav className="flex-grow flex flex-col">
          <ul className="space-y-2 flex-grow">
            {sidebarItems
              .filter(
                (item) => !["Dashboard"].includes(item.name)
              )
              .map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      localStorage.removeItem('active')
                      setPreviousSidebarItem(activeSidebarItem);
                      setActiveSidebarItem(item.name);
                      if (window.innerWidth < 1024) {
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={`flex    hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000  items-center w-full px-6 custom-2xl:px-9 py-3 sm:py-[18px] rounded-[22px]  transition-all  ${
                      activeSidebarItem === item.name
                        ? "bg-white  transition-all"
                        : "hover:bg-darkpurple hover:bg-transparent transition-all"
                    }`}
                  >
                    <Image  loading="lazy" 
                      src={item.icon}
                      className="w-5 sm:w-6 h-5 sm:h-6 mr-7"
                      alt=""
                    />
                    <p
                      className={`text-[#cac7d8] text-xl font-medium ${
                        activeSidebarItem === item.name
                          ? "text-customBlue"
                          : "text-darkpurple"
                      }`}
                    >
                      {item.name}
                    </p>
                  </button>
                </li>
              ))}
          </ul>
          <ul className="space-y-2 mt-6 ">
            {sidebarItems
              .filter((item) =>
                ["Dashboard",].includes(item.name)
              )
              .map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      localStorage.removeItem('active')
                      setActiveSidebarItem(item.name);
                      if (window.innerWidth < 1024) {
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={`flex   hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000  items-center w-full px-6 custom-2xl:px-9 py-3 sm:py-[18px] rounded-[22px]  transition-all  ${
                      activeSidebarItem === item.name
                        ? "bg-white text-customBlue"
                        : "hover:bg-darkpurple hover:bg-transparent"
                    }`}
                  >
                    <Image  loading="lazy" 
                      src={item.icon}
                      className="w-5 sm:w-6 h-5 sm:h-6 mr-7"
                      alt=""
                    />
                    <p
                      className={`text-[#cac7d8] text-xl font-medium ${
                        activeSidebarItem === item.name
                          ? "text-customBlue"
                          : "text-darkpurple"
                      }`}
                    >
                      {item.name}
                    </p>
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-2 custom-lg:px-10 py-4 overflow-auto  bg-transparent">
        <header
          className={`flex justify-between items-center px-4 custom-lg:px-0  ${
            activeSidebarItem === "Session overview" ? "mb-2" : "mb-8"
          }`}
        >
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="custom-lg:hidden mr-4 text-darkBlue"
            >
              <Menu size={24} />
            </button>

            {activeSidebarItem === "Dashboard" ? (
              <></>
            ) : (
              <div
                onClick={() => {
                  if (previousSidebarItem) {
                    setActiveSidebarItem(previousSidebarItem); // Navigate back to previous item
                  }
                }}
                className="flex cursor-pointer  items-center"
              >
                <ChevronLeft
                  className="mr-2 cursor-pointer text-[#685AAD]"
                  size={24}
                />

                <h1 className="text-[#685AAD] text-xs sm:text-sm custom-lg:text-xl hidden sm:block">
                  Back
                </h1>
              </div>
            )}
            {activeSidebarItem === "My Sessions" && (
              <h1 className="text-[#685AAD]  text-sm sm:text-md custom-lg:text-5xl  font-extrabold ml-0 sm:ml-6 absolute top-16 left-16 sm:static">
                My&nbsp;Sessions
              </h1>
            )}
          </div>

          <div
            ref={targetRef}
            className="flex items-center space-x-4 relative -right-4 select-none "
          >
            {/* <Bell size={24} className="cursor-pointer text-darkBlue" /> */}
            <div className="flex gap-4 custom-2xl:gap-6 mr-2">
              <Image  loading="lazy" 
                src={dark}
                alt=""
                className="w-5 h-5 custom-2xl:w-6 custom-2xl:h-6"
              />
              <Image  loading="lazy" 
                src={translate}
                alt=""
                className="w-5 h-5 custom-2xl:w-6 custom-2xl:h-6"
              />
              <Image  loading="lazy" 
                src={bell}
                alt=""
                className="w-5 h-5 custom-2xl:w-6 custom-2xl:h-6"
              />
            </div>

            

            <div
              onClick={toggleProfile}
              className={`flex bg-[#EDE8FA] hover:cursor-pointer  px-2 py-1 justify-between w-[9rem] custom-2xl:w-[12.5rem]   h-10 custom-2xl:h-11 items-center rounded-md ${
                isProfileOpen ? "border border-[#685aad7a]" : "border-0"
              }`}
            >
              <div className="w-6 custom-2xl:w-7 h-6 custom-2xl:h-7  rounded-full overflow-hidden flex items-center">
                <img 
                //@ts-ignore
                src={teacher?.user?.profilePicture} alt="" className="object-contain object-center" />
              </div>
              {/* <div className="flex items-center  w-full  gap-2 custom-2xl:gap-4">

              </div> */}
              <span className="text-sm custom-2xl:text-base font-bold text-[#685AAD]">
                {teacher?.contactInformation?.firstName}
              </span>

              {isProfileOpen ? (
                <ChevronUp
                  size={18}
                  className="cursor-pointer  text-[#685AAD] "
                />
              ) : (
                <ChevronDown
                  size={18}
                  className="cursor-pointer  text-[#685AAD] "
                />
              )}
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 hover:cursor-pointer  bg-[#EDE8FA] font-bold rounded-md shadow-lg py-1 z-10 top-full w-[9rem] custom-2xl:w-[12.5rem] px-4 border border-[#685aad7a]">
                <Link
                  href="/etutor/profile"
                  className="block px-2 py-2 custom-2xl:py-3 text-sm text-[#685AAD]  border-b border-[#685aad7a] "
                >
                  Profile
                </Link>

                {session?.user?.isAdmin === true && (
                    <span
                      onClick={() => {
                        handleImpersonate();
                      }}
                      className="block px-2 py-2 custom-2xl:py-3 text-sm text-[#685AAD]  border-b border-[#685aad7a] "
                    >
                      Back to Admin
                    </span>
                  )}

                  
                <a
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block px-2 py-2 custom-2xl:py-3 text-sm text-[#685AAD] "
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </header>
        
        {renderContent()}
      </main>
    </div>
  );
};

export default SessionsDashboard;
