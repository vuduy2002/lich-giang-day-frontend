import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styling
import classNames from 'classnames/bind';
import styles from './inputDate.module.scss';
import { convertFromYYYYMMDD } from '../../formatDate';

const cx = classNames.bind(styles);

const InputDate = ({ dateValue, className, setFormData }) => {
  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setDate(dateValue);
  }, [dateValue]);

  const handleDateChange = (newDate) => {
    const formattedMonth = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
    const formattedDate = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
    
    setFormData((prev) => ({
      ...prev,
      date: `${newDate.getFullYear()}-${formattedMonth}-${formattedDate}`,
    }));
    setShowCalendar(false);
  };

  const handleInputClick = () => {
    setShowCalendar((prev) => !prev);
  };
  console.log(date)

  return (
    <div className={cx('showDate')}>
      <Tippy
        interactive={true}
        visible={showCalendar}
        placement="bottom-start"
        onClickOutside={() => setShowCalendar(false)}
        offset={[0, 0]} // Adjust this to change the vertical position
        arrow={false} // Hide the arrow
        content={
          <div className={cx('calendarContainer')}>
            <Calendar
              onChange={handleDateChange}
              value={dateValue ? new Date(dateValue) : new Date()}
            />
          </div>
        }
      >
        <div className={cx('dateInputContainer')}>
          <input
            type="text"
            name="date"
            placeholder="ngày / tháng / năm"
            value={date ? convertFromYYYYMMDD(date) : ''}
            readOnly
            className={className}
            onClick={handleInputClick}
          />
        </div>
      </Tippy>
    </div>
  );
};

export default InputDate;
