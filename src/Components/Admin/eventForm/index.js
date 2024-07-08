import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import style from './eventForm.module.scss';
import Button from '../../Button/Button';
import { getLecturers } from '../../../services/lectureService';
import { getEventTypes } from '../../../services/eventTypeService';

import {
    createEvent,
    updateEvent,
    getEvents,
} from '../../../services/eventService';
import Search from '../searchLecturer';

const cx = classNames.bind(style);

const EventForm = ({ children = false, onBack = false, title = false }) => {
    const [formData, setFormData] = useState({
        eventId: '',
        eventName: '',
        eventDescription: '',
        date: '',
        timeStart: '',
        timeEnd: '',
        eventLocation: '',
        eventType: '',
        host: [],
        participants: [],
    });

    // to create or update

    const [users, setUsers] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [events, setEvents] = useState([]);
    const [errors, setErrors] = useState({});
    const [availableTimes, setAvailableTimes] = useState([]);
    const [host, setHost] = useState([]);
    const [members, setMembers] = useState([]);

    const inputRef = useRef();

    // Featch data
    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            // Fetch lecturers from API
            const response1 = await getLecturers();
            setUsers(response1.data);

            // Fetch event types from API
            const response2 = await getEventTypes();
            setEventTypes(response2.data);

            // Fetch events from API
            const response3 = await getEvents();
            setEvents(response3.data);
        };

        fetchData();
        // nếu update -> set data
        if (children) setFormData(children);
    }, [children]);

    // Fillter ngày dc chọn
    useEffect(() => {
        if (formData.date) {
            let arrEvent = events;
            if (children) {
                const listNoChild = events.filter(
                    (event) => event.id !== children.id,
                );
                arrEvent = listNoChild;
            }
            const filteredEvents = arrEvent.filter(
                (event) => event.date === formData.date,
            );

            const times = filteredEvents.map((event) => ({
                timeStart: event.timeStart,
                timeEnd: event.timeEnd,
            }));
            setAvailableTimes(times);
        }
    }, [formData.date, events, children]);

    // check and Set form data
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const user = users.find((user) => user.lecturerId === value);

        if (type === 'checkbox') {
            const updatedArray = checked
                ? [
                      ...formData[name],
                      {
                          lecturerId: user.lecturerId,
                          lecturerName: user.lecturerName,
                      },
                  ] // tick chon
                : formData[name].filter((item) => item.lecturerId !== value); // bỏ tick chọn
            setFormData({
                ...formData,
                [name]: updatedArray,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        if (!formData.eventName)
            newErrors.eventName = 'Vui lòng nhập tên sự kiện';
        if (!formData.eventDescription)
            newErrors.eventDescription = 'Vui lòng nhập mô tả';
        if (!formData.date) newErrors.date = 'Vui lòng chọn ngày';
        if (!formData.timeStart)
            newErrors.timeStart = 'Vui lòng nhập thời gian bắt đầu';
        if (!formData.timeEnd)
            newErrors.timeEnd = 'Vui lòng nhập thời gian kết thúc';
        if (!formData.eventLocation)
            newErrors.eventLocation = 'Vui lòng nhập địa điểm';
        if (!formData.eventType)
            newErrors.eventType = 'Vui lòng chọn loại sự kiện';
        if (formData.host.length === 0)
            newErrors.host = 'Vui lòng chọn ít nhất một người chủ trì';
        if (formData.participants.length === 0)
            newErrors.participants =
                'Vui lòng chọn ít nhất một thành viên tham gia';

        // Check time conflicts
        if (formData.date) {
            const isConflict = availableTimes.some(
                (time) =>
                    (formData.timeStart >= time.timeStart &&
                        formData.timeStart < time.timeEnd) ||
                    (formData.timeEnd > time.timeStart &&
                        formData.timeEnd <= time.timeEnd) ||
                    (formData.timeStart <= time.timeStart &&
                        formData.timeEnd >= time.timeEnd),
            );
            if (isConflict)
                newErrors.time =
                    'Thời gian sự kiện bị trùng. Vui lòng chọn thời gian khác.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // obj lecture -> arr lecturerId
    const getLecturerIds = (arr) => {
        return arr.map((item) => {
            return item.lecturerId;
        });
    };

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();
        let newData = {};
        //
        if (validateForm()) {
            if (children) {
                newData = {
                    ...formData,
                    eventType: formData.eventType.typeId,
                    host: getLecturerIds(formData.host),
                    participants: getLecturerIds(formData.participants),
                };
                // update to database
                const handleUpdate = async () => {
                    await updateEvent(children.eventId, newData);
                };
                handleUpdate();
                alert('Cập nhật thành công!');
                onBack(false);
            } else {
                newData = {
                    ...formData,
                    eventType: formData.eventType,
                    host: getLecturerIds(formData.host),
                    participants: getLecturerIds(formData.participants),
                };
                // create to database
                const handleCreate = async () => {
                    await createEvent(newData);
                };
                handleCreate();

                alert('Tạo thành công!');
                //reset form
                setFormData({
                    eventId: '',
                    eventName: '',
                    eventDescription: '',
                    date: '',
                    timeStart: '',
                    timeEnd: '',
                    eventLocation: '',
                    eventType: '',
                    host: [],
                    participants: [],
                });

                setErrors({});
                setAvailableTimes([]);

                //auto forcus
                inputRef.current.focus();
            }
        }
    };

    // Lấy name render ra input aria
    useEffect(() => {
        setHost(formData.host.map((user) => user.lecturerName));
    }, [formData.host]);
    useEffect(() => {
        setMembers(formData.participants.map((user) => user.lecturerName));
    }, [formData.participants]);

    // Create eventId
    useEffect(() => {
        if (!children) {
            let newId = '';
            let arrId = events.map((event) => event.eventId);
            do {
                const randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4 number
                newId = `EV${randomNum}`;
            } while (arrId.includes(newId));
            setFormData((prev) => ({
                ...prev,
                eventId: newId,
            }));
        }
    }, [events, children]);

    
    return (
        <div className={cx('container')}>
            {onBack && (
                <Button
                    leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                    onClick={() => {
                        onBack(false);
                    }}
                >
                    Quay lại
                </Button>
            )}

            <h2 className={cx('title')}>{title}</h2>
            <form onSubmit={handleSubmit} className={cx('form')}>
                <label className={cx('label')}>
                    ID sự kiện:
                    <input
                        className={cx('input')}
                        type="text"
                        name="eventId"
                        placeholder="! Chọn loại sự kiện sẽ tự tạo Id ! "
                        disabled
                        value={formData.eventId}
                        onChange={handleChange}
                    />
                </label>

                <label className={cx('label')}>
                    Loại sự kiện:
                    <select
                        className={cx('select')}
                        name="eventType"
                        value={formData.eventType.typeId}
                        onChange={handleChange}
                    >
                        <option value="">Chọn loại sự kiện</option>
                        {eventTypes.map((type) => (
                            <option key={type.typeId} value={type.typeId}>
                                {type.typeName}
                            </option>
                        ))}
                    </select>
                    {errors.eventType && (
                        <span className={cx('error')}>{errors.eventType}</span>
                    )}
                </label>

                <label className={cx('label')}>
                    Tên sự kiện:
                    <input
                        className={cx('input')}
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        ref={inputRef}
                        onChange={handleChange}
                    />
                    {errors.eventName && (
                        <span className={cx('error')}>{errors.eventName}</span>
                    )}
                </label>

                <label className={cx('label')}>
                    Mô tả:
                    <textarea
                        className={cx('textarea')}
                        name="eventDescription"
                        value={formData.eventDescription}
                        onChange={handleChange}
                    ></textarea>
                    {errors.eventDescription && (
                        <span className={cx('error')}>
                            {errors.eventDescription}
                        </span>
                    )}
                </label>

                <fieldset className={cx('fieldset')}>
                    <legend className={cx('legend')}>Người chủ trì:</legend>
                    <div className={cx('boxSearch')}>
                        <textarea
                            className={cx('textareaSearch')}
                            value={host}
                            disabled
                        ></textarea>
                        <Search
                            className={cx('search')}
                            arrData={users}
                            formData={formData.host}
                            name="host"
                            handleChange={handleChange}
                        />
                    </div>

                    {errors.host && (
                        <span className={cx('error')}>{errors.host}</span>
                    )}
                </fieldset>

                <fieldset className={cx('fieldset')}>
                    <legend className={cx('legend')}>
                        Thành viên tham gia:
                    </legend>
                    <div className={cx('boxSearch')}>
                        <textarea
                            className={cx('textareaSearch')}
                            value={members}
                            disabled
                        ></textarea>
                        <Search
                            className={cx('search')}
                            arrData={users}
                            formData={formData.participants}
                            name="participants"
                            handleChange={handleChange}
                        />
                    </div>

                    {errors.participants && (
                        <span className={cx('error')}>
                            {errors.participants}
                        </span>
                    )}
                </fieldset>

                <label className={cx('label')}>
                    Ngày:
                    <input
                        className={cx('input')}
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    {errors.date && (
                        <span className={cx('error')}>{errors.date}</span>
                    )}
                </label>
                {availableTimes.length > 0 && (
                    <label>
                        Các khung giờ đã có lịch:{' '}
                        <ul className={cx('duplicateTime')}>
                            {availableTimes.map((time) => {
                                return (
                                    <li key={time.timeStart}>
                                        {time.timeStart} - {time.timeEnd}
                                    </li>
                                );
                            })}
                        </ul>
                    </label>
                )}
                <label className={cx('label')}>
                    Thời gian bắt đầu:
                    <input
                        className={cx('input')}
                        type="time"
                        name="timeStart"
                        value={formData.timeStart}
                        onChange={handleChange}
                    />
                    {errors.timeStart && (
                        <span className={cx('error')}>{errors.timeStart}</span>
                    )}
                </label>
                <label className={cx('label')}>
                    Thời gian kết thúc:
                    <input
                        className={cx('input')}
                        type="time"
                        name="timeEnd"
                        value={formData.timeEnd}
                        onChange={handleChange}
                    />
                    {errors.timeEnd && (
                        <span className={cx('error')}>{errors.timeEnd}</span>
                    )}
                    {errors.time && (
                        <span className={cx('error')}>{errors.time}</span>
                    )}
                </label>
                <label className={cx('label')}>
                    Địa điểm:
                    <input
                        className={cx('input')}
                        type="text"
                        name="eventLocation"
                        value={formData.eventLocation}
                        onChange={handleChange}
                    />
                    {errors.eventLocation && (
                        <span className={cx('error')}>
                            {errors.eventLocation}
                        </span>
                    )}
                </label>

                <Button primary onClick={handleSubmit}>
                    {title}
                </Button>
            </form>
        </div>
    );
};

export default EventForm;
