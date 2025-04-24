import React from 'react'
import Image from 'next/image'
import singup from "../../../../public/assets/signup/signup.png"
const SignupImage = ({}) => {
  return (
      <div className='w-auto flex items-end justify-end mt-20 lg:w-1/2 mb:m-auto  mb:mt-0 mb:w-3/5'>
        <Image  loading="lazy"  className='' src={singup} alt='singup'/>
      </div>
  )
}

export default SignupImage
