import React from 'react'
import FormHeading from '../FormHeading'
import ReviewFormHead from '../ReviewFormHead'
import ReviewContactInfo from '../ReviewComponents/ReviewContactInfo'
import ReviewEducation from '../ReviewComponents/ReviewEducation'
import ReviewExperience from '../ReviewComponents/ReviewExperience'
import ConfirmBtn from '@/app/ParentSignup/Components/ConfirmBtn'
import CheckboxInput from '../CheckboxInput'

const Review = ({NextStep}:any) => {
  return (
    <div className='bg-questionbg p-14 rounded-[40px]'>
     <FormHeading className='' heading='Review Appllication' paragraph='Please review each section of your application to insure your information is correct. once you’re ready
click ‘’submit’’ to finalize this portion of the application process '/>
    <ReviewContactInfo  />
    <ReviewEducation/>
    <ReviewExperience/>
    <div className='mt-24' >
      <CheckboxInput label='I confirm that I am 18 years or older and agree to the eTutor4Me LLC Terms of Use and Privacy Policy.' />
      <div className='w-1/3' >

    <ConfirmBtn  btnName='Submit Application' onClick={NextStep}  className='text-3xl font-medium mt-4' />
      </div>
    </div>
    </div>
  )
}

export default Review
