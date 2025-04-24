import React from 'react'

const SingupHeading = ({heading,className}:any) => {
  return (
    <div>
      <h2 className={`${className} text-3xl 2xl:text-5xl font-extrabold text-darkBlue py-6 lg:text-2xl lg:py-3 mb:text-xl mb:py-2`}>{heading}</h2>
    </div>
  )
}

export default SingupHeading
