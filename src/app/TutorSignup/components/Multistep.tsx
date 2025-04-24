'use client'
import { useState } from 'react';
import ContactInformation from './ContactInformation';
import { useAppSelector } from '../../../Store/hooks';
// import EducationForm from './forms/EducationForm';
// import ExperienceForm from './forms/ExperienceForm';
// import ReviewSubmitForm from './forms/ReviewSubmitForm';

const steps = [
  { id: 1, name: 'Contact Information' },
  { id: 2, name: 'Education' },
  { id: 3, name: 'Experience' },
  { id: 4, name: 'Review & Submit' },
];

const MultiStepForm = () => {
  // const count = useAppSelector(state =>state.counter)
  const [currentStep, setCurrentStep] = useState(2);

  const nextStep = () => setCurrentStep(currentStep + 1);

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <ContactInformation />;
      case 2:
        return <ContactInformation />;
      case 3:
        return <ContactInformation />;
      case 4:
        return <ContactInformation />;
      default:
        return <ContactInformation />;
    }
  };

  return (
    <div className="flex w-full px-12 pl-24">
      {/* Sidebar */}
      <div className="w-1/4   relative mt-12 ">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full flex flex-col items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center ">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                  step.id < currentStep
                    ? `bg-formpurple border-formpurple`
                    : step.id === currentStep
                    ? `bg-none border-formpurple border-4	`
                    : `bg-formpurple border-formpurple`
                }`}
              ></div>
              {index < steps.length - 1 && (
                <div
                  className={`w-2 h-32 ${
                    step.id < currentStep ? `bg-formpurple` : `bg-purple`
                  }`}
                ></div>
              )}
         <div
  className={`flex flex-col w-full  absolute top-10 left-0 ml-16 ${
    step.id === currentStep ? 'text-darkBlue' : 'text-gray-500'
  }`}
>
  <div className='flex flex-col whitespace-no-wrap ' >
  <h3 className="w-full max-w-full text-2xl font-extrabold whitespace-nowrap ">
    {step.name}
  </h3>
  {step.id === currentStep && (
    <p className="text-darkBlue text-lg">In Progress</p>
  )}
  {step.id < currentStep && (
    <p className=" text-darkBlue text-lg">Completed</p>
  )}
  </div>

</div>

            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="w-3/4 ">
        <form>
          {renderForm()}
          <div className="flex justify-end mt-8">
          
              <button
                type="button"
                onClick={nextStep}
                className="bg-darkBlue text-white px-4 py-2 rounded"
              >
                {/* Continue {count} */}
                contiue
              </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
