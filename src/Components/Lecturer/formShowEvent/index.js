import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './formShowEvent.module.scss';
import Button from '../../Button';
import { convertFromYYYYMMDD } from '../../formatDate';
import { updateEvent } from '../../../services/Admin/eventService';
import routes from '../../../routes/confix/Routes';
import { Link } from 'react-router-dom';
import InputCheckBox_Radio from '../../checkBox';

const cx = classNames.bind(style);

const FormShowEvent = ({
    event = {},
    currId = {},
    onlyShow = false,
    onClose = () => {},
}) => {
    const [currUser, setCurrUser] = useState({});

    // Lấy currUser dựa trên currId trong host hoặc participants
    useEffect(() => {
        const user =
            event.host?.find((item) => item.lecturerId === currId) ||
            event.participants?.find((item) => item.lecturerId === currId);
        if (user) setCurrUser(user);
    }, [event, currId]);

    // Xử lý thay đổi xác nhận tham gia
    const handleAttendingChange = (e) => {
        const { name, value } = e.target;
        setCurrUser((prev) => ({
            ...prev,
            [name]: value,
            reason: value === 'Không' ? prev.reason : '', // Xóa lý do khi tham gia
        }));
    };

    // Xử lý thay đổi lý do vắng mặt
    const handleReasonChange = (e) => {
        const { name, value } = e.target;
        setCurrUser((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý submit và cập nhật event
    const handleSubmit = async (e) => {
        e.preventDefault();
        let updateConfirm;
        if (currUser.isHost) {
            updateConfirm = event.host.map((item) =>
                item.lecturerId === currId ? currUser : item,
            );
            event.host = updateConfirm;
        } else {
            updateConfirm = event.participants.map((item) =>
                item.lecturerId === currId ? currUser : item,
            );
            event.participants = updateConfirm;
        }
        try {
            event.eventLocation = event.eventLocation.locationId;
            event.eventType = event.eventType.typeId;

            await updateEvent(event.eventId, event);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Failed to update event:', error);
        }
    };

    const eventDateTime = new Date(`${event.date}T${event.timeStart}`);
    const isEventInPast = eventDateTime < new Date();

    console.log(event.host);
    return (
        <div className={cx('form-show-event')}>
            <div className={cx('content')}>
                {
                    <>
                        <h3 className={cx('head-title')}>
                            {event.eventName.toUpperCase()}
                        </h3>
                        <p>{event.eventDescription}</p>
                        <p className={cx('row-title')}>
                            <span className={cx('title')}>Id:</span>
                            <span className={cx('text')}>{event.eventId}</span>
                        </p>
                        <p className={cx('row-title')}>
                            <span className={cx('title')}>Loại sự kiện:</span>
                            <span className={cx('text')}>
                                {event.eventType?.typeName || (
                                    <span style={{ color: 'red' }}>
                                        'Dữ liệu đã bị chỉnh sửa hoặc xóa!'
                                    </span>
                                )}
                            </span>
                        </p>
                        <p className={cx('row-title')}>
                            <span className={cx('title')}>Ngày:</span>
                            <span className={cx('text')}>
                                {convertFromYYYYMMDD(event.date)}
                            </span>
                        </p>
                        <p className={cx('row-title')}>
                            <span className={cx('title')}>Thời gian:</span>
                            <span className={cx('text')}>
                                {event.timeStart} - {event.timeEnd}
                            </span>
                        </p>
                        <p className={cx('row-title')}>
                            <span className={cx('title')}>Địa điểm:</span>
                            <span className={cx('text')}>
                                {event.eventLocation?.locationName || (
                                    <span style={{ color: 'red' }}>
                                        'Dữ liệu đã bị chỉnh sửa hoặc xóa!'
                                    </span>
                                )}
                            </span>
                        </p>
                        <p className={cx('row-title')}>
                            <span className={cx('title')}>Người chủ trì:</span>
                            <span className={cx('text')}>
                                {event.host
                                    ?.map(
                                        (host) =>
                                            `${host.lecturerName}(${host.lecturerId})`,
                                    )
                                    .join(', ')}
                            </span>
                        </p>
                        {currUser.isHost && (
                            <Link
                                to={routes.report}
                                state={{ event, currUser }}
                            >
                                <Button size="S" primary>
                                    {' '}
                                    Điểm danh
                                </Button>
                            </Link>
                        )}

                        <ParticipantTable participants={event.participants} />

                        {!onlyShow && (
                            <AttendingForm
                                currUser={currUser}
                                handleAttendingChange={handleAttendingChange}
                                handleReasonChange={handleReasonChange}
                                handleSubmit={handleSubmit}
                                isEventInPast={isEventInPast}
                            />
                        )}
                        <Button size="S" outline onClick={onClose}>
                            Back
                        </Button>
                    </>
                }
            </div>
        </div>
    );
};

// Component hiển thị danh sách tham gia
const ParticipantTable = ({ participants }) => (
    <table className={cx('participant-table')}>
        <thead>
            <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Phản hồi tham gia</th>
                <th>Lý do</th>
            </tr>
        </thead>
        <tbody>
            {participants?.map((participant) => (
                <tr key={participant.lecturerId}>
                    <td>{participant.lecturerId}</td>
                    <td>{participant.lecturerName}</td>
                    <td>{participant.confirm}</td>
                    <td>{participant.reason}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

// Component form chọn tham gia sự kiện
const AttendingForm = ({
    currUser,
    handleAttendingChange,
    handleReasonChange,
    handleSubmit,
    isEventInPast,
}) => (
    <form onSubmit={handleSubmit}>
        <div className={cx('form-group')}>
            <p className={cx('title')}>Bạn sẽ tham gia chứ?</p>
            <div style={{ display: 'flex' }}>
                <InputCheckBox_Radio
                    name="confirm"
                    type="radio"
                    value="Có"
                    checked={currUser.confirm === 'Có'}
                    handleChange={handleAttendingChange}
                    // disable={isEventInPast}
                    className={cx('')}
                />{' '}
                Có
                <InputCheckBox_Radio
                    name="confirm"
                    type="radio"
                    value="Không"
                    className={cx('')}
                    checked={currUser.confirm === 'Không'}
                    handleChange={handleAttendingChange}
                    // disable={isEventInPast}
                />{' '}
                Không
            </div>
        </div>
        {currUser.confirm === 'Không' && (
            <div className={cx('form-group')}>
                <label>Lý do vắng mặt:</label>
                <textarea
                    // className={cx('text-2xl')}
                    name="reason"
                    value={currUser.reason}
                    onChange={handleReasonChange}
                    required
                    // disabled={isEventInPast}
                ></textarea>
            </div>
        )}
        {/* {!isEventInPast && (
        )} */}
        <Button size="S" primary type="submit">
            Submit
        </Button>
    </form>
);

export default FormShowEvent;
