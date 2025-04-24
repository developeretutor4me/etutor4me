import React from 'react'

const QuestionBtn = ({btnName,className,onClick }:any) => {
  return (
    <div>
      <div onClick={onClick } className={ `${className} bg-[#DDD3F8] text-2xl text-[#534988] hover:bg-customBlue hover:text-white  rounded-full w-full py-[18px] 2xl:text-4xl  px-5 mt-4 border-[#9184F0] border cursor-pointer text-center lg:text-xl lg:py-2 mb:text-sm mb:p-2 mb:mt-2`}>
        {btnName}
      </div>
    </div>
  )
}

export default QuestionBtn
