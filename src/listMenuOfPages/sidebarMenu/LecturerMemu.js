
import {
    faCalendarDay,
    faCalendarPlus,
    faRectangleList,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MENU_ITEMS_LECTURER = [
    {
        icon: <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>,
        title: 'Lịch của bạn',
        to: '/lecturerCalender',
    },
    {
        icon: <FontAwesomeIcon icon={faCalendarPlus}></FontAwesomeIcon>,
        title: 'Tạo sự kiện',
        //to: '/createEvents',
    },
    {
        icon: <FontAwesomeIcon icon={faRectangleList}></FontAwesomeIcon>,
        title: 'Danh sách sự kiện',
        //to: '/createSchedules',
    },
    // {
    //     icon: <FontAwesomeIcon icon={faRectangleList}></FontAwesomeIcon>,
    //     title: 'bien',
    //     to: '/managermentLecturers',
    // },
    // {
    //     icon: <FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>,
    //     title: 'Báo quá',
    //     to: '/report',
    // },
];
