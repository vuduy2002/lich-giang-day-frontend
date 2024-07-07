import React, { useState, useEffect } from 'react';
import {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} from '../../../services/eventService';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        teacher_id: '',
    });

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await getEvents();
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        await createEvent(newEvent);
        setNewEvent({
            title: '',
            description: '',
            date: '',
            time: '',
            teacher_id: '',
        });
        const response = await getEvents();
        setEvents(response.data);
    };

    const handleUpdate = async (id) => {
        const updatedEvent = prompt(
            'Enter new event details (title,description,date,time,teacher_id):',
            'title,description,date,time,teacher_id',
        );
        const [title, description, date, time, teacher_id] =
            updatedEvent.split(',');
        await updateEvent(id, { title, description, date, time, teacher_id });
        const response = await getEvents();
        setEvents(response.data);
    };

    const handleDelete = async (id) => {
        await deleteEvent(id);
        const response = await getEvents();
        setEvents(response.data);
    };

    return (
        <div>
            <h1>Admin Events</h1>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={newEvent.title}
                onChange={handleChange}
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={newEvent.description}
                onChange={handleChange}
            />
            <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleChange}
            />
            <input
                type="time"
                name="time"
                value={newEvent.time}
                onChange={handleChange}
            />
            <input
                type="text"
                name="teacher_id"
                placeholder="Teacher ID"
                value={newEvent.teacher_id}
                onChange={handleChange}
            />
            <button onClick={handleCreate}>Create Event</button>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        {event.title} - {event.description} - {event.date}{' '}
                        {event.time} - {event.teacher_id}
                        <button onClick={() => handleUpdate(event.id)}>
                            Update
                        </button>
                        <button onClick={() => handleDelete(event.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminEvents;
