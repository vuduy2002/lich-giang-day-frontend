import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faClock,
    faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

import style from './Calender.module.scss';
import FormShowEvent from '../../Lecturer/formShowEvent';
import Popper from '../../Popper/Popper';
import routes from '../../../routes/confix/Routes';
import { Link } from 'react-router-dom';
import {
    deleteEvent,
    updateEvent,
} from '../../../services/Lecturer/privateEventService';

const cx = classNames.bind(style);

const CalendarComponent = ({ events, curUser, privateEvents }) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showOption, setShowOption] = useState(null);
    const [dayEvents, setDayEvents] = useState({
        eventsOfDay: [],
        privateEventsOfDay: [],
    });

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeSwitch, setActiveSwitch] = useState('eventSchool');

    const onChange = (date) => {
        setDate(date);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const isSameDay = (event) => {
                return (
                    new Date(event.date).toDateString() === date.toDateString()
                );
            };

            const dayHasEvents = events.some((event) => isSameDay(event));
            const dayHasPrEvents = privateEvents.some((event) =>
                isSameDay(event),
            );
            const isPastDate = date < new Date();

            if (dayHasEvents || dayHasPrEvents) {
                return (
                    <div>
                        {dayHasEvents && (
                            <FontAwesomeIcon
                                icon={faBell}
                                style={{ color: isPastDate ? 'gray' : 'red' }}
                            />
                        )}
                        {dayHasPrEvents && (
                            <FontAwesomeIcon
                                icon={faClock}
                                style={{
                                    color: isPastDate ? 'gray' : 'aqua',
                                }}
                            />
                        )}
                    </div>
                );
            }
        }
        return null;
    };

    const handleDayClick = (date) => {
        const filtered = (events) => {
            return events.filter((event) => {
                return (
                    new Date(event.date).toDateString() === date.toDateString()
                );
            });
        };

        setDayEvents({
            eventsOfDay: filtered(events),
            privateEventsOfDay: filtered(privateEvents),
        });

        setShow(true);
    };

    const checkSwich = activeSwitch === 'eventSchool';

    const handleEventClick = (event) => {
        if (checkSwich) setSelectedEvent(event);
    };

    const handleClose = () => {
        setSelectedEvent(null);
    };

    const handleDelete = async (id, name) => {
        try {
            if (
                window.confirm(`Bạn muốn xóa sự kiện có Tên : ${name}`) === true
            ) {
                await deleteEvent(id);
                alert('Thanh cong');
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const renderEvents = checkSwich
        ? dayEvents.eventsOfDay
        : dayEvents.privateEventsOfDay;

    return (
        <div className={cx('wrapper')}>
            <Calendar
                className={cx('calendar')}
                onChange={onChange}
                value={date}
                tileContent={tileContent}
                onClickDay={handleDayClick}
            />
            {show && (
                <Popper bold>
                    <div className={cx('top-bobber')}>
                        <div className={cx('switch-events')}>
                            <p
                                className={cx('switch', 'eventSchool', {
                                    active: checkSwich,
                                })}
                                onClick={() => setActiveSwitch('eventSchool')}
                            >
                                Sự kiện nhà trường
                            </p>
                            <p
                                className={cx('switch', 'eventPrivate', {
                                    active: !checkSwich,
                                })}
                                onClick={() => setActiveSwitch('eventPrivate')}
                            >
                                Sự kiện cá nhân
                            </p>
                        </div>
                        {!checkSwich && (
                            <div className={cx('box-add-events')}>
                                <Link
                                    to={routes.privateEvents}
                                    state={{ date: date }}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlusCircle}
                                        className={cx('add-events')}
                                    />
                                    <p className={cx('desciption')}>
                                        Thêm sự kiện cá nhân
                                    </p>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className={cx('events-wrapper')}>
                        {renderEvents.length > 0 ? (
                            renderEvents.map((event) => (
                                <div
                                    key={event.eventId}
                                    className={cx('event-detail')}
                                    onClick={() => handleEventClick(event)}
                                    onMouseEnter={() =>
                                        !checkSwich &&
                                        setShowOption(event.eventId)
                                    }
                                    onMouseLeave={() =>
                                        !checkSwich && setShowOption(null)
                                    }
                                >
                                    <h3>{event.eventName}</h3>
                                    <FontAwesomeIcon
                                        icon={faClock}
                                        style={{ color: 'gray' }}
                                    />
                                    {!checkSwich
                                        ? ` ${event.time}`
                                        : ` ${event.timeStart} - ${event.timeEnd}`}
                                    <span style={{ fontWeight: '400' }}>
                                        {!checkSwich
                                            ? ` : ${event.eventDescription}`
                                            : ``}
                                    </span>
                                    {!checkSwich &&
                                        showOption === event.eventId && (
                                            <div
                                                className={cx('option', {
                                                    active:
                                                        showOption ===
                                                        event.eventId,
                                                })}
                                            >
                                                <Link
                                                    to={routes.privateEvents}
                                                    state={{
                                                        event,
                                                        update: true,
                                                    }}
                                                >
                                                    <p
                                                        className={cx(
                                                            'btt-update',
                                                        )}
                                                    >
                                                        Sửa
                                                    </p>
                                                </Link>
                                                <p
                                                    className={cx('btt-dalete')}
                                                    onClick={() => {
                                                        handleDelete(
                                                            event.eventId,
                                                            event.eventName,
                                                        );
                                                    }}
                                                >
                                                    Xóa
                                                </p>
                                            </div>
                                        )}
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                Ngày{' '}
                                {`${date.getDate()} / ${date.getMonth() + 1}`} :
                                Chưa có sự kiện....
                            </div>
                        )}
                    </div>
                </Popper>
            )}
            {selectedEvent && checkSwich && (
                <FormShowEvent
                    currId={curUser}
                    event={selectedEvent}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default CalendarComponent;
