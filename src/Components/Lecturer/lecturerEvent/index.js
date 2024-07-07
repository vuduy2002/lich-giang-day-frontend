// LecturerEvent.jsx
import React, { useEffect, useState } from 'react';
import CalendarComponent from '../../Calender';
import { getEvents } from '../../../services/AdminService/eventService';

function LecturerEvent() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = atob(user.tokenID);

    // Get all events
    useEffect(() => {
        const fetchEvents = async () => {
            const response = await getEvents();
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    // Filter user's events
    useEffect(() => {
        const eventOfUser = events.filter(
            (event) =>
                event.hostName.some((host) => host.id === userId) ||
                event.participants.some(
                    (participant) => participant.id === userId,
                ),
        );
        setFilteredEvents(eventOfUser);
    }, [events, userId]);

    return <CalendarComponent events={filteredEvents} />;
}

export default LecturerEvent;
