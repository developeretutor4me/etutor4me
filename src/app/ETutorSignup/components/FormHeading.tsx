import React from 'react'

const FormHeading = ({heading,paragraph,className,paraclass}:any) => {
  return (
    <div>
      {/* <h2>{heading}</h2> */}
      <h2 className={`${className} text-darkBlue text-xl sm:text-3xl custom-xl:text-[40px] font-semibold`}>{heading}</h2>
     {paragraph && <p className={`${paraclass} text-darkBlue  text-sm sm:text-lg custom-xl:text-[26px]  mt-2 leading-tight`}>{paragraph}</p>} 
    </div>
  )
}

export default FormHeading
