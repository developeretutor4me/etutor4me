"use client";
import Image from "next/image";
import chaticon from "../../../../public/chaticon (2).svg";
import sendicon from "../../../../public/sendicon.svg";
import plusicon from "../../../../public/plusicon.svg";
import { TutorListItem } from "./TutorListItem";
import { ChatMessage } from "./ChatMessage";
import { FileMessage } from "./FileMessage";


function ChatComp({
    recievedmessages,
    activeTutor,
    settutor,
    setTutor,
    setShowChat,
    setActiveView,
    setActiveFindEtutor,
    activeView,
    tutor,
    messages,
    messagesEndRef,
    sendMessage,
    newMessage,
    setNewMessage,
    userId,
    file,
    setselectedFile,
    setFile,
    setFileName,
    isLoading,
    sendFile,
    selectedFile,
    fileName
}: any) {
    return (
        <div className="bg-[#EDE8FA] w-full max-h-[947px] h-full rounded-3xl p-6  mt-11 text-white">
            <div className="flex h-full  gap-3 custom-2xl:gap-4 overflow-hidden     ">
                {/* Sidebar */}
                <div className="hidden sm:block min-w-[30.2%]  bg-[#EDE8FA]  border-red-700 h-full  overflow-hidden">
                    <h2 className="text-xl custom-2xl:text-4xl font-bold text-[#685AAD] px-4 py-4 ml-6">
                        My eTutors
                    </h2>

                    <div className=" hidden pt-6  overflow-y-auto scrollbar-thin sm:flex flex-col gap-3 custom-2xl:gap-6  scrollbar-track-transparent scrollbar-thumb-[#685aad40]  scrollbar-thumb-rounded-3xl h-[90%]  ">
                        {recievedmessages.length > 0 &&
                            recievedmessages.map((message: any, index: any) => (
                                <TutorListItem
                                    key={index}
                                    // @ts-ignore
                                    tutor={message?.details}
                                    isActive={activeTutor === message}
                                    // @ts-ignore
                                    onClick={() => {
                                        settutor(message?.details);
                                        setShowChat(true);
                                    }}
                                    onChatClick={() => {
                                        setActiveView("chat");
                                        settutor(message?.details);
                                    }}
                                    onFolderClick={() => {
                                        setActiveView("folder");
                                        settutor(message?.details);
                                    }}
                                    onProfileClick={() => {
                                        setActiveFindEtutor("Find eTutor");
                                        // @ts-ignore
                                        setTutor(message?.details);
                                    }} // Placeholder for profile functionality
                                />
                            ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-grow flex flex-col rounded-3xl  bg-[#A296CC]  h-full    max-w-full  relative">
                    {/* Chat Header */}
                    <div className="bg-[#A296CC] py-3 custom-2xl:py-5  px-4 flex rounded-t-3xl  pl-6 custom-2xl:pl-10   ">
                        <Image
                            loading="lazy"
                            src={chaticon}
                            alt=""
                            className=" mr-3 custom-2xl:mr-5 w-5 custom-2xl:w-8 h-5 custom-2xl:h-8 mt-1"
                        />
                        <h2 className="text-xl custom-2xl:text-3xl font-bold text-white">
                            {tutor?.contactInformation?.firstName}
                        </h2>
                    </div>

                    {activeView === "chat" && (
                        <>
                            {/* Messages */}
                            <div className="flex-grow p-1 custom-2xl:p-3 bg-[#A296CC] border-t border-[#8b55ff51]   mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
                                {Array.isArray(messages) && messages.length > 0
                                    ? messages.map((msg, index) => (
                                        <>
                                            <ChatMessage
                                                key={index}
                                                message={msg}
                                                // @ts-ignore
                                                isUser={msg.senderId === userId}
                                            />
                                        </>
                                    ))
                                    : ""}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <form
                                onSubmit={sendMessage}
                                className="py-2 sm:py-4 px-2 sm:px-10 bg-[#A296CC]  flex items-center justify-center  rounded-b-3xl"
                            >
                                <div className="flex items-center bg-[#8a7db7] rounded-full  relative w-full">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="send a message"
                                        className="flex-grow py-1 sm:py-2 custom-2xl:py-4 pl-8 custom-2xl:pl-16 pr-8 custom-2xl:pr-16  bg-transparent text-white placeholder-[#b0a9d2] text-sm sm:text-base custom-2xl:text-xl focus:outline-none"
                                    />
                                    <button type="submit" className="">
                                        <Image
                                            loading="lazy"
                                            src={sendicon}
                                            alt="Send Icon"
                                            className="h-4  custom-2xl:h-6 w-4  custom-2xl:w-6 absolute right-9 top-1/2 transform -translate-y-1/2"
                                        />
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {activeView === "folder" && (
                        <>
                            <div className="flex-grow p-1 custom-2xl:p-3 bg-[#A296CC] border-t border-[#8b55ff51]   mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
                                {Array.isArray(messages) &&
                                    messages.length > 0 &&
                                    messages.map(
                                        (msg: any, index) =>
                                            msg.fileUrl != null && (
                                                <FileMessage
                                                    key={index}
                                                    message={msg}
                                                    isUser={msg.senderId === userId} // Check if the message was sent by the user
                                                />
                                            )
                                    )}

                                <div ref={messagesEndRef} />
                            </div>

                            <div className="py-2 sm:py-4 px-2 sm:px-10 bg-[#A296CC]  flex items-center justify-end  rounded-b-3xl relative">
                                {file ? (
                                    <div className="flex flex-col items-end  gap-2">
                                        {selectedFile && (
                                            <div className="mt-2 flex items-center gap-4">
                                                <p className="text-sm text-white">
                                                    {fileName.slice(0, 8) + "..." + fileName.slice(-4)}
                                                </p>
                                                <button
                                                    className="text-sm text-[#af0000] hover:text-red-700"
                                                    onClick={() => {
                                                        setselectedFile(null);
                                                        setFile(null);
                                                        setFileName("");
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                        <button
                                            onClick={sendFile}
                                            className="w-full sm:w-auto py-1 px-9 text-base custom-2xl:text-base rounded-sm bg-[#8358F7] hover:bg-[#4a3683] capitalize hover:bg-opacity-90 transition-colors"
                                        >
                                            {isLoading ? "wait..." : "send"}
                                        </button>
                                    </div>
                                ) : (
                                    <label className="text-white py-2 px-4 rounded-full flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    const file: any = e.target.files[0];
                                                    setselectedFile(file);
                                                    setFile(file);
                                                    setFileName(file.name);
                                                }
                                            }}
                                        />
                                        <span className="text-xl text-[#DBD8EF] font-medium">
                                            Add attachment
                                        </span>
                                        <Image
                                            loading="lazy"
                                            src={plusicon}
                                            alt="Add"
                                            className="w-8 h-8"
                                        />
                                    </label>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatComp;
