import HeaderOnly from '../Layout/HeaderOnly';
import routes from './confix/Routes';

import HomePage from '../Pages/Home';
import Login from '../Components/login';
import profilePage from '../Pages/profilePage';

// import AdminPage from '../Pages/adminPage';
import CreateEvents from '../Pages/adminPage/createEvents';

import CreateSchedule from '../Pages/adminPage/createSchedules';
import ListEvents from '../Pages/adminPage/listEvents';
import ManagementLecturers from '../Pages/adminPage/managementLecturers';
import Report from '../Pages/adminPage/report';
import LecturerCalender from '../Pages/lecturerPage/lecturerCalender';

const publicPages = [
    { path: routes.home, component: HomePage, layout: null },
    { path: routes.login, component: Login, layout: null },

    //admin pages
    // { path: routes.admin, roles: 'admin', component: AdminPage },
    { path: routes.createEvents, roles: 'admin', component: CreateEvents },
    { path: routes.createSchedules, roles: 'admin', component: CreateSchedule },
    { path: routes.listEvents, roles: 'admin', component: ListEvents },
    {
        path: routes.managermentLecturers,
        roles: 'admin',
        component: ManagementLecturers,
    },
    { path: routes.report, roles: 'admin', component: Report },

    //teacher pages

    {
        path: routes.lecturerCalender,
        roles: 'lecturer',
        component: LecturerCalender,
    },
    { path: routes.profile, component: profilePage, layout: null },

    // { path: routes.notification, component: Notification },
    // { path: routes.report, component: Report },

    // { path: '/following', component: Following, layout: null },
    // { path: '/contact', component: Contact, layout: HeaderOnly },
];

const privatePages = [];

export { publicPages, privatePages };
