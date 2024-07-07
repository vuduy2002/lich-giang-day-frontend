import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import {
    getEvents,
    deleteEvent,
} from '../../../services/AdminService/eventService';
import style from './listEvents.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import EventForm from '../eventForm';

const cx = classNames.bind(style);

const ListEventsAdmin = () => {
    const [events, setEvents] = useState([]);
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({});
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await getEvents();
            setEvents(response.data);
        };
        fetchEvents();
    }, [checkUpdate]);

    // Thực hiện xử lý xóa sự kiện
    const handleDelete = async (event) => {
        if (
            window.confirm(
                `Bạn muốn xóa sự kiện có id : ${event.eventId} : ${event.eventName}`,
            ) === true
        ) {
            await deleteEvent(event.eventId);
            const response = await getEvents();
            setEvents(response.data);
        }
    };

    const handleEdit = (event) => {
        // Thực hiện xử lý cập nhật
        setCheckUpdate(true);
        setCurrentEvent(event);
    };

    // // Tìm kiếm
    const filteredEvents = events.filter((event) => {
        const name = event.eventName?.toLowerCase() || '';
        const description = event.eventDescription?.toLowerCase() || '';
        const location = event.eventLocation?.toLowerCase() || '';
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

        return (
            name.includes(query) ||
            description.includes(query) ||
            location.includes(query) ||
            host.includes(query) ||
            participants.includes(query)
        );
    });

    //render name to list events
    const renderName = (arr) => {
        return arr.map((item, index) => {
            return ` ${item.lecturerName},`;
        });
    };

    return checkUpdate ? (
        <EventForm title={'Cập nhật Sự kiện'} onBack={setCheckUpdate}>
            {currentEvent}
        </EventForm>
    ) : (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Danh Sách Sự Kiện</h1>
            <input
                type="text"
                placeholder="Tìm kiếm Sự kiện..."
                className={cx('inputSearch')}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            ></input>
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
                        {filteredEvents &&
                            filteredEvents.map((event, index) => (
                                <tr key={index}>
                                    <td>{event.eventId}</td>
                                    <td>{event.eventName}</td>
                                    <td>{event.eventDescription}</td>
                                    <td>{event.date}</td>
                                    <td>{event.timeStart}</td>
                                    <td>{event.timeEnd}</td>
                                    <td>{event.eventLocation}</td>
                                    <td>{event.eventType.typeName}</td>
                                    <td>{renderName(event.host)}</td>
                                    <td>{renderName(event.participants)}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            onClick={() => handleEdit(event)}
                                            className={cx('icon', 'edit-icon')}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={() => handleDelete(event)}
                                            className={cx(
                                                'icon',
                                                'delete-icon',
                                            )}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListEventsAdmin;