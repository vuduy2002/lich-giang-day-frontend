import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './formShowEvent.module.scss';
import Button from '../../Button';

const cx = classNames.bind(style);
 
const FormShowEvent = ({ event, onClose }) => {
    const [attending, setAttending] = useState(true);
    const [reason, setReason] = useState('');

    const handleAttendingChange = (e) => {
        setAttending(e.target.value === 'yes');
    };

    const handleReasonChange = (e) => {
        setReason(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        onClose();
    };

    return (
        <div className={cx('form-show-event')}>
            <div className={cx('content')}>
                <h3 className={cx('head-title')}>
                    {event.eventName.toUpperCase()}
                </h3>
                <p >{event.eventDescription}</p>
                <p className={cx('row-title')}>
                    <span className={cx('title')}>Ngày:</span>{' '}
                    <span className={cx('text')}>{event.date}</span> 
                </p> 
                <p className={cx('row-title')}>
                    <span className={cx('title')}>Thời gian:</span>{' '}
                    <span className={cx('text')}>{event.timeStart} - {event.timeEnd}</span>
                </p>
                <p className={cx('row-title')}>
                    <span className={cx('title')}>Địa điểm:</span>{' '}
                    <span className={cx('text')}>{event.eventLocation}</span>
                </p>
                <p className={cx('row-title')}>
                    <span className={cx('title')}>Người chủ trì:</span>{' '}
                    <span className={cx('text')}>{event.host.map((host) => host.lecturerName).join(', ')}</span>
                </p>
                <p className={cx('row-title')}>
                    <span className={cx('title')}>Thành viên: </span>
                    <span className={cx('text')}>
                        {event.participants
                            .map((participant) => participant.lecturerName)
                            .join(', ')}
                    </span>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label className={cx('title')}>
                            Bạn sẽ tham gia chứ?
                        </label>
                        <input
                            type="radio"
                            value="yes"
                            checked={attending}
                            onChange={handleAttendingChange}
                        />{' '}
                        Yes
                        <input
                            type="radio"
                            value="no"
                            checked={!attending}
                            onChange={handleAttendingChange}
                        />{' '}
                        No
                    </div>
                    {!attending && (
                        <div className={cx('form-group')}>
                            <label>Lý do vắng mặt:</label>
                            <textarea
                                value={reason}
                                onChange={handleReasonChange}
                            ></textarea>
                        </div>
                    )}
                    <Button size="S" primary type="submit">
                        Submit
                    </Button>
                </form>
                <Button size="S" outline onClick={onClose}>
                    Back
                </Button>
            </div>
        </div>
    );
};

export default FormShowEvent;
