import React from 'react';
import DayRow from './DayRow'; // Adjust the import path as needed

const timeSlots = ['Morning', 'Afternoon', 'Evening'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DaysOfWeek: React.FC = () => {
    return (
        <div className='w-[85%]'>
            {days.map((day) => (
                <DayRow key={day} day={day} timeSlots={timeSlots} />
            ))}
        </div>
    );
};

export default DaysOfWeek;
