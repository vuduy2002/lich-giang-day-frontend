import axios from 'axios';
import { authHeader } from '../../utils/authUtils';

const API_URL = `${process.env.REACT_APP_API}/privateEvents`;

export const getEventsOfUSer = async (idUser, date, idEvent) => {
    return await axios.get(
        `${API_URL}?idLecturer=${idUser}${date ? `&date=${date}` : ``}${
            idEvent ? `&eventId=${idEvent}` : ``
        } `,
        {
            headers: authHeader(),
        },
    );
};

// theo kiểu lấy params
// export const getEventById = async (id) => {
//     return await axios.get(`${API_URL}/${id}`, { headers: authHeader() });
// };

// kiểu lấy string querry

// export const getEventsByDate = async (date) => {
//     return await axios.get(`${API_URL}?date=${date}`, {
//         headers: authHeader(),
//     });
// };

export const getEventsByTitle = async (title) => {
    return await axios.get(`${API_URL}?title=${title}`, {
        headers: authHeader(),
    });
};

export const createEvent = async (event) => {
    return await axios.post(API_URL, event, { headers: authHeader() });
};

// dùng params
export const updateEvent = async (id, event) => {
    return await axios.put(`${API_URL}/${id}`, event, {
        headers: authHeader(),
    });
};

export const deleteEvent = async (id) => {
    return await axios.delete(`${API_URL}?eventId=${id}`, {
        headers: authHeader(),
    });
};
