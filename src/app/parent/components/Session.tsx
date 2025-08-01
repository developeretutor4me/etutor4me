"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import styles from "./session.module.css";
import UpComingIndividualTab from "./UpComingIndividualTab";
import { BookingRequest } from "./Data";
import CompletedIndividualTab from "./CompletedIndividualTab";
import UpComingGroupTab from "./UpComingGroupTab";
import CompletedGroupTab from "./CompletedGroupTab";
import RequestTrialTab from "./RequestTrialTab";
import ApplicationTrialTab from "./ApplicationTrialTab";

interface ISessionDashboardrops {
  setActiveFindEtutor: (item: string) => void;
  setActiveMYEtutor: (item: string) => void;
  setTutor: any;
  setcompleted?: string;
  showchat: any;
  tutortomessage: any;
  trialsession: any;
  parentdata: any;
}

const SessionDashboard = ({
  setActiveFindEtutor,
  setActiveMYEtutor,
  setcompleted = "upcoming",
  setTutor,
  showchat,
  tutortomessage,
  trialsession,
  parentdata,
}: ISessionDashboardrops) => {
  const [activeTab, setActiveTab] = useState("individual");
  const [activeSubTab, setActiveSubTab] = useState(
    `${setcompleted}` || "upcoming"
  );
  const { toast } = useToast();
  const { data: session } = useSession();
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teachers, setTeachers] = useState([]);
  const [requestsfromteacher, setrequestsfromteacher] = useState([]);
  const [expandedRequestId, setexpandedRequestId] = useState("");
  const [waiting, setWaiting] = useState<any>({ id: null, action: null });

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
      } catch (error: any) {
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
    try {
      const response = await axios.patch(`/api/Teacher-Request`, {
        id,
        status,
      });

      setrequestsfromteacher((prevRequests) =>
        prevRequests.filter((request: any) => request._id !== id)
      );
    } catch (err) {
      console.error(err);

      toast({
        title: "Failed to update the request status.",
        description: "",
        variant: "destructive",
      });
    } finally {
      setWaiting({ id: null, action: null });
    }
  };

  const getTabColors = (tabName: string) => {
    if (activeTab === "individual") {
      if (tabName === "group") return "#9B85C8";
      if (tabName === "trial") return "#6B5692";
    } else if (activeTab === "group") {
      if (tabName === "individual") return "#6B5692";
      if (tabName === "trial") return "#9B85C8";
    } else if (activeTab === "trial") {
      if (tabName === "group") return "#9B85C8";
      if (tabName === "individual") return "#6B5692";
    }
    return "#EDE8FA"; // Active tab color
  };
  return (
    <>
      <div className={`${styles.maindiv} `}>
        {/* Individual Tab */}
        <div
          onClick={() => setActiveTab("individual")}
          className={`${styles.individualtab} individualtab `}
          style={{ backgroundColor: getTabColors("individual") }}
        >
          {/* Top arc (was before) */}
          <button
            className={`
                  ${activeTab === "individual" ? "text-[#685AAD]" : "text-white"
              }`}
            style={{ backgroundColor: getTabColors("individual") }}
          >
            <span className="">INDIVIDUAL SESSION</span>
          </button>
          {/* Bubble bump (was after) */}
          <div
            className={`${styles.bubble} bubble ${getTabColors("individual")}`}
          />
        </div>

        {/* Group Tab */}
        <div className={`${styles.grouptab} grouptab`}>
          <div
            onClick={() => setActiveTab("group")}
            className={`${styles.subgrouptab}`}
            style={{ backgroundColor: getTabColors("group") }}
          >
            <button
              className={`
                  ${activeTab === "group" ? "text-[#685AAD]" : "text-white"}`}
              style={{ backgroundColor: getTabColors("group") }}
            >
              <span className="">GROUP SESSION</span>
            </button>
            <div className="bubble" />
          </div>
        </div>

        {/* Trial Tab */}
        <div className={`${styles.trialtab} trialtab`}>
          <div
            onClick={() => setActiveTab("trial")}
            className={`${styles.subtrialtab}`}
            style={{ backgroundColor: getTabColors("trial") }}
          >
            <button
              className={` 
                  ${activeTab === "trial" ? "text-[#685AAD]" : "text-white"} `}
              style={{ backgroundColor: getTabColors("trial") }}
            >
              <span className="">TRIAL SESSION</span>
            </button>
            <div className={`bubble`} />
          </div>
        </div>

        {/* Active content display */}
        <div className={`${styles.contentdiv}   `}>

          <div className="relative  h-full ">


            <div className={`${activeTab === "trial" ? "hidden" : "hidden custom-2xl:flex"}   text-[#685AAD] absolute right-[4.5%] -top-[17%] font-bold text-xs px-2 transition-all  w-full max-w-[291px] h-full max-h-[68px] py-7   md:text-sm custom-xl:text-2xl   rounded-md sm:rounded-xl mb-1 uppercase  bg-[#EDE8FA]   items-center justify-center `}>
              Sessions&nbsp;left: {parentdata?.user.sessionsPerMonth || 0}
            </div>

            <div className="mt-[40px] sm:mt-[57px] ml-3 ">
              {activeTab === "trial" ? (
                <div className="bg-[#473171] ml-2 sm:ml-10  py-3 px-3 text-sm rounded-xl w-fit flex ">
                  <button
                    onClick={() => setActiveSubTab("upcoming")}
                    className={`flex-1 py-3 sm:py-6 px-7 sm:px-[51px]  text-center rounded-xl transition-all duration-300 ${activeSubTab === "upcoming"
                      ? "bg-[#8653FF] text-white transition-all"
                      : "text-[#d8b4fe] transition-all"
                      }`}
                  >
                    Requests
                  </button>
                  <button
                    onClick={() => setActiveSubTab("completed")}
                    className={`flex-1 py-3 sm:py-6 px-[20px] sm:px-[46px] text-center rounded-xl transition-all duration-300 ${activeSubTab === "completed"
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
                    className={`flex-1 py-3 sm:py-6 px-6 sm:px-12 text-center rounded-xl transition-all duration-300 ${activeSubTab === "upcoming"
                      ? "bg-[#8653FF] text-white"
                      : "text-[#d8b4fe]"
                      }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setActiveSubTab("completed")}
                    className={`flex-1 py-3 sm:py-6 px-6 sm:px-12 text-center rounded-xl transition-all duration-300 ${activeSubTab === "completed"
                      ? "bg-[#8653FF] text-white"
                      : "text-[#d8b4fe]"
                      }`}
                  >
                    Completed
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#a296cc] p-2 custom-xl:p-4 rounded-3xl mt-9  min-h-full overflow-auto  ">
              {/* --------------individual session-----------------   */}
              {activeTab === "individual" && (
                <>
                  {activeSubTab === "upcoming" && (
                    <UpComingIndividualTab
                      requests={requests}
                      expandedRequestId={expandedRequestId}
                      setexpandedRequestId={setexpandedRequestId}
                      setActiveFindEtutor={setActiveFindEtutor}
                      tutortomessage={tutortomessage}
                      showchat={showchat}
                      setTutor={setTutor}
                    />
                  )}

                  {activeSubTab === "completed" && (
                    <CompletedIndividualTab
                      requests={requests}
                      expandedRequestId={expandedRequestId}
                      setexpandedRequestId={setexpandedRequestId}
                      setActiveFindEtutor={setActiveFindEtutor}
                      tutortomessage={tutortomessage}
                      showchat={showchat}
                      setTutor={setTutor}
                    />
                  )}
                </>
              )}

              {/* -----------------group session------------- */}
              {activeTab === "group" && (
                <>
                  <div>
                    {activeSubTab === "upcoming" && (
                      <UpComingGroupTab
                        requests={requests}
                        expandedRequestId={expandedRequestId}
                        setexpandedRequestId={setexpandedRequestId}
                        setActiveFindEtutor={setActiveFindEtutor}
                        tutortomessage={tutortomessage}
                        showchat={showchat}
                        setTutor={setTutor}
                      />
                    )}
                  </div>
                  <div>
                    {activeSubTab === "completed" && (
                      <CompletedGroupTab
                        requests={requests}
                        expandedRequestId={expandedRequestId}
                        setexpandedRequestId={setexpandedRequestId}
                        setActiveFindEtutor={setActiveFindEtutor}
                        tutortomessage={tutortomessage}
                        showchat={showchat}
                        setTutor={setTutor}
                      />
                    )}
                  </div>
                </>
              )}

              {/* ------------------trial session----------------- */}
              {activeTab === "trial" && (
                <>
                  <div>
                    {activeSubTab === "upcoming" && (
                      <RequestTrialTab
                        requestsfromteacher={requestsfromteacher}
                        setWaiting={setWaiting}
                        updateRequestStatus={updateRequestStatus}
                        waiting={waiting}
                        setActiveFindEtutor={setActiveFindEtutor}
                        setTutor={setTutor}
                        setActiveMYEtutor={setActiveMYEtutor}
                      />
                    )}
                  </div>
                  <div>
                    {activeSubTab === "completed" && (
                      <ApplicationTrialTab
                        teachers={teachers}
                        setActiveFindEtutor={setActiveFindEtutor}
                        setTutor={setTutor}
                        setActiveMYEtutor={setActiveMYEtutor}
                        trialsession={trialsession}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        <style jsx>{`
          .individualtab .bubble {
            position: absolute;
            top: -3.8%;
            left: 289.04px;
            width: 88px;
            height: 88px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 33px,
              ${getTabColors("individual")} 33px
            );
          }

          .grouptab .bubble {
            position: absolute;
            top: -3.8%;
            left: 340px;
            width: 88px;
            height: 88px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 33px,
              ${getTabColors("group")} 33px
            );
          }

          .trialtab .bubble {
            position: absolute;
            top: -3.8%;
            left: 345px;
            width: 88px;
            height: 88px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 33px,
              ${getTabColors("trial")} 33px
            );
          }

          @media (max-width: 1178px) {
            .trialtab .bubble {
              top: -3.8%;
              left: 244.71px; /* 345 * 0.7093 */
              width: 62.42px;
              height: 62.42px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 23.41px,
                ${getTabColors("trial")} 23.41px
              );
            }
            .grouptab .bubble {
              top: -3.8%;
              left: 241.16px; /* 340 * 0.7093 */
              width: 62.42px;
              height: 62.42px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 23.41px,
                ${getTabColors("group")} 23.41px
              );
            }
            .individualtab .bubble {
              top: -2.69%; /* -3.8 * 0.7093 */
              left: 205.01px; /* 289.04 * 0.7093 */
              width: 62.42px; /* 88 * 0.7093 */
              height: 62.42px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 23.41px,
                /* 33 * 0.7093 */ ${getTabColors("individual")} 23.41px
              );
            }
          }

          @media (max-width: 814px) {
            .individualtab .bubble {
              top: -1.65%; /* -2.69 * 0.61475 */
              left: 126px; /* 205.01 * 0.61475 */
              width: 38.35px; /* 62.42 * 0.61475 */
              height: 38.35px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 14.39px,
                /* 23.41 * scale */ ${getTabColors("individual")} 14.39px
              );
            }
            .grouptab .bubble {
              top: -3.7%;
              left: 148.27px; /* 241.16 * scale */
              width: 38.35px;
              height: 38.35px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 14.39px,
                ${getTabColors("group")} 14.39px
              );
            }

            .trialtab .bubble {
              top: -3.7%;
              left: 150.49px; /* 244.71 * scale */
              width: 38.35px;
              height: 38.35px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 14.39px,
                ${getTabColors("trial")} 14.39px
              );
            }
          }

          @media (max-width: 530px) {
            .individualtab .bubble {
              top: -1.32%; /* -1.65 * 0.8 */
              left: 100.8px; /* 126 * 0.8 */
              width: 30.68px; /* 38.35 * 0.8 */
              height: 30.68px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 11.51px,
                /* 14.39 * 0.8 */ ${getTabColors("individual")} 11.51px
              );
            }

            .grouptab .bubble {
              top: -3.8%; /* -3.7 * 0.8 */
              left: 118.61px; /* 148.27 * 0.8 */
              width: 30.68px;
              height: 30.68px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 11.51px,
                ${getTabColors("group")} 11.51px
              );
            }

            .trialtab .bubble {
              top: -3.8%%;
              left: 120.39px; /* 150.49 * 0.8 */
              width: 30.68px;
              height: 30.68px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 11.51px,
                ${getTabColors("trial")} 11.51px
              );
            }
          }

          @media (max-width: 422px) {
            .individualtab .bubble {
              top: -0.99%; /* -1.32 * 0.75 */
              left: 75.6px; /* 100.8 * 0.75 */
              width: 23.01px; /* 30.68 * 0.75 */
              height: 23.01px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 8.63px,
                /* 11.51 * 0.75 */ ${getTabColors("individual")} 8.63px
              );
            }
            .grouptab .bubble {
              top: -3.5%; /* -3.8 * 0.75 */
              left: 88.96px; /* 118.61 * 0.75 */
              width: 23.01px;
              height: 23.01px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 8.63px,
                ${getTabColors("group")} 8.63px
              );
            }

            .trialtab .bubble {
              top: -3.5%;
              left: 90.29px; /* 120.39 * 0.75 */
              width: 23.01px;
              height: 23.01px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 8.63px,
                ${getTabColors("trial")} 8.63px
              );
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default SessionDashboard;

// <div className="w-full  h-full pt-4 bg-[#EDE8FA]  rounded-[35px]   relative mt-16 sm:mt-10">
//   <div className="flex justify-between items-start mb-4 absolute top-0 left-0 w-full">
//     <div className=" grid grid-cols-3   rounded-tl-[35px] rounded-tr-[35px] h-10 sm:h-[89px] w-full">
//       {tabs.map((tab) => (
//         <button
//           key={tab.id}
//           onClick={() => setActiveTab(tab.id)}
//           className={`flex items-center justify-center flex-nowrap  font-normal box-border sm:font-bold text-xs px-2  sm:text-lg  transition-all
//       ${
//         tab.id === activeTab
//           ? "bg-[#EDE8FA] text-[#685AAD] transition-all"
//           : `text-white transition-all`
//       }
//       ${
//         tab.id === "individual"
//           ? "rounded-tl-[35px] transition-all"
//           : "transition-all"
//       }
//       ${
//         tab.id === "trial"
//           ? "rounded-tr-3xl  custom-xl:rounded-none transition-all"
//           : "transition-all"
//       }

//     `}
//           style={{ backgroundColor: getTabColor(tab.id) }}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>

// <div className="bg-white h-10 sm:h-[89px] w-[38%] rounded-bl-3xl     transition-all  hidden custom-xl:flex items-start  justify-center px-4 custom-lg:px-8 pb-4 rounded-tr-3xl">
//   {activeTab === "trial" ? (
//     ""
//   ) : (
//     <div className="text-[#685AAD] font-bold text-xs px-2 transition-all  w-[80%]   md:text-sm custom-xl:text-2xl h-full  rounded-md sm:rounded-xl mb-1 uppercase  bg-[#EDE8FA]  flex items-center justify-center ">
//       Sessions&nbsp;left: {parentdata?.user.sessionsPerMonth || 0}
//     </div>
//   )}
// </div>
//   </div>

//   <div className="mt-[50px] sm:mt-[128px] ml-3 ">
//     {activeTab === "trial" ? (
//       <div className="bg-[#473171] ml-2 sm:ml-10  py-3 px-3 text-sm rounded-xl w-fit flex ">
//         <button
//           onClick={() => setActiveSubTab("upcoming")}
//           className={`flex-1 py-3 sm:py-6 px-7 sm:px-[51px]  text-center rounded-xl transition-all duration-300 ${
//             activeSubTab === "upcoming"
//               ? "bg-[#8653FF] text-white transition-all"
//               : "text-[#d8b4fe] transition-all"
//           }`}
//         >
//           Requests
//         </button>
//         <button
//           onClick={() => setActiveSubTab("completed")}
//           className={`flex-1 py-3 sm:py-6 px-[20px] sm:px-[46px] text-center rounded-xl transition-all duration-300 ${
//             activeSubTab === "completed"
//               ? "bg-[#8653FF] text-white"
//               : "text-[#d8b4fe]"
//           }`}
//         >
//           Application
//         </button>
//       </div>
//     ) : (
//       <div className="bg-[#473171] ml-2 sm:ml-10 py-3 px-3 text-sm rounded-xl w-fit flex  ">
//         <button
//           onClick={() => setActiveSubTab("upcoming")}
//           className={`flex-1 py-3 sm:py-6 px-6 sm:px-12 text-center rounded-xl transition-all duration-300 ${
//             activeSubTab === "upcoming"
//               ? "bg-[#8653FF] text-white"
//               : "text-[#d8b4fe]"
//           }`}
//         >
//           Upcoming
//         </button>
//         <button
//           onClick={() => setActiveSubTab("completed")}
//           className={`flex-1 py-3 sm:py-6 px-6 sm:px-12 text-center rounded-xl transition-all duration-300 ${
//             activeSubTab === "completed"
//               ? "bg-[#8653FF] text-white"
//               : "text-[#d8b4fe]"
//           }`}
//         >
//           Completed
//         </button>
//       </div>
//     )}
//   </div>

//   <div className="bg-[#a296cc] p-2 custom-xl:p-4 rounded-3xl mt-9  h-full overflow-auto ">
//     {/* --------------individual session-----------------   */}
//     {activeTab === "individual" && (
//       <>
//         {activeSubTab === "upcoming" && (
//           <UpComingIndividualTab
//             requests={requests}
//             expandedRequestId={expandedRequestId}
//             setexpandedRequestId={setexpandedRequestId}
//             setActiveFindEtutor={setActiveFindEtutor}
//             tutortomessage={tutortomessage}
//             showchat={showchat}
//             setTutor={setTutor}
//           />
//         )}

//         {activeSubTab === "completed" && (
//           <CompletedIndividualTab
//             requests={requests}
//             expandedRequestId={expandedRequestId}
//             setexpandedRequestId={setexpandedRequestId}
//             setActiveFindEtutor={setActiveFindEtutor}
//             tutortomessage={tutortomessage}
//             showchat={showchat}
//             setTutor={setTutor}
//           />
//         )}
//       </>
//     )}

//     {/* -----------------group session------------- */}
//     {activeTab === "group" && (
//       <>
//         <div>
//           {activeSubTab === "upcoming" && (
//             <UpComingGroupTab
//               requests={requests}
//               expandedRequestId={expandedRequestId}
//               setexpandedRequestId={setexpandedRequestId}
//               setActiveFindEtutor={setActiveFindEtutor}
//               tutortomessage={tutortomessage}
//               showchat={showchat}
//               setTutor={setTutor}
//             />
//           )}
//         </div>
//         <div>
//           {activeSubTab === "completed" && (
//             <CompletedGroupTab
//               requests={requests}
//               expandedRequestId={expandedRequestId}
//               setexpandedRequestId={setexpandedRequestId}
//               setActiveFindEtutor={setActiveFindEtutor}
//               tutortomessage={tutortomessage}
//               showchat={showchat}
//               setTutor={setTutor}
//             />
//           )}
//         </div>
//       </>
//     )}

//     {/* ------------------trial session----------------- */}
//     {activeTab === "trial" && (
//       <>
//         <div>
//           {activeSubTab === "upcoming" && (
//             <RequestTrialTab
//               requestsfromteacher={requestsfromteacher}
//               setWaiting={setWaiting}
//               updateRequestStatus={updateRequestStatus}
//               waiting={waiting}
//               setActiveFindEtutor={setActiveFindEtutor}
//               setTutor={setTutor}
//               setActiveMYEtutor={setActiveMYEtutor}
//             />
//           )}
//         </div>
//         <div>
//           {activeSubTab === "completed" && (
//             <ApplicationTrialTab
//               teachers={teachers}
//               setActiveFindEtutor={setActiveFindEtutor}
//               setTutor={setTutor}
//               setActiveMYEtutor={setActiveMYEtutor}
//               trialsession={trialsession}
//             />
//           )}
//         </div>
//       </>
//     )}
//   </div>
// </div>
