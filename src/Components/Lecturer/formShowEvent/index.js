import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './formShowEvent.module.scss';
import Button from '../../Button';
import { getAttendanceReportById, updateAttendanceReport } from '../../../services/attendanceService';

const cx = classNames.bind(style);

const FormShowEvent = ({ event, curUser, onClose }) => {
    const [attending, setAttending] = useState({});
    const [obConfirm, setObConfirm] = useState({
        lecturerId: '',
        confirm: 'chưa phản hồi',
        reason: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAttendanceReportById(event.eventId);
            const { __v, _id, ...rest } = response.data;
            setAttending(rest);
        };
        fetchData();
    }, [event.eventId]);

    useEffect(() => {
        if (attending.lecturers) {
            const atdOfCur = attending.lecturers.find((item) => item.lecturerId === curUser);
            setObConfirm(atdOfCur || { lecturerId: curUser, confirm: 'chưa phản hồi', reason: '' });
        }
    }, [attending, curUser]);

    const handleAttendingChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === 'true';

        setObConfirm((prev) => ({
            ...prev,
            [name]: newValue,
            ...(name === 'confirm' && newValue ? { reason: '' } : {})
        }));
    };

    const handleReasonChange = (e) => {
        const { name, value } = e.target;
        setObConfirm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Không thay đổi `reason` nếu `confirm` không phải `true`
        const updatedObConfirm = obConfirm.confirm === true ? { ...obConfirm, reason: '' } : obConfirm;

        const updatedLecturers = attending.lecturers.map((lecturer) =>
            lecturer.lecturerId === updatedObConfirm.lecturerId ? updatedObConfirm : lecturer
        );
        const updatedAttending = { ...attending, lecturers: updatedLecturers };

        // Call API to update attendance report
        updateAttendanceReport(event.eventId, updatedAttending);

        onClose();
    };

    return (
        <div className={cx('form-show-event')}>
            <div className={cx('content')}>
                <h3 className={cx('head-title')}>{event.eventName.toUpperCase()}</h3>
                <p>{event.eventDescription}</p>
                <p className={cx('row-title')}>
                    <span className={cx('title')}>Ngày:</span> <span className={cx('text')}>{event.date}</span>
                </p>
                <p className={cx('row-title')}>
                    <span className={cx('title')}>Thời gian:</span>{' '}
                    <span className={cx('text')}>
                        {event.timeStart} - {event.timeEnd}
                    </span>
                </p>
                <p className={cx('row-title')}>
                    <span className={cx('title')}>Địa điểm:</span> <span className={cx('text')}>{event.eventLocation.locationName}</span>
                </p>
                <p className={cx('row-title')}>
                    <span className={cx('title')}>Người chủ trì:</span>{' '}
                    <span className={cx('text')}>{event.host.map((host) => host.lecturerName).join(', ')}</span>
                </p>
                <p className={cx('row-title')}>
                    <span className={cx('title')}>Thành viên: </span>
                    <span className={cx('text')}>
                        {event.participants.map((participant) => participant.lecturerName).join(', ')}
                    </span>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label className={cx('title')}>Bạn sẽ tham gia chứ?</label>
                        <input
                            name="confirm"
                            type="radio"
                            value="true"
                            checked={obConfirm.confirm === true}
                            onChange={handleAttendingChange}
                        />{' '}
                        Yes
                        <input
                            name="confirm"
                            type="radio"
                            value="false"
                            checked={obConfirm.confirm === false}
                            onChange={handleAttendingChange}
                        />{' '}
                        No
                    </div>
                    {obConfirm.confirm === false && (
                        <div className={cx('form-group')}>
                            <label>Lý do vắng mặt:</label>
                            <textarea
                                name="reason"
                                value={obConfirm.reason}
                                onChange={handleReasonChange}
                                required={obConfirm.confirm === false}
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
