import React from 'react';
import CheckboxInput from './CheckboxInput'; // Adjust the import path as needed

interface DayRowProps {
    day: string;
    timeSlots: string[];
}

const DayRow: React.FC<DayRowProps> = ({ day, timeSlots }) => {
    return (
        <div className='flex pl-8 justify-between items-center mb-2'>
            <span className='text-darkBlue text-[25px] w-1/5'>{day}</span>
            {timeSlots.map((timeSlot) => (
                <div key={timeSlot} className='flex items-center space-x-2'>
                    <CheckboxInput label={timeSlot} />
                    
                </div>
            ))}
        </div>
    );
};

export default DayRow;
