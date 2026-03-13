import React from 'react';
import Dot from './Dot';

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const getFirstDayOfMonth = (year, monthIndex) => {
  return new Date(year, monthIndex, 1).getDay();
};

const Calendar = ({ year, progress, onToggleClick, todayStr }) => {
  const months = Array.from({ length: 12 }, (_, index) => index);
  
  return (
    <div className="calendar-container">
      <div className="calendar-grid">
        {months.map(month => {
          const firstDay = getFirstDayOfMonth(year, month);
          const numDays = DAYS_IN_MONTH[month];
          const placeholders = Array.from({ length: firstDay });
          const days = Array.from({ length: numDays }, (_, i) => i + 1);
          
          return (
            <div className="month-grid" key={month}>
              {placeholders.map((_, i) => (
                <Dot key={`ph-${i}`} isPlaceholder={true} />
              ))}
              {days.map(day => {
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                
                let status = 'future';
                const isPastOrToday = dateStr <= todayStr;
                
                if (progress[dateStr] === 'completed') {
                  status = 'completed';
                } else if (progress[dateStr] === 'missed') {
                  status = 'missed';
                } else if (isPastOrToday) {
                  status = 'missed';
                } else {
                  status = 'future';
                }
                
                return (
                  <Dot 
                    key={day} 
                    day={day}
                    status={status} 
                    onClick={() => onToggleClick(dateStr, status)} 
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
