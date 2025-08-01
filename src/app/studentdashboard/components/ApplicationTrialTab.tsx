import Image from "next/image";
import React from "react";
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
import message from "../../../../public/messageicon.svg";
import folder from "../../../../public/foldericon.svg";
import profile from "../../../../public/profileicon.svg";

interface IApplicationTrialTabprops {
    teachers: any
    setActiveFindEtutor: any
    setTutor: any
    setActiveMYEtutor: any
    trialsession: any
}
function ApplicationTrialTab({
    teachers,
    setActiveFindEtutor,
    setTutor,
    setActiveMYEtutor,
    trialsession,
}: IApplicationTrialTabprops) {
    return (
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
                    .filter(
                        (teacher: any) => teacher.acceptsTrialSession === true
                    )
                    .map((teacher: any) => (
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
                                        <Image
                                            loading="lazy"
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
                                    <Image
                                        loading="lazy"
                                        onClick={() => setActiveMYEtutor("My eTutor")}
                                        src={message}
                                        alt="Message"
                                        className="w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity"
                                    />
                                    <Image
                                        loading="lazy"
                                        onClick={() => setActiveMYEtutor("My eTutor")}
                                        src={folder}
                                        alt="Folder"
                                        className="w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity"
                                    />
                                    <Image
                                        loading="lazy"
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
    );
}

export default ApplicationTrialTab;
