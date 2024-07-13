import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { getEvents, deleteEvent } from '../../../../services/eventService';
import { deleteAttendanceReport } from '../../../../services/attendanceService';
import style from './listEvents.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import EventForm from '../eventForm';
import {convertFromYYYYMMDD} from '../../../formatDate'
import { Link } from 'react-router-dom';
import InputDate from '../../inputDate';

const cx = classNames.bind(style);

const ListEventsAdmin = () => {
    const [events, setEvents] = useState([]);
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await getEvents();
            setEvents(response.data);
        };
        fetchEvents();
    }, [checkUpdate]);

    const handleDelete = async (event) => {
        if (
            window.confirm(
                `Bạn muốn xóa sự kiện có id : ${event.eventId} : ${event.eventName}`
            ) === true
        ) {
            await deleteEvent(event.eventId);
            await deleteAttendanceReport(event.eventId);
            const response = await getEvents();
            setEvents(response.data);
        }
    };

    const handleEdit = (event) => {
        setCheckUpdate(true);
        setCurrentEvent(event);
    };

    //check search: enddate < startdate
    if(startDate.date || endDate.date){
        console.log('hehe')
        if(new Date(startDate.date) > new Date(endDate.date) ){
            alert('ngày kết thúc không được lớn hơn ngày bắt đầu')
            setEndDate(startDate);
        }
    }

    const filteredEvents = events.filter((event) => {
        const name = event.eventName?.toLowerCase() || '';
        const description = event.eventDescription?.toLowerCase() || '';
        const host = Array.isArray(event.host)
            ? event.host
                  .map((host) => host.lecturerName.toLowerCase())
                  .join(' ')
            : '';
        const participants = Array.isArray(event.participants)
            ? event.participants
                  .map((participant) => participant.lecturerName.toLowerCase())
                  .join(' ')
            : '';
        const query = inputValue.toLowerCase();

        const eventDate = new Date(event.date);
        const validStartDate = startDate ? new Date(startDate.date) : null;
        const validEndDate = endDate ? new Date(endDate.date) : null;

        const isAfterStartDate = !validStartDate || eventDate >= validStartDate;
        const isBeforeEndDate = !validEndDate || eventDate <= validEndDate;

        return (
            (name.includes(query) ||
            description.includes(query) ||
            host.includes(query) ||
            participants.includes(query)) &&
            isAfterStartDate &&
            isBeforeEndDate
        );
    });

    const renderName = (arr) => {
        return arr.map((item, index) => {
            return ` ${item.lecturerName},`;
        });
    };

    const isPastEvent = (eventDate) => {
        const currentDate = new Date();
        return new Date(eventDate) < currentDate;
    };


    return checkUpdate ? (
        <EventForm title={'Cập nhật Sự kiện'} onBack={setCheckUpdate}>
            {currentEvent}
        </EventForm>
    ) : (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Danh Sách Sự Kiện</h1>

            <div className={cx('box-search')}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Sự kiện..."
                    className={cx('inputSearch')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                ></input>

                <div className={cx('box-date-input')}>
                    <p>
                        Từ: 
                    </p>
                    <InputDate 
                        dateValue={startDate.date}
                        className={cx('date-input')}
                        setFormData={setStartDate}
                    />
                    <p>
                        đến: 
                    </p>
                    <InputDate 
                        dateValue={endDate.date}
                        className={cx('date-input')}
                        setFormData={setEndDate}
                    />

                </div>
            </div>

            <div className={cx('boxTable')}>
                <table className={cx('table')}>
                    <thead className={cx('thead')}>
                        <tr>
                            <th>Id</th>
                            <th>Tên sự kiện</th>
                            <th>Mô tả</th>
                            <th>Ngày</th>
                            <th>Thời gian bắt đầu</th>
                            <th>Thời gian kết thúc</th>
                            <th>Địa điểm</th>
                            <th>Loại sự kiện</th>
                            <th>Người chủ trì</th>
                            <th>Thành viên tham gia</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody className={cx('tbody')}>
                        {filteredEvents.length>0 ?
                            filteredEvents.map((event, index) => (
                                <tr key={index}>
                                    <td>{event.eventId}</td>
                                    <td>{event.eventName}</td>
                                    <td>{event.eventDescription}</td>
                                    <td>{convertFromYYYYMMDD(event.date)}</td>
                                    <td>{event.timeStart}</td>
                                    <td>{event.timeEnd}</td>
                                    <td>{event.eventLocation?.locationName || 'Dữ liệu đã bị chỉnh sửa hoặc xóa!'}</td>
                                    <td>{event.eventType?.typeName || 'Dữ liệu đã bị chỉnh sửa hoặc xóa!'}</td>
                                    <td>{renderName(event.host)}</td>
                                    <td>{renderName(event.participants)}</td>
                                    <td>
                                        {isPastEvent(event.date) ? (
                                           <Link to='/report' state={event.eventId}>
                                                <FontAwesomeIcon
                                                    icon={faFileAlt}
                                                    className={cx('icon', 'report-icon')}
                                                />
                                           </Link>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon
                                                    icon={faPen}
                                                    onClick={() => handleEdit(event)}
                                                    className={cx('icon', 'edit-icon')}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    onClick={() => handleDelete(event)}
                                                    className={cx('icon', 'delete-icon')}
                                                />
                                            </>
                                        )}
                                    </td>
                                </tr>
                            )) : <tr><td>Không có kết quả phù hợp....</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListEventsAdmin;
