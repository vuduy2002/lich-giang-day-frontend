import classNames from 'classnames/bind';

import Style from './header.scss';
import AccountHeader from '../../../Components/account-header';
import logo from '../../../image/logo_school.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useLayoutEffect, useState } from 'react';
import Menu from '../../../Components/Menu';

import { SIDE_MENU_ITEMS_ADMIN } from '../../../listMenuOfPages/admin';
import { SIDE_MENU_ITEMS_LECTURER } from '../../../listMenuOfPages/lecturer';
import { Link } from 'react-router-dom';
import Menu2Levels from '../../../Components/menu2Levels';

const cx = classNames.bind(Style);

function Header() {
    const [show, setShow] = useState(false);

    const localStorageData = localStorage.getItem('user');
    const rolesUser = JSON.parse(localStorageData).role;

    let MenuItems;
    if (rolesUser === 'admin') {
        MenuItems = SIDE_MENU_ITEMS_ADMIN;
    } else {
        MenuItems = SIDE_MENU_ITEMS_LECTURER;
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth < 740) {
            setShow(true);
        } else {
            setShow(false);
        }
    });
    useLayoutEffect(() => {
        if (window.innerWidth < 740) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, []);

    return (
        <div className={cx('wraper')}>
            {' '}
            <Menu2Levels listMenu={MenuItems} />
            {/* {show ? (
                <Menu2Levels listMenu={MenuItems} />
            ) : (
                <Link to={'/homeAdmin'}>
                    <div className={cx('logo-school')}>
                        <img src={logo} alt="logo-school" />
                    </div>
                </Link>
            )} */}
            <AccountHeader />
        </div>
    );
}

export default Header;
