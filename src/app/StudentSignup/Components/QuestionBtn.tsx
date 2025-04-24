import React from 'react'

const QuestionBtn = ({btnName,className,onClick }:any) => {
  return (
    <div className=''>
      <div onClick={onClick } className={`bg-purpleBtn text-2xl text-[#534988] hover:bg-customBlue hover:text-white  rounded-full w-full py-[18px] 2xl:text-4xl  px-5 mt-4 border-[#9184F0] border cursor-pointer text-center lg:text-xl lg:py-2 mb:text-sm mb:p-2 mb:mt-2 ${className}`}>
        {btnName}
      </div>
    </div>
  )
}

export default QuestionBtn
