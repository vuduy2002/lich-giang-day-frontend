import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { convertFromYYYYMMDD, convertToYYYYMMDD } from '../../formatDate'; // Ensure you have conversion functions

const InputDate = ({ dateValue, handleChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (newDate) => {
    const formattedDate = convertToYYYYMMDD(newDate); // Convert date format as needed
    handleChange(formattedDate);
    setShowCalendar(false);
  };

  return (
    <div className="show-date">
      <label htmlFor="dateInput">Chọn ngày:</label>
      <div className="date-input-container">
        <input
          type="text"
          name="date"
          placeholder="ngày / tháng / năm"
          value={convertFromYYYYMMDD(dateValue)}
          readOnly
          className="display-date"
          onClick={toggleCalendar}
        />
        <span className="date-icon" onClick={toggleCalendar}>
          <i className="fas fa-calendar-alt"></i>
        </span>
        {showCalendar && (
          <div className="calendar-container">
            <Calendar onChange={handleDateChange} value={new Date(dateValue)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputDate;
