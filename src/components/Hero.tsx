import React from 'react'
import Button from './Button'
import Image from 'next/image'
import heroimg from "../../public/assets/heroimg2.png"
import Link from 'next/link'
const Hero = () => {
  return (
    <div className='w-full px-4 flex items-center mb:flex-col mb:gap-6 mb:py-6 mb:px-0 mb:justify-center' >
      <div className='mb:w-full mb:text-center  w-1/2 '>
        <h2 className=' text-[60.5px] leading-[1.18] pt-0 mb:text-3xl font-extrabold lg:text-[40px] xl:text-6xl '>
          <span className='text-darkBlue'>Unlock Better Grades With  <br /></span>
          <span className='text-customBlue'>Engaging</span>
          <span className='text-darkBlue'>, </span>
          <span className='text-customPink'>Efficient </span>
          <span className='text-darkBlue'>& </span>
          <span className='text-customOrange'>Encouraging </span>
          <span className='text-darkBlue'>Learning!</span>
        </h2>
        <h3 className='text-darkBlue  font-medium text-[29px]  w-10/12 mt-[43px] leading-[34px]  lg:text-lg lg:mt-8 lg:leading-normal xl:text-2xl mb:text-sm mb:w-full mb:leading-normal mb:mt-5'>
        Our eTutors are chosen for their exceptional knowledge <br /> and  their ability to relate to fellow students. <br />Experience the difference with us and achieve your <br /> academic goals!</h3>
        <div className='pt-[114px] lg:pt-12 mb:pt-10'>

        <Link href='/SignupAs' >
        <span onClick={()=>{
          localStorage.setItem('activeSidebarItem',"My Sessions")
          localStorage.setItem('activeTab',"trial")
          
        }}>

         <Button className='text-[34.07] custom-2xl:px-[75px] custom-2xl:py-6 px-10  py-2 sm:py-3 custom-lg:py-4 lg:text-xl ' btnName='BOOK A FREE SESSION' />
        </span>
         </Link> 
        </div>
      </div>
      <div className='mb:w-full w-[57%] '>
        <Image  loading="lazy"  alt='' src={heroimg}  className='mt-6'/>
      </div>
    </div>
  )
}

export default Hero
