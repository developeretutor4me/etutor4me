'use client'
import React, { useState } from 'react'
import EnteredInfo from './EnteredInfo';
import Experience from '../Steps/Experience';
import ReviewFormHead from '../ReviewFormHead';

const ReviewExperience = () => {
    const [EditActive,setEditActive] = useState(false)
    const handleEditToggle = () => {
        setEditActive(!EditActive);
      };
  return (
    <div className='bg-reviewbg p-8 px-10 rounded-[30px] mt-16' >
      <ReviewFormHead heading='Education' EditActive={EditActive} handleEditToggle={handleEditToggle} />
      {EditActive ? <Experience/>:
      <div className='grid grid-cols-1 gap-20 py-12 pl-5' >
        <EnteredInfo name='University/college' info='Yes' />
        <EnteredInfo name='What level(s) are you interested in tutoring?'  info='Pre-Kindergarten' info2='Kindergarten-2nd grade' />
        <EnteredInfo name='What subject(s) can you tutor in?' info='Mathematics  - Physics - Art' />
        <EnteredInfo name='What languages can you tutor in?' info='English - French'  />
        <EnteredInfo name='What type of instruction are you interested in?' info='1-on-1'  />
        <EnteredInfo name='How many hours are you available to tutor each week?' info='Less than 5 hours'  />
        <EnteredInfo name='What date can you start tutoring?' info='2024 - 06 - 30'  />
        <EnteredInfo name='What’s you general availability?' info='Monday: Afternoon' info2='Wednesday: Morning' />
        <EnteredInfo name='Do you have classroom teaching experience?' info='No'  />
       
      </div>}
      
    </div>
  )
}

export default ReviewExperience
