'use client'
import SignUpNavbar from '@/components/SignUpNavbar';
import React, { useState } from 'react';
import Signup from './Components/SignupImage';
import SingupQuestions from './Components/SingupQuestions';
import Image from 'next/image';
import singup from '../../../public/assets/signup/signup.png';

const Page = ({ QuestionNo }:any) => {


  


  return (
    <div className='flex flex-col'>
      <SignUpNavbar />
      <div className='flex items-center custom-2xl:items-start min-h-screen w-full custom-2xl:pr-32 custom-2xl:pl-10 p-10 justify-center custom-2xl:justify-between  mb:flex-col mb:px-5 mb:gap-8'>
        {/* Only render the div containing the image if QuestionNo is not equal to 5 */}
        {QuestionNo !== 5 && (
          <div className='w-auto custom-2xl:flex items-end justify-end mt-20 lg:w-1/2 mb:m-auto mb:mt-0 mb:w-3/5 hidden '>
            <Image  loading="lazy"  className='' src={singup} alt='signup' />
          </div>
        )}
        <SingupQuestions  />
      </div>
    </div>
  );
}

export default Page;
