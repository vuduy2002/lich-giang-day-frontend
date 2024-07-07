import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import style from './profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

function ProfileLecturer() {
    const [lecture, setLecture] = useState();

    useEffect(() => {
        const lectureCur = JSON.parse(localStorage.getItem('user'));
        setLecture(lectureCur.dataUser);
    }, []);

    return (
        <div>
            {lecture ? (
                <div className={cx('container')}>
                    <div
                        className={cx('back-btt')}
                        onClick={() => window.history.back()}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className={cx('profile')}>
                        <img
                            src={lecture.avatar}
                            alt="Teacher's Avatar"
                            className={cx('avatar')}
                        ></img>
                        <h1 className={cx('name')}>{lecture.lecturerName}</h1>
                        <p className={cx('designation')}>
                            Chức vụ: {lecture.position}
                        </p>
                        <p className={cx('description')}>
                            Mô tả về giáo viên, kinh nghiệm, sở thích, v.v.
                        </p>
                        <ul className={cx('contact-info')}>
                            <li>Email: {lecture.email}</li>
                            <li>Điện thoại: {lecture.lecturerPhone}</li>
                            <li>Địa chỉ: Số nhà, Đường, Quận, Thành phố</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <h1> Not Found</h1>
            )}
        </div>
    );
}

export default ProfileLecturer;
