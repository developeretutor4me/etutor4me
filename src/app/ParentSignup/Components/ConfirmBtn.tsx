import React from 'react'
interface ConfirmBtn{
  btnName:string,
  className:string,
  onClick:any
}
const ConfirmBtn = ({btnName,className,onClick}:ConfirmBtn )=> {
  return (
    <div onClick={onClick } className={ `${className} bg-customBlue 2xl:text-4xl text-2xl text-white rounded-full w-full py-[18px] max-w-[85%] mx-auto   mt-12  border cursor-pointer text-center lg:text-xl  mb:text-sm  mb:mt-2 `}>
   {btnName}
  </div>
  )
}

export default ConfirmBtn
