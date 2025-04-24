'use client'
import SignUpNavbar from '@/components/SignUpNavbar';
import React, { useState } from 'react';
import Signup from './Components/SignupImage';
import SingupQuestions from './Components/SingupQuestions';
import Image from 'next/image';
import singup from '../../../public/assets/signup/parent.png';

const Page = ({QuestionNo}:any) => {
  const [questionNo, setQuestionNo] = useState<any>(null)





  
  return (
    <div className='flex flex-col '>
      <SignUpNavbar />
      <div className=' relative min-h-screen flex items-center custom-2xl:items-start  w-full custom-2xl:pr-32 custom-2xl:pl-10 p-10 justify-center custom-2xl:justify-between  mb:flex-col mb:px-5 mb:gap-8'>
        {/* Only render the div containing the image if QuestionNo is not equal to 5 */}
        {QuestionNo !== 5 && (
          <div className=''>
            <Image  loading="lazy"  className={`absolute bottom-0 left-0  ${(questionNo == 2 || questionNo == 3 || questionNo == 5) ? "w-[20rem]":"w-[45em]"}  hidden custom-2xl:block  z-30`} src={singup} alt='signup'  />
          </div>
        )}
        <SingupQuestions questionNo={setQuestionNo}  />
      </div>
    </div>
  );
}

export default Page;
