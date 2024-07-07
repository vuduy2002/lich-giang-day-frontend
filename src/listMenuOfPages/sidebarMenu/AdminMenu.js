import { faFlag } from '@fortawesome/free-regular-svg-icons';
import {
    faCalendarDay,
    faCalendarPlus,
    faRectangleList,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MENU_ITEMS_ADMIN = [
    {
        icon: <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>,
        title: 'Danh sách sự kiện',
        to: '/listEvents',
    },
    {
        icon: <FontAwesomeIcon icon={faCalendarPlus}></FontAwesomeIcon>,
        title: 'Tạo sự kiện',
        to: '/createEvents',
    },
    {
        icon: <FontAwesomeIcon icon={faRectangleList}></FontAwesomeIcon>,
        title: 'Tạo lịch học',
        to: '/createSchedules',
    },
    {
        icon: <FontAwesomeIcon icon={faRectangleList}></FontAwesomeIcon>,
        title: 'Quản lý giảng viên',
        to: '/managermentLecturers',
    },
    {
        icon: <FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>,
        title: 'Báo cáo',
        to: '/report',
    },
];
