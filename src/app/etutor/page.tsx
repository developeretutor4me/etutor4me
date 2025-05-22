"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Dashboard from "./components/Dashboard";
import logo from "../../../public/etutorlogo.svg";
import adminlogo from "../../../public/etutuorAdminLogo.svg";
import Image from "next/image";
import Home1 from "../../../public/homeicon.svg";
import sessionactive from "../../../public/sessionicon.svg";
import calender from "../../../public/calander.svg";
import eicon from "../../../public/eicon.svg";
import find from "../../../public/findEtutor.svg";
import membership from "../../../public/earnings.svg";
import contact from "../../../public/contactandsupporticon.svg";
import refer from "../../../public/refericon.svg";
import activity from "../../../public/activityicon.svg";
import setting from "../../../public/settingicon.svg";
import link from "../../../public/linkicons.svg";
import Session from "./components/Session";
import etokiicon from "../../../public/etokiIcon.svg";
import EPlusIcon from "../../../public/Plus circle.svg";
import redeemIcon from "../../../public/redeem.svg";
import bell from "../../../public/bellicon.svg";
import translate from "../../../public/translateicon.svg";
import dark from "../../../public/darkicon.svg";
import lightcalender from "../../../public/lightcalendar.svg";
import sessionicongray from "../../../public/compltedsessionsicon gray.svg";
import chat from "../../../public/chat.svg";
import bellgray from "../../../public/bellicongrat.svg";
import chaticon from "../../../public/chaticon.svg";
import refergray from "../../../public/grayrefer.svg";
import rightarrow from "../../../public/arrowwww.svg";
import Calender from "./components/Calender";
import MyEtutor from "./components/MyEtutor";
import FindEtutor from "./components/FindEtutor";
import ContactSupport from "./components/ContactSupport";
import ReferYourFriends from "./components/ReferYourFriends";
import Setting from "./components/Settings";
import UsefulLinks from "./components/UsefulLinks";

import homeinactive from "../../../public/home inactive.svg";
import sessioninactive from "../../../public/sessionoverview inactive.svg";
import einactive from "../../../public/e inactive.svg";
import calanderinactive from "../../../public/calander inactive.svg";
import earningsinactive from "../../../public/earnings inactive.svg";
import supportinactive from "../../../public/support inactive.svg";
import referinactive from "../../../public/refer inactive.svg";
import settinginactive from "../../../public/settings inactive.svg";
import linksinactive from "../../../public/links inactive.svg";
import ActivityDarkBlue from "../../../public/ActivityDarkBlue.svg";
import ActivityLightPurple from "../../../public/lighPUrple.svg";
import levellogo from "../../../public/level5 logo.svg";
import level1 from "../../../public/level-1.svg";
import level2 from "../../../public/level-2.svg";
import level3 from "../../../public/level-3.svg";
import level4 from "../../../public/level-4.svg";
import level5 from "../../../public/level-5.svg";
import level6 from "../../../public/level-6.svg";
import level7 from "../../../public/level-7.svg";
import level8 from "../../../public/level-8.svg";
import level9 from "../../../public/level-9.svg";
import level10 from "../../../public/level-10.svg";
import useSWR from "swr";
import Link from "next/link";
import Earnings from "./components/Earnings";
import { useRouter } from "next/navigation";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  isSameDay,
  endOfWeek,
  eachWeekOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";
import Activity from "./components/Activity";
import { useEtokies } from "../admin/hooks/useEtokies";
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
  studentdetails: any;
  startLink: string;
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
  const { etokies, isLoadingetokies, erroretokies } = useEtokies();
  const [activeSidebarItem, setActiveSidebarItem] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [previousSidebarItem, setPreviousSidebarItem] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const { data: session,update } = useSession(); // Get the session data
  const [teacher, setTeacher] = useState(null); // State to store teacher data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const targetRef = useRef<HTMLDivElement>(null); // Reference to your component
  const [eTokis, setETokis] = useState(0);
  const [earnedThisMonthEtokis, setearnedThisMonthEtokis] = useState(0);
  const [firstname, setFirstname] = useState("");
  const [profilepicture, setProfilepicture] = useState("");
  const [tutorlevelleft, settutorlevelleft] = useState(0);
  const [completeprofilestatus, setCompleteprofilestatus] = useState(0);
  const [confirmedState, setConfirmedState] = useState(false);
  const [unconfirmedState, setUnconfirmedState] = useState(false);
  const [canceledState, setCanceledState] = useState(false);
  const [redeem, setredeem] = useState(false);
  const [view, setView] = useState("month"); // 'month' or 'week'
  const [popup, setpopup] = useState(null);
  const [sessionData, setRequests] = useState<BookingRequest[]>([]);
  const [level, setlevel] = useState("");
  



  // fetching incoming requests
  useEffect(() => {
    const fetchRequests = async () => {
      if (!session) return;

      try {
        const response = await fetch(
          "/api/get-incoming-requests-from-student",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        const data = await response.json();
        setRequests(data.bookingRequests);
      
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [session]);



  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const weeks = eachWeekOfInterval(
    { start: monthStart, end: monthEnd },
    { weekStartsOn: 1 } // Monday as week start
  );
  // Filter sessions based on states
  const filteredSessions = useMemo(() => {
    
      return sessionData;
   
  }, [sessionData]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    // Add previous month days to start from Sunday
    const firstDay = startOfWeek(start);
    const preDays = eachDayOfInterval({ start: firstDay, end: start });

    return [...preDays.slice(0, -1), ...days];
  }, [currentDate, view]);

  const getSessionForDate = (date:any) => {
    return filteredSessions.filter((session:any) => !session.meetingCompleted).find((session) =>
      isSameDay(new Date(session.date), date)
    );
  };

  const userID = session?.user.id;

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
        setError(err.message);
      },
    }
  );

  // Update states based on SWR data
  useEffect(() => {
    setLoading(isLoading);
    if (error) {
      //@ts-ignore
      setError(error.message);
    }
  }, [isLoading, error, session]);

  useEffect(() => {
    //@ts-ignore
    setETokis(teacher?.user?.etokis);
    //@ts-ignore
    setlevel(teacher?.level);
    //@ts-ignore
    setearnedThisMonthEtokis(teacher?.EarnedThisMonth);
    //@ts-ignore
    setFirstname(teacher?.contactInformation?.firstName);
    //@ts-ignore
    setProfilepicture(teacher?.user?.profilePicture);
    settutorlevelleft(80);
    setCompleteprofilestatus(90);
  }, [session, teacher]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the component (targetRef), close the dropdown/modal/etc.
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: activeSidebarItem === "Dashboard" ? Home1 : homeinactive,
    },
    {
      name: "Session overview",
      icon:
        activeSidebarItem === "Session overview" ? sessionactive : sessioninactive,
    },
    {
      name: "My Students",
      icon: activeSidebarItem === "My Students" ? eicon : einactive,
    },
    {
      name: "Calendar",
      icon: activeSidebarItem === "Calendar" ? calender : calanderinactive,
    },

    {
      name: "Earnings",
      icon: activeSidebarItem === "Earnings" ? membership : earningsinactive,
    },
    {
      name: "Support",
      icon: activeSidebarItem === "Support" ? contact : supportinactive,
    },
    {
      name: "Refer your Friends",
      icon: activeSidebarItem === "Refer your Friends" ? refer : referinactive,
    },
    { name: "Activity",  icon: activeSidebarItem === "Activity" ? ActivityLightPurple : ActivityDarkBlue, },
    {
      name: "Settings",
      icon: activeSidebarItem === "Settings" ? setting : settinginactive,
    },
    {
      name: "Useful links",
      icon: activeSidebarItem === "Useful links" ? link : linksinactive,
    },
  ];

  const toggleSidebar = () => {
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
    localStorage.removeItem('ContactSupport')
    localStorage.removeItem('history')
    setTimeout(() => {
     router.push("/admin")
    }, 3000);
   
  };




  const renderContent = () => {
    switch (activeSidebarItem) {
      // ---------------------------DashBoard--------------------------------------------------------------
      case "Dashboard":
        return (
          <div className="  min-h-screen    ">
            {/* <Dashboard /> */}

            {/* top left box TOKIs */}
            <div
              className={`custom-2xl:w-full max-w-[66rem] ${
                isLargeScreen ? "flex-row gap-11" : "flex-col gap-4"
              } flex  items-start    absolute top-14 custom-lg:top-0 mt-4  `}
            >
              {/* 1 */}
              <div
                className={` flex flex-col space-y-2 pb-3 pt-4 px-4  bg-purple-100  rounded-3xl w-[100%] custom-2xl:w-[18rem] bg-[#EDE8FA]`}
              >
                <div className=" flex justify-between items-center bg-purple-300 rounded-2xl px-4 pl-6 pr-6 py-[10px] bg-[#ffffff84]">
                  <div className="text-3xl font-bold text-[#685AAD] truncate">
                    {eTokis}
                  </div>
                  <div className=" flex items-center justify-center">
                    <Image  loading="lazy"  src={etokiicon} alt="" className="w-9 h-9" />
                  </div>
                </div>

                <div className=" mx-auto">
                  <button
                    onClick={() => {
                      setActiveSidebarItem("Refer your Friends");
                    }}
                    className="flex-1 bg-[#685AAD] text-white py-[3px] px-10  rounded-lg text-xs flex items-center justify-center gap-1 hover:cursor-pointer"
                  >
                    <Image  loading="lazy" 
                      src={EPlusIcon}
                      alt=""
                      className="w-5 h-5 hover:cursor-pointer"
                    />{" "}
                    etokis
                  </button>
                </div>
              </div>
              {/* 2 */}
              <div
                className={` flex flex-col space-y-2 pb-2 pt-4 px-4  bg-purple-100  rounded-3xl w-[100%] custom-2xl:w-[18rem] bg-[#EDE8FA]`}
              >
                <div className=" flex justify-between items-center bg-purple-300 rounded-2xl px-4 pl-6 py-[10px] bg-[#ffffff84]">
                  <div className="text-3xl font-bold text-[#685AAD] truncate max-w-[12rem]">
                    {/* {earnedThisMonthEtokis} */}
                    {erroretokies?"0":(isLoadingetokies? "loading...":(etokies?.filter((etokie:any) => new Date(etokie.createdAt).getMonth() === new Date().getMonth() && new Date(etokie.createdAt).getFullYear() === new Date().getFullYear()).reduce((sum:any, etokie:any) => sum + etokie.amount, 0)))}
                  </div>
                  <div className=" flex items-center justify-center">
                    <Image  loading="lazy"  src={earningsinactive} alt="" className="w-6 h-6" />
                  </div>
                </div>

                <div className=" mx-auto">
                  <p className="text-[#685AAD] text-lg font-medium">
                    Earned This month
                  </p>
                </div>
              </div>
              {/* 3 */}
              <div
                className={`flex  gap-5 items-center pb-1 pt-3 px-6  bg-purple-100  rounded-3xl w-full ${
                  isLargeScreen ? "max-w-[23rem]" : "max-w-[18rem]"
                } bg-[#EDE8FA]`}
              >
                <div className="level h-[103px]">
                  <Image  loading="lazy" 
                    src={
                      level == "1"
                        ? level1
                        : level == "2"
                        ? level2
                        : level == "3"
                        ? level3
                        : level == "4"
                        ? level4
                        : level == "5"
                        ? level5
                        : level == "6"
                        ? level6
                        : level == "7"
                        ? level7
                        : level == "8"
                        ? level8
                        : level == "9"
                        ? level9
                        : level == "10"
                        ? level10
                        : level1
                    }
                    alt=""
                    className=" h-full "
                  />
                </div>
                <div className="content flex flex-col w-full">
                  <p className="text-[#685AAD]  text-lg font-bold"> eTokis</p>
                  <p className="text-[#685AAD]  text-lg font-medium ">
                    {level == "10" ? (
                      <span>All Level Completed!</span>
                    ) : (
                      <span>Left for level {level + 1}</span>
                    )}
                  </p>
                  <div className="w-full bg-white h-2 rounded-full mt-2">
                    <div
                      className={`w-[20%] h-full bg-[#9252FF] rounded-full`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`block   ${
                isLargeScreen ? "mb-16" : "mb-[390px] custom-lg:mb-[300px]"
              } `}
            >
              &nbsp;
            </div>

            <div className="">
              <div className="grid gap-5 grid-cols-1 custom-2xl:grid-cols-8 custom-2xl:grid-rows-5 h-screen ">
                {/* -------------schedule------- */}
                <div className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl px-6 py-5 col-span-3 row-span-5 ">
                  <div className="flex  justify-between items-center">
                    <h1 className="font-bold text-xl">THIS WEEK’S SCHEDULE</h1>
                    <Image  loading="lazy"  src={lightcalender} alt="" className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col gap-6 mt-4 overflow-y-auto scrollbar-none h-[95%]">
                    {sessionData.length > 0 &&
                    sessionData.filter(
                      (request) =>
                        request.status === "accepted" &&
                        request.meetingCompleted === false
                    ).length !== 0 ? (
                      <>
                        {sessionData
                          .filter(
                            (request) =>
                              request.status === "accepted" &&
                              request.meetingCompleted === false
                          )
                          .map((request) => {
                            return (
                              <div
                                key={request._id}
                                className="bg-[#A296CC] rounded-lg px-6 py-2 flex justify-between "
                              >
                                <div className="pl-2">
                                  <h1 className="font-bold text-white text-lg">
                                  {request.subjects || ""}
                                  </h1>
                                  <p className=" text-white text-lg ">
                                  {request?.studentdetails?.firstName ||
                                          "Your Student"}
                                  </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <button className="text-white bg-[#685AAD] rounded-md px-2 py-1 text-sm">
                                    Edit Session
                                  </button>
                                  <a href={request?.startLink || "#"} target="_blank">

                                  <button className="text-white bg-[#8653FF] rounded-md px-2 py-1 text-sm">
                                    Meeting Link
                                  </button>
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                {/* ------------calendar----------- */}
                <div className=" overflow-y-auto scrollbar-none px-6 py-6 bg-[#EDE8FA] text-[#685AAD] rounded-2xl  col-span-3 row-span-3">
                  <div className=" h-full">
                    <div className="flex  justify-between items-center px-6">
                      <h1 className="font-bold text-xl custom-2xl:text-3xl ">
                        {currentDate.toLocaleString("default", {
                          month: "short",
                        })}{" "}
                        {currentDate.getFullYear()}
                      </h1>
                      <Image  loading="lazy" 
                        onClick={() => {
                          setActiveSidebarItem("");
                        }}
                        src={lightcalender}
                        alt=""
                        className="w-6 h-6 "
                      />
                    </div>

                    <div className="calendar bg-[#EDE8FA] w-full rounded-xl custom-2xl:rounded-3xl  py-4 custom-2xl:py-7 ">
                      <div className="grid grid-cols-7 gap-1 sm:gap-3 custom-2xl:gap-5  text-center place-content-center px-3">
                        {/* Week day headers */}
                        {view === "month" &&
                          ["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                            <span
                              key={day}
                              className="text-center text-[#6F697D]  flex items-center justify-center     text-sm sm:text-xl custom-2xl:text-2xl   "
                            >
                              {day}
                            </span>
                          ))}

                        {/* Calendar days */}

                        {calendarDays.map((day, index) => {
                          const session2 = getSessionForDate(day);
                          const isCurrentMonth = isSameMonth(day, currentDate);
                          return (
                            <div
                              onMouseEnter={() => {
                                // @ts-ignore
                                setpopup(day);
                              }}
                              onMouseLeave={() => {
                                setpopup(null);
                              }}
                              key={index}
                              className={`flex items-center justify-center rounded-full  relative   custom-xl:rounded-full  text-center  mx-auto  ${
                                session2 && session2.status === "accepted"
                                  ? "bg-[#8558f9] text-white"
                                  : session2?.status === "pending"
                                  ? "bg-[#4ddfea] text-white"
                                  : session2?.status === "rejected"
                                  ? "bg-[#ff9580] text-white"
                                  : "bg-transparent"
                              }  ${
                                isCurrentMonth
                                  ? "text-[#685BAB]"
                                  : "text-[#6F697D]"
                              }  `}
                            >
                              <span
                                className={`text-sm sm:text-xl custom-2xl:text-2xl flex items-center justify-center  text-center  h-8 sm:h-[52px] w-8 sm:w-[52px]  `}
                              >
                                {format(day, "d")}
                              </span>

                              {session2 && (
                                <>
                                  {popup === day && (
                                    <div
                                      className={`${
                                        session2.status === "accepted"
                                          ? "bg-[#8558f9]"
                                          : session2.status === "pending"
                                          ? "bg-[#4ddfea]"
                                          : "bg-[#ff9580]"
                                      } text-white p-4  min-h-28 w-36  py-2 flex  items-start absolute  top-14  custom-2xl:top-14   left-1/2 transform -translate-x-1/2  z-50 rounded-3xl transition-all duration-300 `}
                                    >
                                      <div className="space-y-1 w-full">
                                        <div className="text-2xl font-semibold border-b border-white">
                                          Session
                                        </div>
                                        <div className="text-xl">
                                          {session2.subjects}
                                        </div>
                                        <div className="text-lg">
                                          {session2.time}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {/* ---------completed session------------ */}

                <div className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl p-4 col-span-3 custom-2xl:col-span-2 row-span-3 w-full">
                  <div className="flex  justify-between items-center">
                    <h1 className="font-bold text-xl uppercase">
                      completed sessions
                    </h1>
                    <Image  loading="lazy"  src={sessionicongray} alt="" className="w-5 h-5" />
                  </div>

                  <div className="mt-8">
                    {sessionData.length > 0 &&
                    sessionData.filter(
                      (request) =>
                        request.status === "accepted" &&
                        request.meetingCompleted === true
                    ).length !== 0 ? (
                      <>
                        {sessionData
                          .filter(
                            (request) =>
                              request.status === "accepted" &&
                              request.meetingCompleted === true
                          )
                          .map((request) => {
                            return (
                              <div
                                key={request._id}
                                className="flex justify-between items-center border-b-2 border-[#8b55ff39] py-3"
                              >
                                <div className="flex flex-col  ">
                                  <h3 className="text-[#8653FF] text-lg">
                                    {
                                    //@ts-ignore
                                    request?.studentdetails?.firstName}
                                  </h3>
                                  <div className="flex justify-between gap-4 ">
                                    <span className="text-base">DATE</span>
                                    <span className="text-base">
                                    <span className="text-sm">{`${new Date(
                                request.date
                              )
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "-")
                                .slice(0, 10)}`}</span>
                                    </span>
                                  </div>
                                </div>

                                <div>
                                  <button
                                  onClick={()=>{setActiveSidebarItem("Session overview")}}
                                  className="bg-[#8653FF] text-white px-6 py-1.5 rounded-md text-sm">
                                    View
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                {/* ---------refer friends--------- */}
                <div className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl p-4  text-xl col-span-3 ">
                  <div className="flex  justify-between items-center">
                    <h1 className="font-bold text-xl uppercase">
                      Prefer your friends
                    </h1>
                    <Image  loading="lazy"  src={refergray} alt="" className="w-5 h-5" />
                  </div>

                  <div>
                    <p className="text-sm text-[#8653FF] font-bold">
                      Refer your friends, get eTokis to spend on courses and
                      more
                    </p>
                    <p className="text-sm text-[#685AAD] font-normal">
                      Get 10 eTokis for each student and 5 eTokis for each tutor
                      you successfully refer.
                    </p>
                  </div>
                </div>
                {/* --------24hr support----------- */}
                <div className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl p-4 col-span-3 custom-2xl:col-span-2  text-xl flex flex-col justify-between  ">
                  <div className="flex  justify-between items-center">
                    <h1 className="font-bold text-xl uppercase">24H SUPPORT</h1>
                    <Image  loading="lazy"  src={chaticon} alt="" className="w-5 h-5" />
                  </div>

                  <div className=" ">
                    <div className="flex flex-col">
                      <span className="text-[#685AAD] text-sm">Need help?</span>
                      <span className="text-[#685AAD] text-sm">
                        Contact us.
                      </span>
                    </div>
                  </div>
                </div>

                {/* -----Notifications----------- */}

                <div className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl p-4  text-xl col-span-3 ">
                  <div className="flex  flex-col">
                    <h1 className="font-bold text-xl uppercase">
                      Trial Session
                    </h1>
                    <p className="text-base font-medium text-[#A096C8]">
                      You have a new trial session request
                    </p>
                    {/* <Image  loading="lazy"  src={bellgray} alt="" className="w-4 h-4" /> */}
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="name font-medium">Name</p>
                    <div className="btns flex gap-3">
                      <button className="bg-[#7565A4] px-5 py-1 rounded-full text-white text-lg">
                        Deny
                      </button>
                      <button className="bg-[#8358F7] px-5 py-1 rounded-full text-white text-lg">
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
                {/* ------chat--------- */}
                <div className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl p-4 col-span-3 custom-2xl:col-span-2 row-span-1  text-xl scrollbar-none">
                  <div className="flex  justify-between items-center">
                    <h1 className="font-bold text-xl">CHAT</h1>
                    <Image  loading="lazy"  src={chat} alt="" className="w-4 h-4" />
                  </div>

                  <div className="overflow-y-auto  h-[92%] scrollbar-none">
                    <div className="border-b-2 border-[#8b55ff39] py-2 ">
                      <h1 className="text-sm text-[#685AAD]">MR.Name</h1>
                      <p className="text-xs text-[#685AAD]">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elittetur adipisicing elittetur{" "}
                      </p>
                    </div>
                    <div className="border-b-2 border-[#8b55ff39] py-2 ">
                      <h1 className="text-sm text-[#685AAD]">MR.Name</h1>
                      <p className="text-xs text-[#685AAD]">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elittetur adipisicing elittetur{" "}
                      </p>
                    </div>
                    <div className="border-b-2 border-[#8b55ff39] py-2 ">
                      <h1 className="text-sm text-[#685AAD]">MR.Name</h1>
                      <p className="text-xs text-[#685AAD]">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elittetur adipisicing elittetur{" "}
                      </p>
                    </div>
                    <div className="border-b-2 border-[#8b55ff39] py-2 ">
                      <h1 className="text-sm text-[#685AAD]">MR.Name</h1>
                      <p className="text-xs text-[#685AAD]">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elittetur adipisicing elittetur{" "}
                      </p>
                    </div>
                    <div className="border-b-2 border-[#8b55ff39] py-2 ">
                      <h1 className="text-sm text-[#685AAD]">MR.Name</h1>
                      <p className="text-xs text-[#685AAD]">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elittetur adipisicing elittetur{" "}
                      </p>
                    </div>
                    <div className="border-b-2 border-[#8b55ff39] py-2 ">
                      <h1 className="text-sm text-[#685AAD]">MR.Name</h1>
                      <p className="text-xs text-[#685AAD]">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elittetur adipisicing elittetur{" "}
                      </p>
                    </div>
                    <div className="border-b-2 border-[#8b55ff39] py-2 ">
                      <h1 className="text-sm text-[#685AAD]">MR.Name</h1>
                      <p className="text-xs text-[#685AAD]">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elittetur adipisicing elittetur{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // ---------------------------My session--------------------------------------------------------------
      case "Session overview":
        return (
          <Session
            setActiveFindEtutor={setActiveSidebarItem}
            setActiveMYEtutor={setActiveSidebarItem}
            setTutor={undefined}
            showchat={undefined}
            tutortomessage={undefined}
          />
        );

      case "My Students":
        return <MyEtutor tutor={undefined} showchatvalue={false} />;

      case "Calendar":
        return (
          <>
            <Calender
              setActiveFindEtutor={function (item: string): void {
                throw new Error("Function not implemented.");
              } }
              setActiveMYEtutor={function (item: string): void {
                throw new Error("Function not implemented.");
              } }
              setTutor={undefined}
              showchat={undefined}
              tutortomessage={undefined} 
              data={sessionData}            />
          </>
        );
      case "Find eTutor":
        return (
          <div>
            <FindEtutor />
          </div>
        );
      case "Earnings":
        return <Earnings teacher={teacher} />;
      case "Support":
        return <ContactSupport />;
      case "Refer your Friends":
        return <ReferYourFriends />;
      case "Activity":
        return (
          session?.user?.isAdmin && (
           <Activity teacher={teacher} etokiesprop={undefined} sessionData={sessionData}/>
          )
        )
      case "Settings":
        return <Setting teacher={teacher} profilePicture={setProfilepicture} />;
      case "Useful links":
        return <UsefulLinks />;
      default:
        return <div>Select a tab from the sidebar</div>;
    }
  };


  if(session?.user?.role === "teacher"){

    return (
      <div className="flex min-h-screen bg-white relative z-0 max-w-[1920px] w-full mx-auto">
        {/* Sidebar */}
        <aside
          className={` ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } custom-lg:translate-x-0 fixed custom-lg:static inset-y-0 left-0 z-50 max-w-[20rem] sm:max-w-[25rem] w-full  min-h-screen  rounded-tr-3xl rounded-br-3xl bg-[#E6E4F2] text-white flex flex-col transition-transform duration-300 ease-in-out pl-5 pr-9 pt-8 custom-2xl:pt-11 pb-4`}
        >
          <div className="flex items-center mb-[23.5%] pb-2 pl-7">
            {session.user.isAdmin === true ? (

              <Image  loading="lazy"  src={adminlogo} alt="" className="w-52 sm:w-[17rem]" />
            ):(
              
              <Image  loading="lazy"  src={logo} alt="" className="w-52 sm:w-[17rem]" />
            )}
          </div>
          <nav className="flex-grow flex flex-col">
            <ul className="space-y-2 flex-grow">
              {sidebarItems
                .filter(
                  (item) => !["Settings", "Useful links"].includes(item.name)
                ).filter((item)=>(
                  session.user.isAdmin ? item:!["Activity"].includes(item.name)
                ))
                .map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => {
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
                  ["Settings", "Useful links"].includes(item.name)
                )
                .map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => {
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
        <main className="flex-1 px-9 py-4 overflow-auto  bg-transparent">
          <header
            className={`flex justify-between items-center  ${
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
  
              {/* -------profile complete------- */}
              {/* {activeSidebarItem === "Dashboard" && (
                <div className=" absolute mb-28 custom-xl:mb-8 hidden sm:block right-4   top-[3.7rem] max-w-[20.5rem]  custom-xl:max-w-[21.5rem]  ">
                  <div className="flex  items-center  ">
                    <div>
                      <h1 className="font-bold text-xl custom-xl:text-3xl   text-[#685AAD] pr-2 custom-xl:pr-14">
                        Complete&nbsp;your&nbsp;report
                      </h1>
                    </div>
                    <Image  loading="lazy"  src={rightarrow} alt="" className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-[#685AAD] pb-3">
                      Monthly Student Progress Report
                    </span>
                    <div className="w-full bg-[#DBD8EF] h-2 rounded-full">
                      <div
                        className={`w-[${completeprofilestatus}%] h-full bg-[#00DAE5] rounded-full`}
                      ></div>
                    </div>
                  </div>
                </div>
              )} */}
  
              <div
                onClick={toggleProfile}
                className={`flex bg-[#EDE8FA] hover:cursor-pointer  px-2 py-1 justify-between w-[9rem] custom-2xl:w-[12.5rem]   h-10 custom-2xl:h-11 items-center rounded-md ${
                  isProfileOpen ? "border border-[#685aad7a]" : "border-0"
                }`}
              >
                <div className="w-6 custom-2xl:w-7 h-6 custom-2xl:h-7  rounded-full overflow-hidden flex items-center">
                  <img src={profilepicture || teacher?.user?.profilePicture} alt="" className="object-cover object-center" />
                </div>
                {/* <div className="flex items-center  w-full  gap-2 custom-2xl:gap-4">
  
                </div> */}
                <span className="text-sm custom-2xl:text-base font-bold text-[#685AAD]">
                  {firstname}
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
  }
  else if(session?.user?.role === "parent"){
      router.push('/parent')
  }else if(session?.user?.role === "student"){
      router.push('/studentdashboard')
  }


};

export default SessionsDashboard;
