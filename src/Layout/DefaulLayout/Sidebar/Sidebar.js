import classNames from 'classnames/bind';

import style from './sidebar.module.scss';
import Button from '../../../Components/Button';
import { MENU_ITEMS_ADMIN } from '../../../listMenuOfPages/sidebarMenu/AdminMenu';
import { MENU_ITEMS_LECTURER } from '../../../listMenuOfPages/sidebarMenu/LecturerMemu';

const cx = classNames.bind(style);
function Sidebar() {
    const localStorageData = localStorage.getItem('user');
    const rolesUser = JSON.parse(localStorageData).role;

    let Menu;
    if (rolesUser === 'admin') {
        Menu = MENU_ITEMS_ADMIN;
    } else {
        Menu = MENU_ITEMS_LECTURER;
    }

    const render = () => {
        return Menu.map((item, index) => {
            return (
                <Button
                    key={index}
                    className={cx('btt')}
                    rouded
                    size="L"
                    to={item.to}
                    leftIcon={item.icon}
                >
                    {item.title}
                </Button>
            );
        });
    };
    return <div className={cx('wrapper')}>{render()}</div>;
}

export default Sidebar;
