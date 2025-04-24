'use client'
import React, { useState } from 'react'
import ReviewFormHead from '../ReviewFormHead'
import InputHeading from '../InputHeading'
import EnteredInfo from './EnteredInfo'
import Education from '../Steps/Education'

const ReviewEducation = () => {
    const [EditActive,setEditActive] = useState(false)
    const handleEditToggle = () => {
        setEditActive(!EditActive);
      };
  return (
    <div className='bg-reviewbg p-8 px-10 rounded-[30px] mt-16' >
      <ReviewFormHead heading='Education' EditActive={EditActive} handleEditToggle={handleEditToggle} />
      {EditActive ? <Education/>:
      <div className='grid grid-cols-2 gap-20 py-12 pl-5' >
        <EnteredInfo name='University/college' info='University of Country ' />
        <EnteredInfo name='Major' info='Physics' />
        <EnteredInfo name='Degree' info='Bachelor' />
        <EnteredInfo name='Graduation Year ' span='(or expected)' info='2033' />
       
      </div>}
      
    </div>
  )
}

export default ReviewEducation
