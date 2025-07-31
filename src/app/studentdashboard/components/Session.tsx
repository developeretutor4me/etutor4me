"use client";
import React, { useEffect, useState } from "react";
import tier from "../../../../public/tier.svg";
import message from "../../../../public/messageicon.svg";
import folder from "../../../../public/foldericon.svg";
import profile from "../../../../public/profileicon.svg";
import sample from "../../../../public/assets/heroimg.png";
import chaticon from "../../../../public/chaticonwhite.svg";
import foldericon from "../../../../public/folder icon white.svg";
import profilewhite from "../../../../public/profile icon white.svg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import noschedual from '../../../../public/noschedualsessions.svg'
import completed from '../../../../public/completedsession.svg'
import level1 from "../../../../public/level-1.svg";
import level2 from "../../../../public/level-2.svg";
import level3 from "../../../../public/level-3.svg";
import level4 from "../../../../public/level-4.svg";
import level5 from "../../../../public/level-5.svg";
import level6 from "../../../../public/level-6.svg";
import level7 from "../../../../public/level-7.svg";
import level8 from "../../../../public/level-8.svg";
import level9 from "../../../../public/level-9.svg";
import level10 from "../../../../public/level-10.svg";



import {
  Files,
  Folder,
  MessageCircle,
  MessageSquare,
  Text,
  User,
} from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

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
    country: string;
    phone: string;
    address: string;
  };
}

interface BookingRequest {
  duration: string;
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



interface sessionprops {
  setActiveFindEtutor: (item: string) => void;
  setActiveMYEtutor: (item: string) => void;
  setTutor: any;
  setcompleted?: string;
  showchat:any,
  tutortomessage:any,
  trialsession:any,
  studentdata:any

}

const SessionDashboard = ({
  setActiveFindEtutor,
  setActiveMYEtutor,
  setcompleted = "upcoming",
  setTutor,
  showchat,
  tutortomessage,
  trialsession,
  studentdata
}: sessionprops) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("individual");
  const [activeSubTab, setActiveSubTab] = useState(`${setcompleted}` || "upcoming");
  const { data: session } = useSession();
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedreq, setFetchedreq] = useState([]);
  const [starturl, setStarturl] = useState("");
  const [joinurl, setJoinurl] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [requestsfromteacher, setrequestsfromteacher] = useState([]);
  const [expandedRequestId, setexpandedRequestId] = useState(null)

  const [waiting, setWaiting] = useState(null);
  const [sendrequest, setsendrequest] = useState(null);
  const [level, setlevel] = useState("");




  useEffect(() => {
    const storedItem = localStorage.getItem("activeTab");
    if (storedItem) {
      setActiveTab(storedItem);
      localStorage.removeItem("activeSidebarItem"); // Clean up if only needed for navigation
    }
  }, []);


  // fetching incoming requests from teacher
  useEffect(() => {
    const userId = session?.user.id;

    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/Fetch-sendingrequests-fromteacher?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setrequestsfromteacher(data.requests);
       
      } catch (error) {
        // @ts-ignore
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [session, activeSubTab]);
  // fetching teacher....
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/api/fetchteachers"); // Adjust the API endpoint as necessary
        setTeachers(response.data);
      } catch (error) {
        setError("Error fetching teachers data");
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeachers();
  }, []);


  
  // send requests.....
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


  const updateRequestStatus = async (id: any, status: any) => {
    setWaiting(id); 
    try {
      const response = await axios.patch(`/api/Teacher-Request`, { id,status });
      

    } catch (err) {
      console.error(err);
    
      toast({
        title: "Failed to update the request status.",
        description: "",
        variant: "default",
      });
    }finally{
      setWaiting(null); 
    }
  };





  const tabs = [
    { id: "individual", label: "INDIVIDUAL SESSION" },
    { id: "group", label: "GROUP SESSION" },
    { id: "trial", label: "TRIAL SESSION" },
  ];

  const subTabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ];
  // @ts-ignore
  const getTabColor = (tabId) => {
    if (activeTab === "individual") {
      if (tabId === "group") return "#9B85C8";
      if (tabId === "trial") return "#6B5692";
    } else if (activeTab === "group") {
      if (tabId === "individual") return "#6B5692";
      if (tabId === "trial") return "#9B85C8";
    } else if (activeTab === "trial") {
      if (tabId === "group") return "#9B85C8";
      if (tabId === "individual") return "#6B5692";
    }
    return "#EDE8FA"; // Active tab color
  };

  return (
    <div className="w-full  h-full pt-4 bg-[#EDE8FA]  rounded-3xl  relative mt-12">
      <div className="flex justify-between items-start mb-4 absolute top-0 left-0 w-full">
        <div className=" grid grid-cols-3   rounded-tl-3xl rounded-tr-3xl h-10 sm:h-[89px] w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center flex-nowrap  font-normal box-border sm:font-bold text-xs px-2  sm:text-lg  transition-all
            ${
              tab.id === activeTab
                ? "bg-[#EDE8FA] text-[#685AAD] transition-all"
                : `text-white transition-all`
            }
            ${
              tab.id === "individual"
                ? "rounded-tl-3xl transition-all"
                : "transition-all"
            }
            ${
              tab.id === "trial"
                ? "rounded-tr-3xl custom-xl:rounded-none transition-all"
                : "transition-all"
            }
              
          `}
              style={{ backgroundColor: getTabColor(tab.id) }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white h-10 sm:h-[89px] w-[38%] rounded-bl-3xl     transition-all  hidden custom-xl:flex items-start  justify-center px-4 custom-lg:px-8 pb-4 rounded-tr-3xl">
          {activeTab === "trial" ? (
            ""
          ) : (
            <div className="text-[#685AAD] font-bold text-xs px-2 transition-all  w-[80%]   md:text-sm custom-xl:text-2xl h-full  rounded-md sm:rounded-xl mb-1 uppercase  bg-[#EDE8FA]  flex items-center justify-center ">
              Sessions&nbsp;left:{studentdata?.user?.sessionsPerMonth || 0}
            </div>
          )}
        </div>
      </div>

      <div className="mt-[50px] sm:mt-[128px] ml-3 ">
        {activeTab === "trial" ? (
          <div className="bg-[#473171] ml-2 sm:ml-10  py-3 px-3 text-sm rounded-xl w-fit flex ">
            <button
              onClick={() => setActiveSubTab("upcoming")}
              className={`flex-1 py-3 sm:py-6 px-7 sm:px-[51px]  text-center rounded-xl transition-all duration-300 ${
                activeSubTab === "upcoming"
                  ? "bg-[#8653FF] text-white transition-all"
                  : "text-[#d8b4fe] transition-all"
              }`}
            >
              Requests
            </button>
            <button
              onClick={() => setActiveSubTab("completed")}
              className={`flex-1 py-3 sm:py-6 px-[20px] sm:px-[46px] text-center rounded-xl transition-all duration-300 ${
                activeSubTab === "completed"
                  ? "bg-[#8653FF] text-white"
                  : "text-[#d8b4fe]"
              }`}
            >
              Application
            </button>
          </div>
        ) : (
          <div className="bg-[#473171] ml-2 sm:ml-10 py-3 px-3 text-sm rounded-xl w-fit flex  ">
            <button
              onClick={() => setActiveSubTab("upcoming")}
              className={`flex-1 py-3 sm:py-6 px-6 sm:px-12 text-center rounded-xl transition-all duration-300 ${
                activeSubTab === "upcoming"
                  ? "bg-[#8653FF] text-white"
                  : "text-[#d8b4fe]"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveSubTab("completed")}
              className={`flex-1 py-3 sm:py-6 px-6 sm:px-12 text-center rounded-xl transition-all duration-300 ${
                activeSubTab === "completed"
                  ? "bg-[#8653FF] text-white"
                  : "text-[#d8b4fe]"
              }`}
            >
              Completed
            </button>
          </div>
        )}
      </div>

      <div className="bg-[#a296cc] p-2 custom-xl:p-4 rounded-3xl mt-9  h-full overflow-auto ">
        {/* --------------individual session-----------------   */}
        {activeTab === "individual" && (
          <>
            <div>
              {activeSubTab === "upcoming" && (
                <>
                  {/* new one */}
                  <div className="px-2  py-2 custom-xl:px-7 custom-xl:py-5 w-full space-y-6">
                    {/* Header Row */}
                    <div className="hidden custom-xl:grid custom-xl:grid-cols-4 mb-5 text-sm custom-lg:text-xl custom-xl:pl-9  w-[68%] text-white">
                      <div className="px-4  ">Subject and level</div>
                      <div className="px-4  ">eTutor</div>
                      <div className="px-4  ">Duration</div>
                      <div className="px-4  ">Date and Time</div>
                    </div>

                    {/* Session Card */}


                    {requests.filter((request) =>request.status === "accepted" &&request.meetingCompleted === false).length !==0  ? (

                      <>
                    {requests.filter((request:any) =>request.status === "accepted" &&request.meetingCompleted === false).map((request) => {const isExpanded = expandedRequestId === request._id;
                        return (
                          <div
                            key={request._id}
                            className={`w-full transition-all duration-300 ease-in-out bg-[#564589] rounded-lg custom-xl:pl-9  ${
                              isExpanded
                              ? "h-auto custom-xl:h-28"
                              : "h-auto custom-xl:h-20"
                          } overflow-hidden cursor-pointer`}
                           // @ts-ignore
                          onMouseEnter={() => setexpandedRequestId(request._id)}
                          onMouseLeave={() => setexpandedRequestId(null)}
                          >
                            <div className="flex flex-col  custom-xl:flex-row custom-xl:items-start h-full">
                              {/* Content Section */}
                              <div className="flex-1 p-4 flex flex-col custom-xl:flex-row items-start custom-xl:items-center">
                                <div className="grid grid-cols-2 custom-xl:grid-cols-4 gap-4 w-full">
                                  {/* Subject */}
                                  <div className="flex flex-col custom-xl:block transition-all duration-300 ease-in-out custom-xl:pt-2">
                                    <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                      Subject and level
                                    </span>
                                    <span className="text-white text-base custom-xl:text-xl  font-medium">
                                      {request.subjects || ""} 
                                     
                                    </span>
                                    <div
                                      className={`text-white ${
                                        isExpanded
                                          ? "opacity-100 block transition-all duration-300 ease-in-out"
                                          : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                      }`}
                                    >
                                      PAYg session
                                    </div>
                                  </div>

                                  {/* Tutor */}
                                  <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                    <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                      eTutor
                                    </span>
                                    <span className="text-white text-base custom-xl:text-xl ">
                                      {
                                      // @ts-ignore
                                      request.teacher?.contactInformation?.firstName || "Your Teacher"}
                                    </span>
                                    <div
                                      className={` ${
                                        isExpanded
                                          ? "opacity-100 block transition-all duration-300 ease-in-out"
                                          : "opacity-0 hidden transition-all duration-300 ease-in-out "
                                      }`}
                                    >
                                      <div className="flex  gap-6 items-center  mt-2">
                                        <span>
                                          <Image  loading="lazy" 
                                          onClick={()=>{
                                            setActiveFindEtutor("My eTutor")
                                            tutortomessage(request.teacher)
                                            showchat(true)
                                          }}
                                            src={chaticon}
                                            alt=""
                                            className="w-5 h-5"
                                          />
                                        </span>
                                        <span>
                                          <Image  loading="lazy" 
                                           onClick={()=>{
                                            setActiveFindEtutor("My eTutor")
                                            tutortomessage(request.teacher)
                                            showchat(true)
                                          }}
                                            src={foldericon}
                                            alt=""
                                            className="w-5 h-5"
                                          />
                                        </span>
                                        <span
                                          onClick={() => {
                                            setActiveFindEtutor("Find eTutor");

                                            setTutor(request.teacher);
                                          }}
                                        >
                                          <Image  loading="lazy" 
                                            src={profilewhite}
                                            alt=""
                                            className="w-5 h-5"
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Duration */}
                                  <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                    <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                      Duration
                                    </span>
                                    <span className="text-white text-base custom-xl:text-xl">
                                      {request.duration || ""}
                                    </span>
                                  </div>

                                  {/* Date/Time */}
                                  <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                    <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                      Date and Time
                                    </span>
                                    <span className="text-white text-base custom-xl:text-xl">
                                      {`${new Date(request.date)
                                        .toLocaleDateString("en-GB")
                                        .replace(/\//g, "/")
                                        .slice(0, 10)}`}
                                    </span>
                                    <div
                                      className={`text-xl text-white ${
                                        isExpanded
                                          ? "opacity-100 block transition-all duration-300 ease-in-out"
                                          : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                      }`}
                                    >
                                      {`${new Date(request.date).toLocaleDateString("en-GB", { weekday: 'short' })}`} {request.time || ""}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Buttons Section */}
                              <div
                                className={`flex flex-col custom-xl:flex-row gap-2  custom-xl:gap-4  h-full ${
                                  isExpanded ? "py-6 px-4" : "p-4"
                                } transition-all duration-300 ease-in-out  custom-xl:pl-0 `}
                              >
                                <button
                                  onClick={() =>
                                    setActiveFindEtutor("Find eTutor")
                                  }
                                  className="w-full  custom-xl:h-full custom-xl:w-auto bg-[#473171] text-white px-8 py-2 rounded-md text-sm custom-xl:text-xl hover:bg-[#3d2961] transition-colors"
                                >
                                  Edit Session
                                </button>
                                <a href={request.joinLink} target="_blank">
                                  <button className="w-full custom-xl:h-full  custom-xl:w-auto bg-[#8653FF] text-white px-8 py-2 rounded-md text-sm custom-xl:text-xl hover:bg-[#7340ff] transition-colors">
                                    Meeting Link
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
</>

                    ):(

                      <Image  loading="lazy"  src={noschedual} alt="" className="mx-auto "/>
                    )}


                  </div>
                </>
              )}
            </div>




            
            <div>
              {activeSubTab === "completed" && (
                <div className="px-2  py-2 custom-xl:px-7 custom-xl:py-5 w-full space-y-6">
                  {/* Header Row */}
                  <div className="hidden custom-xl:grid custom-xl:grid-cols-4 mb-5 text-sm custom-lg:text-xl custom-xl:pl-9  w-[68%] text-white">
                    <div className="px-4  ">Subject and level</div>
                    <div className="px-4  ">eTutor</div>
                    <div className="px-4  ">Duration</div>
                    <div className="px-4  ">Date and Time</div>
                  </div>

                  {/* Session Card */}

                {requests.filter((request) =>request.status === "accepted" &&request.meetingCompleted === true).length !==0 ? (

                  <>

                  {requests.filter((request) =>request.status === "accepted" &&request.meetingCompleted === true).map((request) => {const isExpanded = expandedRequestId === request._id;
                      return (
                        <div
                          key={request._id}
                          className={`w-full transition-all duration-300 ease-in-out bg-[#564589] rounded-lg custom-xl:pl-9  ${
                            isExpanded
                            ? "h-auto custom-xl:h-28"
                            : "h-auto custom-xl:h-20"
                        } overflow-hidden cursor-pointer`}
                         // @ts-ignore
                        onMouseEnter={() => setexpandedRequestId(request._id)}
                        onMouseLeave={() => setexpandedRequestId(null)}
                        >
                          <div className="flex flex-col  custom-xl:flex-row custom-xl:items-start h-full">
                            {/* Content Section */}
                            <div className="flex-1 p-4 flex flex-col custom-xl:flex-row items-start custom-xl:items-center">
                              <div className="grid grid-cols-2 custom-xl:grid-cols-4 gap-4 w-full">
                                {/* Subject */}
                                <div className="flex flex-col custom-xl:block transition-all duration-300 ease-in-out custom-xl:pt-2">
                                  <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                    Subject and level
                                  </span>
                                  <span className="text-white text-base custom-xl:text-xl  font-medium">
                                    {request.subjects || ""} /{" "}
                                    {request.level || ""}
                                  </span>
                                  <div
                                    className={` text-white ${
                                      isExpanded
                                        ? "opacity-100 block transition-all duration-300 ease-in-out"
                                        : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                    }`}
                                  >
                                    hellloooo
                                  </div>
                                </div>

                                {/* Tutor */}
                                <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                  <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                    eTutor
                                  </span>
                                  <span className="text-white text-base custom-xl:text-xl ">
                                    {
                                    // @ts-ignore
                                    request.teacher?.contactInformation?.firstName || "Your Teacher"}
                                  </span>
                                  <div
                                    className={` ${
                                      isExpanded
                                        ? "opacity-100 block transition-all duration-300 ease-in-out"
                                        : "opacity-0 hidden transition-all duration-300 ease-in-out "
                                    }`}
                                  >
                                    <div className="flex  gap-6 items-center  mt-2">
                                      <span>
                                        <Image  loading="lazy" 
                                         onClick={()=>{
                                          setActiveFindEtutor("My eTutor")
                                          tutortomessage(request.teacher)
                                          showchat(true)
                                        }}
                                          src={chaticon}
                                          alt=""
                                          className="w-5 h-5"
                                        />
                                      </span>
                                      <span>
                                        <Image  loading="lazy" 
                                         onClick={()=>{
                                          setActiveFindEtutor("My eTutor")
                                          tutortomessage(request.teacher)
                                          showchat(true)
                                        }}
                                          src={foldericon}
                                          alt=""
                                          className="w-5 h-5"
                                        />
                                      </span>
                                      <span>
                                        <Image  loading="lazy" 
                                         onClick={() => {
                                          setActiveFindEtutor("Find eTutor");

                                          setTutor(request.teacher);
                                        }}
                                          src={profilewhite}
                                          alt=""
                                          className="w-5 h-5"
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Duration */}
                                <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                  <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                    Duration
                                  </span>
                                  <span className="text-white text-base custom-xl:text-xl">
                                    {request.duration || ""}
                                  </span>
                                </div>

                                {/* Date/Time */}
                                <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                  <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                    Date and Time
                                  </span>
                                  <span className="text-white text-base custom-xl:text-xl">
                                    {`${new Date(request.date)
                                      .toLocaleDateString("en-GB")
                                      .replace(/\//g, "-")
                                      .slice(0, 10)} (${request.time || ""})`}
                                  </span>
                                  <div
                                    className={`text-white  ${
                                      isExpanded
                                        ? "opacity-100 block transition-all duration-300 ease-in-out"
                                        : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                    }`}
                                  >
                                    time
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Buttons Section */}
                            <div
                              className={`flex flex-col custom-xl:flex-row gap-2  custom-xl:gap-4  h-full ${
                                isExpanded ? "py-6 px-4" : "p-4"
                              } transition-all duration-300 ease-in-out  custom-xl:pl-0 `}
                            >
                              <button className="w-full bg-transparent  custom-xl:h-full custom-xl:w-auto  text-transparent px-8 py-2 rounded-md ">
                                Edit Session
                              </button>

                              <button className="w-full custom-xl:h-full  custom-xl:w-auto bg-[#8753ff73] text-white px-14 py-2 rounded-md text-sm custom-xl:text-xl  transition-colors">
                                Completed
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
</>
                  ):(
                    <Image  loading="lazy"  src={completed} alt="" className="mx-auto "/>
                  )}


                </div>
              )}
            </div>
          </>
        )}

        {/* -----------------group session------------- */}
        {activeTab === "group" && (
          <>
          <div>
            {activeSubTab === "upcoming" && (
              <>
                {/* new one */}
                <div className="px-2  py-2 custom-xl:px-7 custom-xl:py-5 w-full space-y-6">
                  {/* Header Row */}
                  <div className="hidden custom-xl:grid custom-xl:grid-cols-4 mb-5 text-sm custom-lg:text-xl custom-xl:pl-9  w-[68%] text-white">
                    <div className="px-4  ">Subject and level</div>
                    <div className="px-4  ">eTutor</div>
                    <div className="px-4  ">Duration</div>
                    <div className="px-4  ">Date and Time</div>
                  </div>

                  {/* Session Card */}


                  {requests.filter((request) =>request.status === "accepted" &&request.meetingCompleted === false).length !==0  ? (

                    <>
                  {requests.filter((request) =>request.status === "accepted" &&request.meetingCompleted === false).map((request) => {const isExpanded = expandedRequestId === request._id;
                      return (
                        <div
                          key={request._id}
                          className={`w-full transition-all duration-300 ease-in-out bg-[#564589] rounded-lg custom-xl:pl-9  ${
                            isExpanded
                            ? "h-auto custom-xl:h-28"
                            : "h-auto custom-xl:h-20"
                        } overflow-hidden cursor-pointer`}

                        // @ts-ignore
                        onMouseEnter={() => setexpandedRequestId(request._id)}
                        onMouseLeave={() => setexpandedRequestId(null)}
                        >
                          <div className="flex flex-col  custom-xl:flex-row custom-xl:items-start h-full">
                            {/* Content Section */}
                            <div className="flex-1 p-4 flex flex-col custom-xl:flex-row items-start custom-xl:items-center">
                              <div className="grid grid-cols-2 custom-xl:grid-cols-4 gap-4 w-full">
                                {/* Subject */}
                                <div className="flex flex-col custom-xl:block transition-all duration-300 ease-in-out custom-xl:pt-2">
                                  <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                    Subject and level
                                  </span>
                                  <span className="text-white text-base custom-xl:text-xl  font-medium">
                                    {request.subjects || ""} 
                                   
                                  </span>
                                  <div
                                    className={`text-white ${
                                      isExpanded
                                        ? "opacity-100 block transition-all duration-300 ease-in-out"
                                        : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                    }`}
                                  >
                                    PAYg session
                                  </div>
                                </div>

                                {/* Tutor */}
                                <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                  <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                    eTutor
                                  </span>
                                  <span className="text-white text-base custom-xl:text-xl ">
                                    {
                                    // @ts-ignore
                                    request.teacher?.contactInformation?.firstName || "Your Teacher"}
                                  </span>
                                  <div
                                    className={` ${
                                      isExpanded
                                        ? "opacity-100 block transition-all duration-300 ease-in-out"
                                        : "opacity-0 hidden transition-all duration-300 ease-in-out "
                                    }`}
                                  >
                                    <div className="flex  gap-6 items-center  mt-2">
                                      <span>
                                        <Image  loading="lazy" 
                                         onClick={()=>{
                                          setActiveFindEtutor("My eTutor")
                                          tutortomessage(request.teacher)
                                          showchat(true)
                                        }}
                                          src={chaticon}
                                          alt=""
                                          className="w-5 h-5"
                                        />
                                      </span>
                                      <span>
                                        <Image  loading="lazy" 
                                         onClick={()=>{
                                          setActiveFindEtutor("My eTutor")
                                          tutortomessage(request.teacher)
                                          showchat(true)
                                        }}
                                          src={foldericon}
                                          alt=""
                                          className="w-5 h-5"
                                        />
                                      </span>
                                      <span
                                        onClick={() => {
                                          setActiveFindEtutor("Find eTutor");

                                          setTutor(request.teacher);
                                        }}
                                      >
                                        <Image  loading="lazy" 
                                          src={profilewhite}
                                          alt=""
                                          className="w-5 h-5"
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Duration */}
                                <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                  <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                    Duration
                                  </span>
                                  <span className="text-white text-base custom-xl:text-xl">
                                    {request.duration || ""}
                                  </span>
                                </div>

                                {/* Date/Time */}
                                <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                  <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                    Date and Time
                                  </span>
                                  <span className="text-white text-base custom-xl:text-xl">
                                    {`${new Date(request.date)
                                      .toLocaleDateString("en-GB")
                                      .replace(/\//g, "/")
                                      .slice(0, 10)}`}
                                  </span>
                                  <div
                                    className={`text-xl text-white ${
                                      isExpanded
                                        ? "opacity-100 block transition-all duration-300 ease-in-out"
                                        : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                    }`}
                                  >
                                    {`${new Date(request.date).toLocaleDateString("en-GB", { weekday: 'short' })}`} {request.time || ""}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Buttons Section */}
                            <div
                              className={`flex flex-col custom-xl:flex-row gap-2  custom-xl:gap-4  h-full ${
                                isExpanded ? "py-6 px-4" : "p-4"
                              } transition-all duration-300 ease-in-out  custom-xl:pl-0 `}
                            >
                              <button
                                onClick={() =>
                                  setActiveFindEtutor("Find eTutor")
                                }
                                className="w-full  custom-xl:h-full custom-xl:w-auto bg-[#473171] text-white px-8 py-2 rounded-md text-sm custom-xl:text-xl hover:bg-[#3d2961] transition-colors"
                              >
                                Edit Session
                              </button>
                              <a href={request.joinLink} target="_blank">
                                <button className="w-full custom-xl:h-full  custom-xl:w-auto bg-[#8653FF] text-white px-8 py-2 rounded-md text-sm custom-xl:text-xl hover:bg-[#7340ff] transition-colors">
                                  Meeting Link
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
</>

                  ):(

                    <Image  loading="lazy"  src={noschedual} alt="" className="mx-auto "/>
                  )}


                </div>
              </>
            )}
          </div>
          <div>
            {activeSubTab === "completed" && (
              <div className="px-2  py-2 custom-xl:px-7 custom-xl:py-5 w-full space-y-6">
                {/* Header Row */}
                <div className="hidden custom-xl:grid custom-xl:grid-cols-4 mb-5 text-sm custom-lg:text-xl custom-xl:pl-9  w-[68%] text-white">
                  <div className="px-4  ">Subject and level</div>
                  <div className="px-4  ">eTutor</div>
                  <div className="px-4  ">Duration</div>
                  <div className="px-4  ">Date and Time</div>
                </div>

                {/* Session Card */}

              {requests.filter((request) =>request.status === "accepted" &&request.meetingCompleted === true).length !==0 ? (

                <>

                {requests.filter((request) =>request.status === "accepted" &&request.meetingCompleted === true).map((request) => {const isExpanded = expandedRequestId === request._id;
                    return (
                      <div
                        key={request._id}
                        className={`w-full transition-all duration-300 ease-in-out bg-[#564589] rounded-lg custom-xl:pl-9  ${
                          isExpanded
                          ? "h-auto custom-xl:h-28"
                          : "h-auto custom-xl:h-20"
                      } overflow-hidden cursor-pointer`}
                       // @ts-ignore
                      onMouseEnter={() => setexpandedRequestId(request._id)}
                      onMouseLeave={() => setexpandedRequestId(null)}
                      >
                        <div className="flex flex-col  custom-xl:flex-row custom-xl:items-start h-full">
                          {/* Content Section */}
                          <div className="flex-1 p-4 flex flex-col custom-xl:flex-row items-start custom-xl:items-center">
                            <div className="grid grid-cols-2 custom-xl:grid-cols-4 gap-4 w-full">
                              {/* Subject */}
                              <div className="flex flex-col custom-xl:block transition-all duration-300 ease-in-out custom-xl:pt-2">
                                <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                  Subject and level
                                </span>
                                <span className="text-white text-base custom-xl:text-xl  font-medium">
                                  {request.subjects || ""} /{" "}
                                  {request.level || ""}
                                </span>
                                <div
                                  className={`text-white ${
                                    isExpanded
                                      ? "opacity-100 block transition-all duration-300 ease-in-out"
                                      : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                  }`}
                                >
                                  hellloooo
                                </div>
                              </div>

                              {/* Tutor */}
                              <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                  eTutor
                                </span>
                                <span className="text-white text-base custom-xl:text-xl ">
                                  {
                                  // @ts-ignore
                                  request.teacher?.contactInformation?.firstName || "Your Teacher"}
                                </span>
                                <div
                                  className={` ${
                                    isExpanded
                                      ? "opacity-100 block transition-all duration-300 ease-in-out"
                                      : "opacity-0 hidden transition-all duration-300 ease-in-out "
                                  }`}
                                >
                                  <div className="flex  gap-6 items-center  mt-2">
                                    <span>
                                      <Image  loading="lazy" 
                                       onClick={()=>{
                                        setActiveFindEtutor("My eTutor")
                                        tutortomessage(request.teacher)
                                        showchat(true)
                                      }}
                                        src={chaticon}
                                        alt=""
                                        className="w-5 h-5"
                                      />
                                    </span>
                                    <span>
                                      <Image  loading="lazy" 
                                       onClick={()=>{
                                        setActiveFindEtutor("My eTutor")
                                        tutortomessage(request.teacher)
                                        showchat(true)
                                      }}
                                        src={foldericon}
                                        alt=""
                                        className="w-5 h-5"
                                      />
                                    </span>
                                    <span>
                                      <Image  loading="lazy" 
                                       onClick={() => {
                                        setActiveFindEtutor("Find eTutor");

                                        setTutor(request.teacher);
                                      }}
                                        src={profilewhite}
                                        alt=""
                                        className="w-5 h-5"
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Duration */}
                              <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                  Duration
                                </span>
                                <span className="text-white text-base custom-xl:text-xl">
                                  {request.duration || ""}
                                </span>
                              </div>

                              {/* Date/Time */}
                              <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                  Date and Time
                                </span>
                                <span className="text-white text-base custom-xl:text-xl">
                                  {`${new Date(request.date)
                                    .toLocaleDateString("en-GB")
                                    .replace(/\//g, "-")
                                    .slice(0, 10)} (${request.time || ""})`}
                                </span>
                                <div
                                  className={`text-white ${
                                    isExpanded
                                      ? "opacity-100 block transition-all duration-300 ease-in-out"
                                      : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                  }`}
                                >
                                  time
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Buttons Section */}
                          <div
                            className={`flex flex-col custom-xl:flex-row gap-2  custom-xl:gap-4  h-full ${
                              isExpanded ? "py-6 px-4" : "p-4"
                            } transition-all duration-300 ease-in-out  custom-xl:pl-0 `}
                          >
                            <button className="w-full bg-transparent  custom-xl:h-full custom-xl:w-auto  text-transparent px-8 py-2 rounded-md ">
                              Edit Session
                            </button>

                            <button className="w-full custom-xl:h-full  custom-xl:w-auto bg-[#8753ff73] text-white px-14 py-2 rounded-md text-sm custom-xl:text-xl  transition-colors">
                              Completed
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
</>
                ):(
                  <Image  loading="lazy"  src={completed} alt="" className="mx-auto "/>
                )}


              </div>
            )}
          </div>
        </>
        )}

        {/* ------------------trial session----------------- */}
        {activeTab === "trial" && (
          <>
            <div>
              {activeSubTab === "upcoming" && (
                <div className="px-1  custom-xl:px-4">
                  {/* top title */}
                  <div className="w-full ml-[14%] custom-xl:w-[60%] custom-xl:flex justify-between mb-1 sm:mb-4 custom-xl:px-4 hidden  mt-5  text-white  ">
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-xl">
                      Name and availability
                    </span>
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-xl">
                      Subjects
                    </span>
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-xl">
                      More information
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 custom-xl:gap-3 pt-3 ">
                    {requestsfromteacher.filter((teacher:any) => teacher.status === "pending").map((teacher:any) => (
                      
                        <div
                          key={teacher._id}
                          className="flex flex-col custom-xl:flex-row justify-between items-center gap-4 py-6 rounded-2xl bg-[#9B85C8] px-4 sm:px-8"
                        >
                          {/* Profile Section */}
                          <div className="flex flex-col custom-xl:flex-row items-center gap-4 w-full custom-xl:w-auto">
                            <div className="relative w-14 sm:w-[132px] h-14 sm:h-[132px] flex-shrink-0">
                              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                                <img
                                  src={teacher?.teacher?.user.profilePicture}
                                  alt="Profile"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="absolute bottom-[-4px] left-[-6px]">
                                <Image  loading="lazy" 
                                   src={
                                    teacher?.teacher?.level == "1"
                                      ? level1
                                      : teacher?.teacher?.level == "2"
                                      ? level2
                                      : teacher?.teacher?.level == "3"
                                      ? level3
                                      : teacher?.teacher?.level == "4"
                                      ? level4
                                      : teacher?.teacher?.level == "5"
                                      ? level5
                                      : teacher?.teacher?.level == "6"
                                      ? level6
                                      : teacher?.teacher?.level == "7"
                                      ? level7
                                      : teacher?.teacher?.level == "8"
                                      ? level8
                                      : teacher?.teacher?.level == "9"
                                      ? level9
                                      : teacher?.teacher?.level == "10"
                                      ? level10
                                      : level1
                                  }
                                  alt="Tier"
                                  className="w-7 sm:w-14 h-7 sm:h-14"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col items-center custom-xl:items-start gap-1 sm:gap-4 w-full custom-xl:w-44">
                              <h1 className="font-bold text-lg custom-lg:text-2xl capitalize text-center custom-xl:text-start">
                                {teacher?.teacher?.contactInformation?.firstName || ""}{" "}
                                {teacher?.teacher?.contactInformation?.lastName || ""}
                              </h1>
                              <div className="text-center custom-xl:text-start w-full">
                                <p className="text-lg">Availability:</p>
                                <span className="text-[#473171] text-base">
                                  {teacher?.teacher?.experience?.availableHours || ""}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Info Sections */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 custom-xl:grid-cols-2 gap-6 w-full custom-xl:w-auto">
                            {/* Subjects */}
                            <div className="flex flex-col items-center custom-xl:items-start">
                              <span className="text-lg">Subjects:</span>
                              <p className="text-[#473171] text-base text-center custom-xl:text-start">
                                {teacher?.teacher?.education.major}
                              </p>
                            </div>

                            {/* Study and Experience */}
                            <div className="sm:flex flex-col gap-4 hidden ">
                              <div className="flex flex-col items-center custom-xl:items-start">
                                <span className="text-lg text-white">
                                  Study
                                </span>
                                <p className="text-base text-[#473171]">
                                  {teacher?.teacher?.education.degree}
                                </p>
                              </div>

                              <div className="flex flex-col items-center custom-xl:items-start">
                                <span className="text-base text-white">
                                  Teaching Experience
                                </span>
                                <p className="text-base text-[#473171]">
                                  3 years and 7 students currently
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Actions Section */}
                          <div className="flex flex-col items-center gap-6 w-full custom-xl:w-auto">
                            <div className="flex gap-4">
                              <button
                                onClick={() => {
                                  updateRequestStatus(teacher._id, 'rejected')
                                 
                                }}
                                className="w-full sm:w-auto py-2 px-7 text-base custom-xl:text-xl rounded-full bg-transparent capitalize hover:bg-opacity-90 transition-colors"
                              >
                                 {waiting === teacher._id ? 'Wait...' : 'Deny'}
                              </button>

                              <button
                                onClick={() => {
                                  trialsession(true);
                                  updateRequestStatus(teacher._id, 'accepted')
                                  setActiveFindEtutor("Find eTutor");
                                  setTutor(teacher.teacher);
                                }}
                                className="w-full sm:w-auto py-2 px-7 text-base custom-xl:text-xl rounded-full bg-[#8358F7] capitalize hover:bg-opacity-90 transition-colors"
                              >
                                 {waiting === teacher._id ? 'Wait...' : 'Accept'}
                              </button>
                            </div>

                            <div className="hidden sm:flex justify-center gap-10 w-full">
                              <Image  loading="lazy" 
                                onClick={() => setActiveMYEtutor("My eTutor")}
                                src={message}
                                alt="Message"
                                className="w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity"
                              />
                              <Image  loading="lazy" 
                                onClick={() => setActiveMYEtutor("My eTutor")}
                                src={folder}
                                alt="Folder"
                                className="w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity"
                              />
                              <Image  loading="lazy" 
                                onClick={() => setActiveMYEtutor("My eTutor")}
                                src={profile}
                                alt="Profile"
                                className="w-7 cursor-pointer hover:opacity-80 transition-opacity"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              {activeSubTab === "completed" && (
                <div className="px-1  custom-xl:px-4">
                  {/* top title */}
                  <div className="w-full ml-[14%] custom-xl:w-[60%] custom-xl:flex justify-between mb-1 sm:mb-4 custom-xl:px-4 hidden  mt-5   text-white">
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-xl">
                      Name and availability
                    </span>
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-xl">
                      Subjects
                    </span>
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-xl">
                      More information
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 custom-xl:gap-3 pt-3 ">
                    {teachers
                      .filter((teacher:any) => teacher.acceptsTrialSession === true)
                      .map((teacher:any) => (
                        <div
                          key={teacher._id}
                          className="flex flex-col custom-xl:flex-row justify-between items-center gap-4 py-6 rounded-2xl bg-[#9B85C8] px-4 sm:px-8"
                        >
                          {/* Profile Section */}
                          <div className="flex flex-col custom-xl:flex-row items-center gap-4 w-full custom-xl:w-auto">
                            <div className="relative w-14 sm:w-[132px] h-14 sm:h-[132px] flex-shrink-0">
                              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                                <img
                                  src={teacher?.user?.profilePicture}
                                  alt="Profile"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="absolute bottom-[-4px] left-[-6px]">
                                <Image  loading="lazy" 
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
                                  alt="Tier"
                                  className="w-7 sm:w-14 h-7 sm:h-14"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col items-center custom-xl:items-start gap-1 sm:gap-4 w-full custom-xl:w-44">
                              <h1 className="font-bold text-lg custom-lg:text-2xl capitalize text-center custom-xl:text-start">
                                {teacher.contactInformation.firstName || ""}{" "}
                                {teacher.contactInformation.lastName || ""}
                              </h1>
                              <div className="text-center custom-xl:text-start w-full">
                                <p className="text-lg">Availability:</p>
                                <span className="text-[#473171] text-base">
                                  {teacher.experience.availableHours || ""}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Info Sections */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 custom-xl:grid-cols-2 gap-6 w-full custom-xl:w-auto">
                            {/* Subjects */}
                            <div className="flex flex-col items-center custom-xl:items-start">
                              <span className="text-lg">Subjects:</span>
                              <p className="text-[#473171] text-base text-center custom-xl:text-start">
                                {teacher.education.major}
                              </p>
                            </div>

                            {/* Study and Experience */}
                            <div className="sm:flex flex-col gap-4 hidden ">
                              <div className="flex flex-col items-center custom-xl:items-start">
                                <span className="text-lg text-white">
                                  Study
                                </span>
                                <p className="text-base text-[#473171]">
                                  {teacher.education.degree}
                                </p>
                              </div>

                              <div className="flex flex-col items-center custom-xl:items-start">
                                <span className="text-base text-white">
                                  Teaching Experience
                                </span>
                                <p className="text-base text-[#473171]">
                                  3 years and 7 students currently
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Actions Section */}
                          <div className="flex flex-col items-center gap-6 w-full custom-xl:w-auto">
                            <button
                              onClick={() => {
                                trialsession(true);
                                setActiveFindEtutor("Find eTutor");
                                setTutor(teacher);
                              }}
                              className="w-full sm:w-auto py-2 px-14 text-base rounded-full bg-[#8358F7] hover:bg-opacity-90 transition-colors"
                            >
                              Send&nbsp;request
                            </button>

                            <div className="hidden sm:flex justify-center gap-10 w-full">
                              <Image  loading="lazy" 
                                onClick={() => setActiveMYEtutor("My eTutor")}
                                src={message}
                                alt="Message"
                                className="w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity"
                              />
                              <Image  loading="lazy" 
                                onClick={() => setActiveMYEtutor("My eTutor")}
                                src={folder}
                                alt="Folder"
                                className="w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity"
                              />
                              <Image  loading="lazy" 
                                onClick={() => setActiveMYEtutor("My eTutor")}
                                src={profile}
                                alt="Profile"
                                className="w-7 cursor-pointer hover:opacity-80 transition-opacity"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SessionDashboard;
