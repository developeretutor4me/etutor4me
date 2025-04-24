import React from 'react'

interface InformationProps  {
    name?:string,
    info?:string,
    info2?:string,
    info3?:string,
    info4?:string,
    span?:string
}
const EnteredInfo:React.FC<InformationProps> = ({name,info,span,info2,info3,info4}:any) => {
  return (
    <div className='text-lg custom-xl:text-[27px] text-darkBlue' >
      <h2  className=' font-semibold' >{name}<span className='font-light' >{span}</span></h2>
      <p className='mt-2 font-light'  >{info}  </p>
      <p className='mt-2 font-light'  >{info2}  </p>
      <p className='mt-2 font-light'  >{info3}  </p>
      <p className='mt-2 font-light'  >{info4}  </p>
    </div>
  )
}

export default EnteredInfo
