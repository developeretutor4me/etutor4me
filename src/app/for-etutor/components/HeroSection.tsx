 "use client"
import React from 'react'
import Image from 'next/image'
import img from "../../../../public/assets/homepage/studenthero2.png"
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
const HeroSection = () => {
  const router = useRouter();
  return (
    <div className='  w-full flex items-center justify-between  h-lvh mb:flex-col mb:flex mb:items-center mb:text-center mb:justify-center mb:gap-10 px-8 mb:py-8 mb:h-full' >
      <div className='w-[40%] lg:w-[45%] mb:w-full'>
        <h2 className=' font-extrabold text-[61px]  mb:text-3xl lg:text-4xl xl:text-4xl leading-[1.19] mt-5'>
          <span className='text-darkBlue'>Become an  </span>
          <span className='text-customOrange'>eTutor </span>
          <span className='text-darkBlue'>and join our  </span>
          <span className='text-customBlue'>Global Team </span>

        </h2>
        <h3 className='text-[#473171] text-[29px] font-medium  mt-6 mb:mt-3 xl:text-xl lg:text-x mb:text-lg'>Transform learning, Level Up & Earn from anywhere</h3>
        <div
        onClick={(e:any)=>{
          router.push('/ETutorSignup')
        }}
        className='pt-32  lg:pt-12 mb:pt-10'>

          <Button className=' px-[88px] py-6 mb:py-3 lg:px-10 lg:text-xl' btnName='BECOME AN eTUTOR' />
        </div>
      </div>
      <div className='w-1/2 mb:w-full '>
        <Image  loading="lazy"  alt='' src={img} />
      </div>
    </div>
  )
}

export default HeroSection
