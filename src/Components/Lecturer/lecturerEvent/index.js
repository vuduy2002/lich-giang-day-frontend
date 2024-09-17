// LecturerEvent.jsx
import React, { useEffect, useState } from 'react';
import CalendarComponent from '../Calender';
import { getEvents } from '../../../services/Admin/eventService';
import { getEventsOfUSer } from '../../../services/Lecturer/privateEventService';

function LecturerEvent() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [privateEvents, setPrivateEvents] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = atob(user.tokenID);

    // Get all events
    useEffect(() => {
        (async function () {
            const response = await getEvents();
            setEvents(response.data);
        })();

        (async function () {
            const events = await getEventsOfUSer(userId);
            setPrivateEvents(events.data);
        })();
    }, []);

    // Filter user's events
    useEffect(() => {
        const eventOfUser = events.filter(
            (event) =>
                event.host.some((host) => host.lecturerId === userId) ||
                event.participants.some(
                    (participant) => participant.lecturerId === userId,
                ),
        );
        setFilteredEvents(eventOfUser);
    }, [events, userId]);

    // private events

    return (
        <CalendarComponent
            curUser={userId}
            events={filteredEvents}
            privateEvents={privateEvents}
        />
    );
}

export default LecturerEvent;
