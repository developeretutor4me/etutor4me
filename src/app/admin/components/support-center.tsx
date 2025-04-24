"use client"

import { ChevronLeft, ChevronRight, MessageSquare, Ticket, Users, BarChart3 } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const supportCards = [
  {
    title: "Support Chats",
    count: 152,
    label: "Chats",
    icon: MessageSquare,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    title: "Ticket Inbox",
    count: 152,
    label: "Chats",
    icon: Ticket,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    title: "Memberships",
    count: 152,
    label: "Requests",
    icon: Users,
    color: "text-red-400",
    bgColor: "bg-red-50",
  },
  {
    title: "Reports",
    count: 152,
    label: "Requests",
    icon: BarChart3,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Active Users",
    count: 324,
    label: "Users",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Pending Tickets",
    count: 89,
    label: "Tickets",
    icon: Ticket,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    title: "Chat Response",
    count: 245,
    label: "Messages",
    icon: MessageSquare,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Monthly Reports",
    count: 12,
    label: "Reports",
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

export default function SupportCenter() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidth = container.firstElementChild?.clientWidth ?? 0
    const gap = 16 // This should match the gap in your flex container
    const scrollAmount = cardWidth + gap

    const newScrollLeft =
      direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      handleScroll() // Check initial scroll state
    }
    return () => container?.removeEventListener("scroll", handleScroll)
  }, [handleScroll]) // Added handleScroll to dependencies

  return (
    <div className="bg-[#f6f4fd] rounded-3xl py-8 px-5">
      <h1 className="mb-7 text-[45px] font-semibold text-[#685aad] ml-5">Students/Parents Support Center</h1>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 z-10 flex items-center ">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-sm ${!canScrollLeft ?"bg-[#f3effc]":"bg-[#ede8fa]"}    min-w-[34px] min-h-[72px] `}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className={` w-6 ${!canScrollLeft ? "text-[#beb6dd]":"text-[#685aad]"}  `}/>
          </Button>
        </div>
        <div ref={scrollContainerRef} className="flex gap-6 overflow-x-hidden  mx-12 min-h-[135px] mb-2" onScroll={handleScroll}>
          {supportCards.map((card) => {
            const Icon = card.icon
            return (
              <Card key={card.title} className=" flex-shrink-0  rounded-[11.55px] min-w-[312px] max-h-[134px]">
                <CardContent className="flex flex-col gap-4 ">
                  <div className={`${card.bgColor} w-fit rounded-lg p-2`}>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-700">{card.title}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-semibold">{card.count}</span>
                      <span className="text-gray-500">{card.label}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className="absolute inset-y-0 right-0 z-10 flex items-center ">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-sm ${!canScrollRight ?"bg-[#f3effc]":"bg-[#ede8fa]"}    min-w-[34px] min-h-[72px] `}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <ChevronRight className={` w-6 ${!canScrollRight ? "text-[#beb6dd]":"text-[#685aad]"}  `}/>
          </Button>
        </div>
      </div>
    </div>
  )
}

