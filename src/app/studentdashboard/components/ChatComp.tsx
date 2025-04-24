"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import chaticon from "../../../../public/chaticon (2).svg";
import sendicon from "../../../../public/sendicon.svg";
import purplechaticon from "../../../../public/purplechaticon.svg";
import foldericonpurple from "../../../../public/foldericonpurple.svg";
import profileicon from "../../../../public/profile icon purple.svg";

import { useSession } from "next-auth/react";

const TutorListItem = ({ name, tagline,Img }: { name: any; tagline: string,Img:any }) => (
  <div
    className={` hidden sm:flex flex-row justify-between items-center py-2 sm:py-2 custom-xl:py-3 custom-2xl:py-4  pl-2 sm:pl-3 custom-2xl:pl-5 pr-4 custom-2xl:pr-9 cursor-pointer   rounded-lg md:rounded-xl  bg-[#A296CC]  `}
  >
    <div className="flex items-center" >
      <img
       src={Img}
       alt={`${ ""}'s profile picture`}
        className="rounded-full mr-4 w-4 sm:w-7 h-4 sm:h-7  custom-2xl:h-[60px] custom-2xl:w-[60px] "
      />
      <div className="flex-grow ">
        <p className={`font-semibold text-base custom-2xl:text-2xl   truncate  `}>
          {name || ""} 

        </p>
          <p className="hidden md:block text-sm custom-xl:text-base custom-2xl:text-[19px]">{tagline}</p>
      </div>
    </div>

 
  </div>
);


const ChatMessage = ({ message, isUser }:any) => {
  if (!message || !message.message || !message.createdAt) return null;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2 custom-2xl:mb-4`}>
      <div className={`max-w-[70%] rounded-lg custom-2xl:rounded-2xl px-2 py-1 custom-2xl:p-3 ${
        isUser ? "bg-[#685AAD] text-white" : "bg-white text-[#473171]"
      }`}>
        {!isUser && (

          <p className="text-sm sm:text-base custom-2xl:text-xl font-bold transition-all text-[#685aad]">
          Lawrance <span className="text-xs text-[#b3acd6]">/ Assistant</span>
        </p>
        )}
        <p className="text-sm sm:text-base custom-2xl:text-2xl  break-words transition-all">
          {message.message}
        </p>
        <span className={`text-xs custom-2xl:text-base opacity-70 custom-2xl:mt-1 block ${
          isUser ? "text-white float-right" : "text-[#9B85C8]"
        }`}>
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};


interface chatprops{
  ticket:any,
  name:any,
  img:any
}
function Chat({ ticket,name ,img}: chatprops) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const [error, setError] = useState<any>(null);



    // Fetch messages
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`/api/contact-support/messages/${ticket._id}`);
          const data = await response.json();
  
          if (data.success) {
            setMessages(data.messages);
          } else {
            setError(data.error);
          }
        } catch (error) {
          setError("Failed to fetch messages");
        } finally {
          setLoading(false);
        }
      };
  
      if (ticket._id) {
        fetchMessages();
      }
    }, [ticket._id]);




  // Send message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      const response = await fetch("/api/contact-support/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId: ticket._id,
          senderId: session?.user?.id,
          message: newMessage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // @ts-ignore
        setMessages((prevMessages) => [...prevMessages, data.message]);
        setNewMessage("");
        scrollToBottom();
      } else {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };




  // Scroll to the latest message
  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessage]);

  return (
    <div className="h-full ">
      <div className="flex h-full  gap-3 custom-2xl:gap-6 overflow-hidden ">
        {/* Sidebar */}
        <div className="hidden sm:block w-[24.4%]  bg-[#EDE8FA]  border-red-700 h-full  overflow-hidden px-1  ">
          <div className="border-b-2 border-[#c7bfe3] custom-2xl:mt-4 pt-3 custom-2xl:pb-8 w-fit">
            <h2 className="text-2xl custom-xl:text-4xl custom-2xl:text-[48px] 2xl:text-[54px] font-bold text-[#685AAD] px-2 ">
              Ticket&nbsp;<span className="uppercase">{ticket._id.slice(-4)}</span>
            </h2>
          </div>

          <div className=" hidden pt-7  overflow-y-auto scrollbar-thin sm:flex flex-col gap-3 custom-2xl:gap-6  scrollbar-track-transparent scrollbar-thumb-[#685aad40]  scrollbar-thumb-rounded-3xl h-[90%]  ">
           
                <TutorListItem name={"Lawrence"} tagline={"Assistant"} Img={undefined}    />
                <TutorListItem name={name || ""} tagline={"Assistant"} Img={img}    />
          
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow w-[75.5%] flex flex-col rounded-xl sm:rounded-2xl custom-xl:rounded-3xl  bg-[#A296CC]  h-full    max-w-full">
          {/* Chat Header */}
          <div className="bg-transparent py-3 custom-2xl:py-5  px-4 flex rounded-t-3xl  pl-6 custom-2xl:pl-10   ">
            <h2 className="text-xl custom-2xl:text-3xl font-bold text-transparent">
              &nbsp;
            </h2>
          </div>

        
            
           






              {/* Messages */}
          <div className="flex-grow p-1 custom-2xl:p-3 bg-[#A296CC] mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
            {loading ? (
              <div className="text-center text-white">Loading messages...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-white">No messages yet</div>
            ) : (
              messages.map((msg:any, index) => (
                <ChatMessage
                  key={index}
                  message={msg}
                  isUser={msg?.senderId === session?.user?.id}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>




            {/* Message Input */}

            {ticket.status ==="active"?(

            <form
            onSubmit={sendMessage}
            className="py-2 sm:py-4 px-2 sm:px-10 bg-[#A296CC] flex items-center justify-center rounded-b-3xl"
          >
            <div className="flex items-center bg-[#8a7db7] rounded-full relative w-full">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="send a message"
                className="flex-grow py-1 sm:py-2 custom-2xl:py-4 pl-8 custom-2xl:pl-16 pr-8 custom-2xl:pr-16 bg-transparent text-white placeholder-[#b0a9d2] text-sm sm:text-base custom-2xl:text-xl focus:outline-none"
              />
              <button type="submit" className="">
                <Image
                  loading="lazy"
                  src={sendicon}
                  alt="Send Icon"
                  className="h-4 custom-2xl:h-6 w-4 custom-2xl:w-6 absolute right-9 top-1/2 transform -translate-y-1/2"
                />
              </button>
            </div>
          </form>
            
            ):(
              <div className="px-2 py-9">
                <p className="bg-[#b4a5d7] max-w-[95%] mx-auto text-xs sm:text-lg custom-lg:text-2xl font-medium text-center py-4 sm:py-7 2xl:py-11 px-4 sm:px-10 xl:px-20 2xl:px-40 rounded-2xl xl:rounded-3xl leading-tight">

                  This Ticket has been {ticket.status} on {new Date(ticket.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}, by Lawrence. If you need further assistance, feel free to start a new chat or reach out to support. Ticket ID: <span className="uppercase"> {ticket._id.slice(-4)}</span>.
                </p>
              </div>
            )}
        
        </div>
      </div>
    </div>
  );
}

export default Chat;



