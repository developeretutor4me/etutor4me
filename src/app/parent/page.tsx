"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import Dashboard from "./components/Dashboard";
import logo from "../../../public/parentlogo.svg";
import Adminlogo from "../../../public/adminParentLogo.svg";
import Image from "next/image";
import Home1 from "../../../public/homeicon.svg";
import session1 from "../../../public/sessionicon.svg";
import calender from "../../../public/calander.svg";
import eicon from "../../../public/eicon.svg";
import find from "../../../public/findEtutor.svg";
import membership from "../../../public/membership.svg";
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
import chat2 from "../../../public/chat.svg";
import bellgray from "../../../public/bellicongrat.svg";
import activityWhite from "../../../public/activityWHite.svg";
import activityBlue from "../../../public/activityBlue.svg";
import chaticon from "../../../public/chaticon.svg";
import refergray from "../../../public/grayrefer.svg";
import rightarrow from "../../../public/arrowwww.svg";
import Calender from "./components/Calender";
import MyEtutor from "./components/MyEtutor";
import FindEtutor from "./components/FindEtutor";
import MyMembership from "./components/MyMembership";
import ContactSupport from "./components/ContactSupport";
import ReferYourFriends from "./components/ReferYourFriends";
import Setting from "./components/Settings";
import UsefulLinks from "./components/UsefulLinks";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";
import { io } from 'socket.io-client';
import { useToast } from "@/hooks/use-toast"
import Head from 'next/head'
const SOCKET_URL = 'https://etutor4me-production.up.railway.app'; // Backend URL
const socket = io(SOCKET_URL, {
  withCredentials: true,
});

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
  const { toast } = useToast();

  const { data: session, status,update } = useSession();
  const [activeSidebarItem, setActiveSidebarItem] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [previousSidebarItem, setPreviousSidebarItem] = useState("");
  const [firstName, setFirstName] = useState("Loading...");
  const [parentData, setParentData] = useState<any>(null);
  const Router = useRouter();
  const [etokies, setEtokies] = useState(0);
  const [setsessionleft, setSetsessionleft] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null); // Reference to your component
  const [FetchedUserData, setFetchedUserData] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [sessionData, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error2, setError] = useState<string | null>(null);
  const [comingvalue, Setsetcomingvalue] = useState("");
  const [tutor, setTutor] = useState(null);
  const [tutortomessage, settutortomessage] = useState(null);
  const [chat, setchat] = useState(false);
  const [Messages, setMessages] = useState("");
  const [recievedmessages, setRecievedmessages] = useState([]);
  const [isLoading2, setIsLoading] = useState(true);
  const [progress, setprogress] = useState(20)
  const [expandedRequestId, setexpandedRequestId] = useState(null);
  const [confirmedState, setConfirmedState] = useState(false);
  const [unconfirmedState, setUnconfirmedState] = useState(false);
  const [canceledState, setCanceledState] = useState(false);
  const [redeem, setredeem] = useState(false)
  const [view, setView] = useState("month"); // 'month' or 'week'
  const [popup, setpopup] = useState(null);
  const [Trial, setTrial] = useState(false)
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const router = useRouter();
  const [profilepicture, setprofilepicture] = useState<any>(null)
  const [radeemLoading, setRadeemLoading] = useState(false)
  
  const [terminateeng, setterminateeng] = useState<any>(null)











  const weeks = eachWeekOfInterval(
    { start: monthStart, end: monthEnd },
    { weekStartsOn: 1 } // Monday as week start
  );
  // Filter sessions based on states
  const filteredSessions = useMemo(() => {
    
      return sessionData;
  
  }, [sessionData,session]);

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
    return filteredSessions.filter((session) => !session.meetingCompleted).find((session) =>
      isSameDay(new Date(session.date), date)
    );
  };

 

  const userID = session?.user.id;
  // fetching the senders----------recieved messages-----------
  const fetcher = async (url:any) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch senders");
    }
    return response.json();
  };

  // Modified to use a different name for SWR data
  const {
    data: senderMessages,
    error,
    isLoading,
  } = useSWR(`/api/recipient/messages?recipientId=${userID}`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 0, // Set to a value in milliseconds if you want auto-refresh
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error("Error fetching senders:", error);
    },
  });

  // redeem code////
  const handleRedeem = async () => {
    if (etokies >= 50) {
      setRadeemLoading(true);
  
      try {
        const response = await fetch('/api/redeem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ etokies }),
        });
  
        if (!response.ok) {
          // If the response status is not OK (e.g., 4xx or 5xx), throw an error
          throw new Error(`Failed to redeem: ${response.statusText}`);
        }
  
        const data = await response.json();
  
        // Handle successful response
        if (data.success) {
          let updatedSessions = setsessionleft + 1;
          let updatedEtokies = etokies - 50;
  
          await  setSetsessionleft(updatedSessions); // Update sessions left
         await  setEtokies(updatedEtokies); 
          toast({
            title: "Redeem Successful",
            description: `You have successfully redeemed 50 eTokens.`,
            variant: "default",
          });
        } else {
          toast({
            title: "Redeem Failed",
            description: "Something went wrong. Please try again.",
            variant: "default",
          });
        }
      } catch (error) {
        // Handle errors
        console.error('Error during redeem process:', error);
        toast({
          title: "Error",
          description: "An error occurred while redeeming. Please try again later.",
          variant: "default",
        });
      } finally {
        setRadeemLoading(false); // Ensure loading state is reset
      }
    } else {
      toast({
        title: "Insufficient eTokens",
        description: "You need at least 50 eTokens to redeem.",
        variant: "default",
      });
    }
  };

  // Update state when SWR data changes
  useEffect(() => {
    if (senderMessages) {
      setRecievedmessages(senderMessages);
    }
  }, [senderMessages]);

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

  useEffect(() => {
    const storedItem = localStorage.getItem("activeSidebarItem");
    if (storedItem) {
      setActiveSidebarItem(storedItem);
      localStorage.removeItem("activeSidebarItem"); // Clean up if only needed for navigation
    }
  }, []);

  // fetching parent data
  async function fetchParentData(userId: string) {
    const response = await fetch("/api/parentapis/fetch-parent-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      console.error("Failed to fetch parent data");
    }

   

      const data = await response.json();
      setParentData(data.parentData);
      
      return data.parentData;
    
  }

  // fetching user data...........
  async function fetchUserdata(userId: any) {
    try {
      const response = await fetch("/api/Fetch-all-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      // Handle the response based on the status
      const data = await response.json(); // Read the response body once

      if (!response.ok) {
        // Throw an error if the response is not OK
        console.error(
          data.error || "An error occurred while fetching the user."
        );
      }
      setFetchedUserData(data.user); // Set the fetched user data
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  useEffect(() => {
    const fetchRequests = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/fetch-send-requests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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

    useEffect(() => {
      const fetchFirstName = async () => {
        try {
          const response = await fetch("/api/first-name");
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.error || "Failed to fetch first name");
          }
  
          setFirstName(data.firstName);
  
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchFirstName();
    }, [session]);

  useEffect(() => {
    
      fetchUserdata(session?.user.id || "");

      // @ts-ignore

      if(!parentData || parentData == null){

        
        fetchParentData(session?.user.id || "");
      }
      setSetsessionleft(parentData?.user?.sessionsPerMonth)

      setEtokies(parentData?.user?.etokis || 0);


      setFirstName(parentData?.firstName || "");
   
  }, [parentData?.firstName, parentData?.user?.etokis, parentData?.user?.sessionsPerMonth, session]);


  const sidebarItems = [
    { name: "Dashboard", icon: Home1 },
    { name: "My Sessions", icon: session1 },
    { name: "Calendar", icon: calender },
    { name: "My eTutor", icon: eicon },
    { name: "Find eTutor", icon: find },
    { name: "My Membership", icon: membership },
    { name: "Contact Support", icon: contact },
    { name: "Refer your Friends", icon: refer },
    { name: "Activity", icon: activityBlue  },

    // { name: "Activity", icon: activity },
    { name: "Settings", icon: setting },
    { name: "Useful links", icon: link },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // -----------calendar--------------------------------

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) =>
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() -
      i
  ).reverse();

  const nextMonthDays = Array.from(
    { length: 42 - (daysInMonth + firstDayOfMonth) },
    (_, i) => i + 1
  );

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const isHighlighted = (day: number) => {
    const dateString = new Date(
      `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00.000Z`
    ).toISOString();

    return sessionData
      .filter(
        (request) =>
          request.status === "accepted" 
      )
      .some((session) => session.date === dateString);
  };

  const getSessionMessage = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const session = sessionData.find((session) => session.date === dateString);
    // @ts-ignore
    return session ? session.message : "";
  };

  const handleMouseEnter = (event: React.MouseEvent, day: number) => {
    if (isHighlighted(day)) {
      const rect = event.currentTarget.getBoundingClientRect();
      setPopupPosition({ x: rect.left, y: rect.bottom });
      setHoveredDate(day);
    }
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  // -----------calendar--------------------------------



  useEffect(() => {
    if (socket && session?.user.id) {
      // Join the socket room based on userId (either student or teacher)
      socket.emit('join', session?.user.id);
  
      // Listen for incoming chat messages
      

      socket.on('notification', (notification) => {
        if (notification.senderId !== session?.user.id) {
          // Handle notification display (e.g., badge, toast)
          // showNotification(notification);
          toast({
            title: "New Message",

            description: notification.content,
            variant: "default",
          });
        }
      });


    }
  
    return () => {
      if (socket && session?.user.id) {
        // Leave the socket room when the component unmounts
        socket.emit('leave', session?.user.id);
  
        // Cleanup the listener to avoid memory leaks and duplicate listeners
        socket.off('chatMessage');
        socket.off('notification');
      }
    };
  }, [socket, session?.user.id]);  // Run this effect when `socket` or `userId` changes
    
  

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
          <div className="  h-fit    ">
            {/* <Dashboard /> */}

            {/* top left box TOKIs */}
            <div className=" custom-xl:w-[80%] sm:max-w-[40rem]   flex  items-start flex-col custom-2xl:flex-row gap-6 absolute top-14 custom-lg:top-0 mt-4  ">
              <div className=" flex flex-col space-y-3 py-4 px-6  bg-purple-100  rounded-2xl w-[100%] sm:w-[24rem] bg-[#EDE8FA]">
                <div className=" flex justify-between items-center bg-purple-300 rounded-full px-4 pl-6 py-[10px] bg-[#A296CC]">
                  <div className="text-3xl font-bold text-white">{etokies}</div>
                  <div className=" flex items-center justify-center">
                    <Image  loading="lazy"  src={etokiicon} alt="" className="w-9 h-9" />
                  </div>
                </div>

                <div className="flex  space-x-6 mt-4 hover:cursor-pointer px-2 pt-2">
                  <button
                    onClick={() => {
                      setActiveSidebarItem("Refer your Friends");
                    }}
                    className="flex-1 bg-[#685AAD] text-white py-[2px] px-4  rounded-md text-xs flex items-center justify-center gap-1 hover:cursor-pointer"
                  >
                    <Image  loading="lazy" 
                      src={EPlusIcon}
                      alt=""
                      className="w-6 h-6 hover:cursor-pointer"
                    />{" "}
                    etokis
                  </button>
                  <button
                  onClick={handleRedeem}
                    onMouseEnter={()=>{setredeem(true)}}
                    onMouseLeave={()=>{setredeem(false)}}
                  className="flex-1 bg-[#8653FF] text-white py-[2px] px-4 rounded-md flex items-center justify-center gap-1 hover:cursor-pointer relative">
                    {radeemLoading ? "wait...":"Redeem"} 
                    <Image  loading="lazy"  src={redeemIcon} alt="" className="w-6 h-6" />
                    {redeem && (
                    <div className="hover absolute w-[340px] h-[150px] top-0 left-40 rounded-lg p-4 text-start bg-[#8450ff] text-xl overflow-auto scrollbar-none">
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, unde? Quos reprehenderit non est, quis aliquid necessitatibus illum porro ex ipsa. Voluptatibus, nostrum ratione rerum numquam dolore, non tempore iste consequatur vel vitae ab recusandae qui necessitatibus ea officiis amet.
                    </div>

                    )}  
                  </button>
                </div>
              </div>
              <div className="bg-[#EDE8FA] rounded-lg font-bold px-8 py-3 text-center text-base text-[#685AAD] ">
                SESSIONS&nbsp;LEFT:{" "} {setsessionleft}
              </div>
            </div>

            <div className="block mb-60  sm:mb-64 custom-lg:mb-[135px] text-transparent">
              a
            </div>

            <div className="">
              <div className="grid gap-5 grid-cols-1 custom-2xl:grid-cols-8 custom-2xl:grid-rows-5 h-fit ">
                {/* ------------calendar----------- */}
                <div className="overflow-y-auto scrollbar-none  py-5 px-2 bg-[#EDE8FA] text-[#685AAD] rounded-2xl  col-span-3 row-span-3 h-fit custom-2xl:h-[32.5rem]  ">
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
                          setActiveSidebarItem("Calendar");
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
                          ["S", "M", "T", "W", "T", "F", "S"].map(
                            (day) => (
                              <span
                                key={day}
                                className="text-center text-[#6F697D]  flex items-center justify-center     text-sm sm:text-xl custom-2xl:text-2xl   "
                              >
                                {day}
                              </span>
                            )
                          )}

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
                                session2 && (session2.status === "accepted")
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

                {/* -------------schedule------- */}
                <div className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl p-4 col-span-3 row-span-3 h-[32.5rem]  scrollbar-none">
                  <div className="flex  justify-between items-center px-4">
                    <h1 className="font-bold text-xl">THIS WEEK’S SCHEDULE</h1>
                    <Image  loading="lazy"  src={lightcalender} alt="" className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col gap-4 mt-6 overflow-y-auto h-[90%] scrollbar-none">
                    {sessionData
                      .filter(
                        (request) =>
                          request.status === "accepted" && (!request.meetingCompleted)
                      )
                      .slice(0, 10)
                      .map((request) => {
                        return (
                          <div
                            key={request._id}
                            className="bg-[#A296CC] rounded-2xl px-6 py-3 flex justify-between border "
                          >
                            <div className="pl-2">
                              <h1 className="font-semibold text-white text-xl">
                                {request.subjects}
                              </h1>
                              <p className=" text-white text-lg capitalize">
                                {" "}
                                {request.teacher?.contactInformation
                                  .firstName || "techer name"}
                              </p>
                            </div>
                            <div className="flex flex-col gap-1">
                              <button className="text-white bg-[#685AAD] rounded-md px-2 py-1 text-base">
                                Edit Session
                              </button>
                              <a href={request.joinLink} target="_blank">
                                <button className="text-white bg-[#8653FF] rounded-md px-2 py-1 text-base">
                                  Meeting Link
                                </button>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* ---------completed session------------ */}

                <div className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl p-4 col-span-3 custom-2xl:col-span-2 row-span-2 w-full">
                  <div className="flex  justify-between items-center">
                    <h1 className="font-bold text-xl uppercase">
                      completed sessions
                    </h1>
                    <Image  loading="lazy"  src={sessionicongray} alt="" className="w-5 h-5" />
                  </div>

                  {sessionData
                    .filter(
                      (request) =>
                        request.status === "accepted" 
                    )
                    .map((request) => {
                      return (
                        <div
                          key={request._id}
                          className="flex justify-between items-center border-b-2 border-[#8b55ff39] py-2"
                        >
                          <div className="flex flex-col ">
                            <h3 className="text-[#8653FF] text-sm capitalize">
                              {request.teacher?.contactInformation.firstName ||
                                ""}
                            </h3>
                            <div className="flex justify-between gap-4 ">
                              <span className="text-sm">DATE</span>
                              <span className="text-sm">{`${new Date(
                                request.date
                              )
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "-")
                                .slice(0, 10)}`}</span>
                            </div>
                          </div>

                          <div>
                            <button
                              onClick={() => {
                                setActiveSidebarItem("My Sessions");
                                Setsetcomingvalue("completed");
                              }}
                              className="bg-[#8653FF] text-white px-5 py-1 rounded-md text-sm"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* ------chat--------- */}
                <div className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl p-4 col-span-3 custom-2xl:col-span-2 row-span-3 text-xl">
                  <div className="flex  justify-between items-center">
                    <h1 className="font-bold text-xl">CHAT</h1>
                    <Image  loading="lazy"  src={chat2} alt="" className="w-4 h-4" />
                  </div>

                  {recievedmessages.map((message:any, index) => (
                    <div
                      key={index}
                      className="border-b-2 border-[#8b55ff39] py-2 hover:cursor-pointer"
                    >
                      <div
                        onClick={() => {
                          setActiveSidebarItem("My eTutor");
                          setchat(true);
                          // @ts-ignore
                          settutortomessage(message.details);
                        }}
                      >
                        <h1 className="text-sm text-[#685AAD]">
                          {" "}
                          
                          {message?.details.contactInformation.firstName}
                        </h1>
                        <p className="text-xs text-[#685AAD]">
                          about of the teacher
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* --------24hr support----------- */}
                <div
                  onClick={() => {
                    setActiveSidebarItem("Contact Support");
                  }}
                  className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl p-4 col-span-3  text-xl flex flex-col justify-between  hover:cursor-pointer "
                >
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

                <div className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl p-4  text-xl col-span-3 row-span-2">
                  <div className="flex  justify-between items-center">
                    <h1 className="font-bold text-xl uppercase">
                      NOTIFICATIONS
                    </h1>
                    <Image  loading="lazy"  src={bellgray} alt="" className="w-4 h-4" />
                  </div>

                  <div className=" mt-2 ">
                    <div className="border-b-2 border-[#8b55ff39] py-1">
                      <h1 className="text-md text-[#685AAD]">
                        Support Response
                      </h1>
                      <p className="text-sm text-[#685aad94]">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elittetur adipisicing elittetur{" "}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ---------refer friends--------- */}
                <div
                  onClick={() => {
                    setActiveSidebarItem("Refer your Friends");
                  }}
                  className=" bg-[#EDE8FA] text-[#685AAD] rounded-2xl p-4  text-xl col-span-3 hover:cursor-pointer"
                >
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
              </div>
            </div>
          </div>
        );

      // ---------------------------My session--------------------------------------------------------------
      case "My Sessions":
        return (
          <Session
            setActiveFindEtutor={setActiveSidebarItem}
            setActiveMYEtutor={setActiveSidebarItem}
            setcompleted={comingvalue}
            setTutor={setTutor}
            showchat={setchat}
            tutortomessage={settutortomessage}
            trialsession={setTrial} 
            parentdata={parentData}          />
            
        );

      case "Calendar":
        return (
          <>
            <Calender
              setActiveFindEtutor={setActiveSidebarItem}
              setActiveMYEtutor={setActiveSidebarItem}
              setTutor={setTutor}
              showchat={setchat}
              tutortomessage={settutortomessage}
            />
          </>
        );
      case "My eTutor":
        return (
          <MyEtutor
            tutorimp={tutortomessage}
            showchatvalue={chat}
            setActiveFindEtutor={setActiveSidebarItem}
            setTutor={setTutor} socket={socket}   showTerminateEngament={setterminateeng}         />
        );
      case "Find eTutor":
        return (
          <div>
            <FindEtutor
              setActiveMYEtutor={setActiveSidebarItem}
              sessiontutor={tutor}
              messagetutor={settutortomessage}
              showchat={setchat} trialrequest={Trial} parentdata={parentData} sessionData={sessionData} showTerminateEngament={terminateeng}            />
          </div>
        );
      case "My Membership":
        return <MyMembership parentdata={parentData} />;
      case "Contact Support":
        return <ContactSupport />;
      case "Refer your Friends":
        return <ReferYourFriends />;
      case "Activity":

        return (
          session?.user?.isAdmin && (
           <Activity parent={parentData} etokiesprop={undefined} sessionData={sessionData}/>
          )
        )
      case "Settings":
        return <Setting Uploadedprofilepicture={setprofilepicture} />;
      case "Useful links":
        return <UsefulLinks />;
      default:
        return <div>Select a tab from the sidebar</div>;
    }
  };


  if(session?.user?.role === "parent"){

    return (
      <>
  

      <div className="flex min-h-screen bg-white text-white relative z-0 max-w-[1920px] mx-auto  ">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } custom-lg:translate-x-0 fixed custom-lg:static inset-y-0 left-0 z-50 max-w-[20rem] custom-2xl:max-w-[25rem] w-full  min-h-screen  rounded-tr-3xl rounded-br-3xl bg-darkpurple text-white flex flex-col transition-transform duration-300 ease-in-out pl-5 pr-9 pt-8 custom-2xl:pt-11 pb-4`}
        >
          <div className="flex items-center mb-[23.5%] pb-2 pl-7">
            {session.user.isAdmin === true ? (

              <Image  loading="lazy"  src={Adminlogo} alt="" className="w-52 sm:w-[17rem]" />
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
                        setTutor(null);
                        if (item.name === "My Sessions") {
                          Setsetcomingvalue("upcoming");
                        }

                        if (window.innerWidth < 1024) {
                          setIsSidebarOpen(false);
                        }
                      }}
                      className={`flex   hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000  items-center w-full px-6 custom-2xl:px-9 py-3 sm:py-[18px] rounded-[22px]  transition-all  ${
                        activeSidebarItem === item.name
                          ? "bg-white  transition-all"
                          : "hover:bg-darkpurple transition-all"
                      }`}
                    >
                      <Image  loading="lazy" 
                        src={item.icon}
                        className="w-5 sm:w-6 h-5 sm:h-6 mr-7"
                        alt=""
                        style={{
                          filter:
                            activeSidebarItem === item.name
                              ? "none"
                              : "invert(1) sepia(1) saturate(0) brightness(140%) opacity(.8)",
                        }}
                      />
                      <p
                        className={`text-[#cac7d8] text-xl font-medium ${
                          activeSidebarItem === item.name
                            ? "text-customBlue"
                            : "text-[#cac7d8]"
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
                          : "hover:bg-darkpurple"
                      }`}
                    >
                      <Image  loading="lazy" 
                        src={item.icon}
                        className="w-5 sm:w-6 h-5 sm:h-6 mr-7"
                        alt=""
                        style={{
                          filter:
                            activeSidebarItem === item.name
                              ? "none"
                              : "invert(1) sepia(1) saturate(0) brightness(140%) opacity(.8)",
                        }}
                      />
                      <p
                        className={`text-[#cac7d8] text-xl font-medium ${
                          activeSidebarItem === item.name
                            ? "text-customBlue"
                            : ""
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
        <main className="flex-1 px-5 custom-lg:px-9 py-4 overflow-auto  bg-transparent   scrollbar-none  max-h-screen overflow-y-auto">
          <header className="flex justify-between items-center mb-8">
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
                  className="flex cursor-pointer  items-center relative top-4"
                >
                  <ChevronLeft
                    className="mr-2 cursor-pointer text-[#685AAD]"
                    size={24}
                  />

                  <h1 className="text-[#685AAD] text-xs sm:text-sm custom-lg:text-xl custom-2xl:text-2xl hidden sm:block">
                    Back
                  </h1>
                </div>
              )}

              {activeSidebarItem === "My Sessions" && (
                <h1 className="text-[#685AAD]  text-sm sm:text-md custom-lg:text-5xl  font-extrabold ml-0 sm:ml-6 absolute top-16 left-16 sm:relative sm:top-3 sm:left-8">
                  My&nbsp;Sessions
                </h1>
              )}
            </div>

            <div
              ref={targetRef}
              className="flex items-center space-x-4 relative -right-4 select-none "
            >
              {/* <Bell size={24} className="cursor-pointer text-darkBlue" /> */}
              <div className="flex gap-6 custom-2xl:gap-10 mr-2">
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
                <div className=" absolute mb-28 custom-xl:mb-8 hidden sm:block right-4 top-48 custom-lg:top-[8.9rem] custom-xl:top-[6.5rem] max-w-[20.5rem]  custom-xl:max-w-[26.5rem]  ">
                  <div className="flex  justify-between items-center">
                    <div>
                      <h1 className="font-bold text-xl custom-xl:text-3xl   text-[#685AAD] pr-2 custom-xl:pr-24">
                        Complete&nbsp;your&nbsp;profile
                      </h1>
                    </div>
                    <Image  loading="lazy"  src={rightarrow} alt="" className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-[#685AAD] pb-2">
                      Profile Status
                    </span>
                    <div className="w-full bg-[#DBD8EF] h-2 rounded-full">
                      <div
                        className={`w-[${progress}%] h-full bg-[#00DAE5] rounded-full`}
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
                <div className="w-6 custom-2xl:w-7 h-6 custom-2xl:h-7  rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    // @ts-ignore
                    src={profilepicture ||FetchedUserData?.profilePicture}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* <div className="flex items-center  w-full  gap-2 custom-2xl:gap-4">
  
                </div> */}
                <span className="text-sm custom-2xl:text-base font-bold text-[#685AAD]">
                  {firstName}
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
                    href="/parent/parentprofile"
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
                    onClick={() => {
                      setActiveSidebarItem("Settings");
                      setIsProfileOpen(false);
                    }}
                    className="block px-2  py-2 custom-2xl:py-3 text-sm text-[#685AAD]  border-b border-[#685aad7a] hover:cursor-pointer"
                  >
                    Settings
                  </a>
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
      </>
    );
  }else if(session?.user?.role === "teacher"){
    router.push('/etutor')
}else if(session?.user?.role === "student"){
    router.push('/studentdashboard')
}


};

export default SessionsDashboard;
