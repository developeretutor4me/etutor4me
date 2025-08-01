"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { ChevronLeft, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { io, Socket } from "socket.io-client";
import { useToast } from "@/hooks/use-toast";
import {
  startOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  eachWeekOfInterval,
} from "date-fns";

// Import components
import Session from "./components/Session";
import Calender from "./components/Calender";
import MyEtutor from "./components/MyEtutor";
import FindEtutor from "./components/FindEtutor";
import MyMembership from "./components/MyMembership";
import ContactSupport from "./components/ContactSupport";
import ReferYourFriends from "./components/ReferYourFriends";
import Setting from "./components/Settings";
import UsefulLinks from "./components/UsefulLinks";
import Activity from "./components/Activity";
import DashboardGrid from "./DashboardGrid";
import Sidebar from "./components/Sidebar";
import Dropdown from "./components/Dropdown";

// Import icons
import Home1 from "../../../public/homeicon.svg";
import session1 from "../../../public/sessionicon.svg";
import calender from "../../../public/calander.svg";
import eicon from "../../../public/eicon.svg";
import find from "../../../public/findEtutor.svg";
import membership from "../../../public/membership.svg";
import contact from "../../../public/contactandsupporticon.svg";
import refer from "../../../public/refericon.svg";
import setting from "../../../public/settingicon.svg";
import link from "../../../public/linkicons.svg";
import activityBlue from "../../../public/activityBlue.svg";
import { useLastMessage } from "../admin/hooks/useLastMessage";
import Image from "next/image";
import styles from "./DashboardGrid.module.css";
import etokiicon from "../../../public/etokiIcon.svg";
import EPlusIcon from "../../../public/Plus circle.svg";
import redeemIcon from "../../../public/redeem.svg";
import etokipopup from '../../../public/etokipopup.svg'

// Constants
const SOCKET_URL = "https://etutor4me-production.up.railway.app";
const REDEEM_TOKEN_THRESHOLD = 50;
const STORAGE_KEYS = {
  ACTIVE_SIDEBAR_ITEM: "activeSidebarItem",
  CONTACT_SUPPORT: "ContactSupport",
  HISTORY: "history",
} as const;

// Type definitions
interface ContactInformation {
  firstName?: string;
  country: string;
  phone: string;
  address: string;
}

interface StudentProfile {
  firstName: string;
}

interface Student {
  profile: StudentProfile;
  email: string;
  contactInformation: ContactInformation;
}

interface Teacher {
  name: string;
  email: string;
  contactInformation: ContactInformation;
}

interface BookingRequest {
  meetingCompleted: boolean;
  joinLink?: string;
  _id: string;
  student: Student;
  teacher: Teacher;
  subjects: string[];
  level: string;
  date: string;
  time: string;
  status: string;
}

interface ParentData {
  firstName?: string;
  user?: {
    etokis?: number;
    sessionsPerMonth?: number;
  };
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  details: {
    user: { _id: string };
    contactInformation: { firstName: string };
  };
  lastMessage?: {
    content: string;
    senderId: string;
    timestamp: string;
  };
}

interface SidebarItem {
  name: string;
  icon: any;
}

interface SocketNotification {
  senderId: string;
  content: string;
}

// Custom hooks
const useSocket = (userId: string | undefined) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) return;

    const socketInstance = io(SOCKET_URL, {
      withCredentials: true,
    });

    socketInstance.emit("join", userId);

    socketInstance.on("notification", (notification: SocketNotification) => {
      if (notification.senderId !== userId) {
        toast({
          title: "New Message",
          description: notification.content,
          variant: "default",
        });
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.emit("leave", userId);
      socketInstance.off("chatMessage");
      socketInstance.off("notification");
      socketInstance.disconnect();
    };
  }, [userId, toast]);

  return socket;
};

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref, handler]);
};

// API functions
const apiClient = {
  async fetchParentData(userId: string): Promise<ParentData> {
    const response = await fetch("/api/parentapis/fetch-parent-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch parent data");
    }

    const data = await response.json();
    return data.parentData;
  },

  async fetchUserData(userId: string): Promise<any> {
    const response = await fetch("/api/Fetch-all-users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        data.error || "An error occurred while fetching the user."
      );
    }

    const data = await response.json();
    return data.user;
  },

  async fetchBookingRequests(): Promise<BookingRequest[]> {
    const response = await fetch("/api/fetch-send-requests", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch requests");
    }

    const data = await response.json();
    return data.bookingRequests;
  },

  async fetchFirstName(): Promise<string> {
    const response = await fetch("/api/first-name");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch first name");
    }

    return data.firstName;
  },

  async redeemTokens(etokies: number): Promise<{ success: boolean }> {
    const response = await fetch("/api/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ etokies }),
    });

    if (!response.ok) {
      throw new Error(`Failed to redeem: ${response.statusText}`);
    }

    return await response.json();
  },
};

// SWR fetcher
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

// Main component
const SessionsDashboard: React.FC = () => {
  const { toast } = useToast();
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement>(null);

  // State management
  const [activeSidebarItem, setActiveSidebarItem] =
    useState<string>("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [previousSidebarItem, setPreviousSidebarItem] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("Loading...");
  const [parentData, setParentData] = useState<ParentData | null>(null);
  const [etokies, setEtokies] = useState<number>(0);
  const [setsessionleft, setSetsessionleft] = useState<number>(0);
  const [fetchedUserData, setFetchedUserData] = useState<any>("");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [sessionData, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error2, setError] = useState<string | null>(null);
  const [comingvalue, setComingvalue] = useState<string>("");
  const [tutor, setTutor] = useState<any>(null);
  const [tutortomessage, setTutortomessage] = useState<any>(null);
  const [chat, setChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<string>("");
  const [recievedmessages, setRecievedmessages] = useState<Message[]>([]);
  const [isLoading2, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(20);
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(
    null
  );
  const [confirmedState, setConfirmedState] = useState<boolean>(false);
  const [unconfirmedState, setUnconfirmedState] = useState<boolean>(false);
  const [canceledState, setCanceledState] = useState<boolean>(false);
  const [redeem, setRedeem] = useState<boolean>(false);
  const [view, setView] = useState<"month" | "week">("month");
  const [popup, setPopup] = useState<any>(null);
  const [trial, setTrial] = useState<boolean>(false);
  const [profilepicture, setProfilepicture] = useState<any>(null);
  const [radeemLoading, setRadeemLoading] = useState<boolean>(false);
  const [terminateeng, setTerminateeng] = useState<any>(null);

  // Custom hooks
  const socket = useSocket(session?.user?.id);
  useClickOutside(targetRef, () => setIsProfileOpen(false));

  // SWR for fetching sender messages
  const {
    data: senderMessages,
    error,
    isLoading,
  } = useSWR(
    session?.user?.id
      ? `/api/recipient/messages?recipientId=${session.user.id}`
      : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      onError: (error) => {
        console.error("Error fetching senders:", error);
      },
    }
  );


  const filteredSessions = useMemo(() => sessionData, [sessionData]);

  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });
    const firstDay = startOfWeek(start);
    const preDays = eachDayOfInterval({ start: firstDay, end: start });
    return [...preDays.slice(0, -1), ...days];
  }, [currentDate]);

  const sidebarItems: SidebarItem[] = useMemo(
    () => [
      { name: "Dashboard", icon: Home1 },
      { name: "My Sessions", icon: session1 },
      { name: "Calendar", icon: calender },
      { name: "My eTutor", icon: eicon },
      { name: "Find eTutor", icon: find },
      { name: "My Membership", icon: membership },
      { name: "Contact Support", icon: contact },
      { name: "Refer your Friends", icon: refer },
      { name: "Activity", icon: activityBlue },
      { name: "Settings", icon: setting },
      { name: "Useful links", icon: link },
    ],
    []
  );

  // Callback functions
  const getSessionForDate = useCallback(
    (date: Date) => {
      return filteredSessions
        .filter((session) => !session.meetingCompleted)
        .find((session) => isSameDay(new Date(session.date), date));
    },
    [filteredSessions]
  );

  const handleRedeem = useCallback(async () => {
    if (etokies < REDEEM_TOKEN_THRESHOLD) {
      toast({
        title: "Insufficient eTokens",
        description: `You need at least ${REDEEM_TOKEN_THRESHOLD} eTokens to redeem.`,
        variant: "default",
      });
      return;
    }

    setRadeemLoading(true);

    try {
      const data = await apiClient.redeemTokens(etokies);

      if (data.success) {
        const updatedSessions = setsessionleft + 1;
        const updatedEtokies = etokies - REDEEM_TOKEN_THRESHOLD;

        setSetsessionleft(updatedSessions);
        setEtokies(updatedEtokies);

        toast({
          title: "Redeem Successful",
          description: `You have successfully redeemed ${REDEEM_TOKEN_THRESHOLD} eTokens.`,
          variant: "default",
        });
      } else {
        throw new Error("Redeem failed");
      }
    } catch (error) {
      console.error("Error during redeem process:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while redeeming. Please try again later.",
        variant: "default",
      });
    } finally {
      setRadeemLoading(false);
    }
  }, [etokies, setsessionleft, toast]);

  const handleImpersonate = useCallback(async () => {
    await update({
      user: {
        email: "admin@gmail.com",
        role: "admin",
        id: "admin",
        isAdmin: true,
        isParent: false,
      },
    });

    localStorage.removeItem(STORAGE_KEYS.CONTACT_SUPPORT);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);

    setTimeout(() => {
      router.push("/admin");
    }, 3000);
  }, [update, router]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const toggleProfile = useCallback(() => {
    setIsProfileOpen(!isProfileOpen);
  }, [isProfileOpen]);

  const handleBackNavigation = useCallback(() => {
    if (previousSidebarItem) {
      setActiveSidebarItem(previousSidebarItem);
    }
  }, [previousSidebarItem]);

  // Effects
  useEffect(() => {
    const storedItem = localStorage.getItem(STORAGE_KEYS.ACTIVE_SIDEBAR_ITEM);
    if (storedItem) {
      setActiveSidebarItem(storedItem);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SIDEBAR_ITEM);
    }
  }, []);

  useEffect(() => {
    const enrichMessagesWithLastMessage = async () => {
      if (!senderMessages || !Array.isArray(senderMessages)) return;

      const enriched = await Promise.all(
        senderMessages.map(async (msg: any) => {
          const recipientId = msg?.details?.user?._id;

          if (!recipientId) return msg;

          try {
            const res = await fetch(`/api/message/conversation?userId=${session?.user?.id}&recipientId=${recipientId}&limit=1`);
            const data = await res.json();

            return {
              ...msg,
              lastMessage: data?.messages?.[0] || null,
            };
          } catch (err) {
            console.error(`Failed to fetch last message for ${recipientId}`, err);
            return { ...msg, lastMessage: null };
          }
        })
      );

      setRecievedmessages(enriched);
    };

    enrichMessagesWithLastMessage();
  }, [senderMessages]);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;

      try {
        const [parentDataResult, userDataResult] = await Promise.all([
          apiClient.fetchParentData(session.user.id),
          apiClient.fetchUserData(session.user.id),
        ]);

        setParentData(parentDataResult);
        setFetchedUserData(userDataResult);
        setSetsessionleft(parentDataResult?.user?.sessionsPerMonth || 0);
        setEtokies(parentDataResult?.user?.etokis || 0);
        setFirstName(parentDataResult?.firstName || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!session) return;

      try {
        const requests = await apiClient.fetchBookingRequests();
        setRequests(requests);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [session]);

  useEffect(() => {
    const fetchFirstNameData = async () => {
      try {
        const firstName = await apiClient.fetchFirstName();
        setFirstName(firstName);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstNameData();
  }, [session]);

  // Render content based on active sidebar item
  const renderContent = useCallback(() => {
    const componentProps = {
      etokies,
      setActiveSidebarItem,
      handleRedeem,
      setRedeem,
      radeemLoading,
      redeem,
      setsessionleft,
      currentDate,
      view,
      calendarDays,
      getSessionForDate,
      setPopup,
      popup,
      sessionData,
      setComingvalue,
      recievedmessages,
      setChat,
      setTutortomessage,
      parentData,
      tutor,
      setTutor,
      tutortomessage,
      chat,
      trial,
      socket,
      terminateeng,
      setTerminateeng,
    };

    switch (activeSidebarItem) {
      case "Dashboard":
        return (
          <DashboardGrid
            etokies={etokies}
            setActiveSidebarItem={setActiveSidebarItem}
            handleRedeem={handleRedeem}
            setredeem={setRedeem}
            radeemLoading={radeemLoading}
            redeem={redeem}
            setsessionleft={setsessionleft}
            currentDate={currentDate}
            view={view}
            calendarDays={calendarDays}
            getSessionForDate={getSessionForDate}
            setpopup={setPopup}
            popup={popup}
            sessionData={sessionData}
            Setsetcomingvalue={setComingvalue}
            recievedmessages={recievedmessages}
            setchat={setChat}
            settutortomessage={setTutortomessage}
            isOpenNoti={false}
          />
        );

      case "My Sessions":
        return (
          <Session
            setActiveFindEtutor={setActiveSidebarItem}
            setActiveMYEtutor={setActiveSidebarItem}
            setcompleted={comingvalue}
            setTutor={setTutor}
            showchat={setChat}
            tutortomessage={setTutortomessage}
            trialsession={setTrial}
            parentdata={parentData}
          />
        );

      case "Calendar":
        return (
          <Calender
            setActiveFindEtutor={setActiveSidebarItem}
            setActiveMYEtutor={setActiveSidebarItem}
            setTutor={setTutor}
            showchat={setChat}
            tutortomessage={setTutortomessage}
          />
        );

      case "My eTutor":
        return (
          <MyEtutor
            tutorimp={tutortomessage}
            showchatvalue={chat}
            setActiveFindEtutor={setActiveSidebarItem}
            setTutor={setTutor}
            socket={socket}
            showTerminateEngament={setTerminateeng}
          />
        );

      case "Find eTutor":
        return (
          <FindEtutor
            setActiveMYEtutor={setActiveSidebarItem}
            sessiontutor={tutor}
            messagetutor={setTutortomessage}
            showchat={setChat}
            trialrequest={trial}
            parentdata={parentData}
            sessionData={sessionData}
            showTerminateEngament={terminateeng}
          />
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
            <Activity
              parent={parentData}
              etokiesprop={undefined}
              sessionData={sessionData}
            />
          )
        );

      case "Settings":
        return <Setting Uploadedprofilepicture={setProfilepicture} />;

      case "Useful links":
        return <UsefulLinks />;

      default:
        return <div>Select a tab from the sidebar</div>;
    }
  }, [
    activeSidebarItem,
    etokies,
    handleRedeem,
    redeem,
    radeemLoading,
    setsessionleft,
    currentDate,
    view,
    calendarDays,
    getSessionForDate,
    popup,
    sessionData,
    comingvalue,
    recievedmessages,
    chat,
    parentData,
    tutor,
    tutortomessage,
    trial,
    socket,
    terminateeng,
    session?.user?.isAdmin,
  ]);

  // Route guards
  useEffect(() => {
    if (session?.user?.role === "teacher") {
      router.push("/etutor");
    } else if (session?.user?.role === "student") {
      router.push("/studentdashboard");
    }
  }, [session?.user?.role, router]);

  // Render loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Render for parent role
  if (session?.user?.role === "parent") {
    return (
      <div className={`flex min-h-screen bg-white text-white relative z-0 max-w-[1920px] mx-auto ${styles.mainpage} `}>
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          session={session}
          sidebarItems={sidebarItems}
          setPreviousSidebarItem={setPreviousSidebarItem}
          setActiveSidebarItem={setActiveSidebarItem}
          setTutor={setTutor}
          Setsetcomingvalue={setComingvalue}
          activeSidebarItem={activeSidebarItem}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main content */}
        <main className="flex-1 px-5 custom-lg:px-9 py-4 overflow-auto bg-transparent scrollbar-none max-h-screen overflow-y-auto overflow-x-hidden ">
          <header className="flex justify-between items-start mb-8 h-fit">
            <div className="flex items-start sm:w-full flex-col md:flex-row sm:max-w-[300px] custom-xl:max-w-[500px] custom-2xl:max-w-[700px]">
              <button
                onClick={toggleSidebar}
                className={`${styles.menu}  mr-4 text-darkBlue`}
                aria-label="Toggle sidebar"
              >
                <Menu size={24} />
              </button>

              {activeSidebarItem === "Dashboard" && (


                <div className={`${styles.etokiebox} mt-12 md:mt-0 custom-xl:w-[80%] md:max-w-[40rem]   max-w-[400px] w-full  flex  items-start flex-col custom-2xl:flex-row gap-2 sm:gap-6   absolute sm:static  `}>
                  <div className=" flex flex-col space-y-3 py-4 px-3 sm:px-6  bg-purple-100  rounded-2xl w-[100%] sm:w-[24rem] bg-[#EDE8FA]">
                    <div className=" flex justify-between items-center bg-purple-300 rounded-full px-4 pl-6 py-[10px] bg-[#A296CC]">
                      <div className="text-3xl font-bold text-white">{etokies}</div>
                      <div className=" flex items-center justify-center">
                        <Image
                          loading="lazy"
                          src={etokiicon}
                          alt=""
                          className="w-9 h-9"
                        />
                      </div>
                    </div>

                    <div className="flex  space-x-6 mt-4 hover:cursor-pointer px-2 pt-2">
                      <button
                        onClick={() => {
                          setActiveSidebarItem("Refer your Friends");
                        }}
                        className="flex-1 bg-[#685AAD] text-white py-[2px] px-4  rounded-md text-xs flex items-center justify-center gap-1 hover:cursor-pointer"
                      >
                        <Image
                          loading="lazy"
                          src={EPlusIcon}
                          alt=""
                          className="w-6 h-6 hover:cursor-pointer"
                        />{" "}
                        etokis
                      </button>
                      <button
                        onClick={handleRedeem}
                        onMouseEnter={() => {
                          setRedeem(true);
                        }}
                        onMouseLeave={() => {
                          setRedeem(false);
                        }}
                        className="flex-1 bg-[#8653FF] text-white py-[2px] px-4 rounded-md flex items-center justify-center gap-1 hover:cursor-pointer relative"
                      >
                        {radeemLoading ? "wait..." : "Redeem"}
                        <Image
                          loading="lazy"
                          src={redeemIcon}
                          alt=""
                          className="w-6 h-6"
                        />
                        {redeem && (
                          <div className="hover absolute w-[200px] sm:w-[280px] custom-lg:w-[340px] h-[88px] sm:h-[124px] custom-lg:h-[150px] top-8 custom-xl:top-0 left-20 custom-xl:left-40 ">
                            <Image src={etokipopup} alt="" className="object-contain" />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#EDE8FA] rounded-lg font-bold px-8 py-3 text-center text-base text-[#685AAD] ">
                    SESSIONS&nbsp;LEFT:&nbsp;{setsessionleft}
                  </div>
                </div>

              )}
              {activeSidebarItem !== "Dashboard" && (
                <div
                  onClick={handleBackNavigation}
                  className="flex cursor-pointer items-center relative top-3 -left-1.5"
                >
                  <ChevronLeft className="hidden sm:block custom-lg:mr-2 w-[20px] custom-lg:w-[30px] h-[20px] custom-lg:h-[30px] cursor-pointer text-[#685AAD]" />
                  <h1 className="text-[#685AAD] text-xs sm:text-sm custom-lg:text-xl custom-2xl:text-[26px] custom-2xl:leading-[2rem] hidden sm:block">
                    Back
                  </h1>
                </div>
              )}

              {activeSidebarItem === "My Sessions" && (
                <h1 className="text-[#685AAD] text-3xl custom-lg:text-[40px] custom-xl:text-[54px] custom-lg:leading-none font-extrabold ml-0 hidden sm:block top-16 relative sm:top-3 left-3 custom-xl:left-5">
                  My&nbsp;Sessions
                </h1>
              )}
            </div>

            <Dropdown
              targetRef={targetRef}
              toggleProfile={toggleProfile}
              firstName={firstName}
              isProfileOpen={isProfileOpen}
              session={session}
              handleImpersonate={handleImpersonate}
              setActiveSidebarItem={setActiveSidebarItem}
              setIsProfileOpen={setIsProfileOpen}
              profilepicture={profilepicture}
              FetchedUserData={fetchedUserData}
            />
          </header>
          {renderContent()}
        </main>
      </div>
    );
  }

  return null;
};

export default React.memo(SessionsDashboard);
