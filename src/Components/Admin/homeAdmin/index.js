
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import logo from '../../../image/logo_school.png';

import {logout} from '../../../services/authService'
import Button from '../../Button';
import Menu from '../../Menu'
import routes from '../../../routes/confix/Routes';
import {HOME_SYSTEM_MENU_ITEMS_ADMIN} from '../../../listMenuOfPages/admin'
import style from './homeAdmin.module.scss'
const cx = classNames.bind(style);

function HomeAdmin() {

    const [lecturer, setLecturer] = useState({});

    useEffect(() => {
        const lectureCur = JSON.parse(localStorage.getItem('user'));
        setLecturer(lectureCur.dataUser);
    }, []);
   
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo_school')}>
                <img src={logo} alt="logo"></img>
            </div>
            <div className={cx('container')}>
                <h1 className={cx('title')}>
                    Hệ Thống Quản Lý Lịch Biểu Giáo Viên
                </h1>
                <div className={cx("profile-card")}>
                <div className={cx("profile-image")}>
                    <img src={lecturer.avatar} alt="avatar"></img>
                </div>
                <div className={cx("profile-info")}>
                    <h2>{lecturer.lecturerName}</h2>
                    <p>Chức vụ: {lecturer.position}</p>
                    <p>Điện thoại: {lecturer.lecturerPhone}</p>
                    <p>Email: {lecturer.email}</p>
                    <div>
                        <Button outline onClick={()=>logout()}  className={cx('btt-logout')}>
                            Đăng Xuất
                        </Button>
                    </div>
                </div>
               
            </div>
            
                <div className={cx('box-butt')}>
                    <Menu items={HOME_SYSTEM_MENU_ITEMS_ADMIN}>
                        <div style={{marginRight:'10px'}}>
                            <Button primary className={cx('btt')}>
                                Quản Lý Hệ Thống
                            </Button>
                        </div>
                    </Menu>
                        <Button primary to={routes.listEvents} className={cx('btt')}>
                            Quản Lý Sự Kiện
                        </Button>          
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;