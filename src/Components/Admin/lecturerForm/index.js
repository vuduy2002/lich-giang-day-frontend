import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './lecturer.module.scss';
import {
    createLecturer,
    updateLecturer,
} from '../../../services/lectureService';
import Button from '../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const LecturerForm = ({
    children = null,
    listLecturers = null,
    onBack = false,
    setChildren = false,
}) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        lecturerId: '',
        isAdmin: false,
        position: '',
        avatar: '',
        lecturerName: '',
        lecturerPhone: '',
        password: '',
        email: '',
    });
    const inputRef = useRef();

    let title;
    if (children) {
        title = 'Cập nhật thông tin giảng viên';
    } else {
        title = 'Thêm mới giảng viên';
    }

    useEffect(() => {
        if (children) {
            setFormData(children);
        }
    }, [children]);

    //create id
    const generateId = () => {
        const prefix = formData.isAdmin ? 'TC' : 'AD';
        let newId = '';
        let arrId = listLecturers.map((lecturer) => lecturer.lecturerId);
        do {
            const randomNum = Math.floor(100 + Math.random() * 900); // Random 3-digit number
            newId = `${prefix}${randomNum}`;
        } while (arrId.includes(newId));

        // Check for ID uniqueness

        return newId;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (name === 'isAdmin') {
            const newId = generateId();
            if (newId) {
                setFormData((prev) => ({
                    ...prev,
                    lecturerId: newId,
                }));
            }
        }
    };

    const validateForm = () => {
        for (let key in formData) {
            if (
                !formData[key] &&
                key !== 'lecturerId' &&
                key !== 'avatar' &&
                key !== 'isAdmin'
            ) {
                setError('Vui lòng nhập đầy đủ thông tin.');
                return false;
            }
        }
        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (error || !validateForm()) {
            return;
        }

        if (children) {
            const handleUpdate = async () => {
                await updateLecturer(children.lecturerId, formData);
                resetForm();
                alert('Cập nhật thành công!');
                setChildren(null);
                onBack(false);
            };
            handleUpdate();
        } else {
            const handleCreate = async () => {
                await createLecturer(formData);
                resetForm();
                alert('Tạo thành công!');
            };
            handleCreate();
        }
    };

    const resetForm = () => {
        setFormData({
            lecturerId: '',
            isAdmin: false,
            position: '',
            avatar: '',
            lecturerName: '',
            lecturerPhone: '',
            password: '',
            email: '',
        });
        inputRef.current.focus();
    };
    // console.log('chidren', children, 'formdata', formData);
    return (
        <div className={cx('container')}>
            <Button
                leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                onClick={() => {
                    resetForm();
                    setChildren(null);
                    onBack(false);
                }}
            >
                Quay lại
            </Button>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className={cx('form')}>
                <label className={cx('lable')}>
                    <span className={cx('title')}>ID:</span>
                    <input
                        type="text"
                        name="lecturerId"
                        value={formData.lecturerId}
                        placeholder="ID sẽ tự động tạo khi bạn Click ô bên dưới!"
                        readOnly
                        className={cx('input')}
                    />
                </label>
                <label className={cx('lable')}>
                    <span className={cx('title')}>Is Admin:</span>
                    <div className={cx('wrapCheckbox')}>
                        <input
                            type="checkbox"
                            name="isAdmin"
                            checked={formData.isAdmin}
                            onChange={handleChange}
                            className={cx('checkbox')}
                        />
                        <span>
                            Lưu ý: Click ít nhất 1 lần để tạo ID theo quyền!
                        </span>
                    </div>
                </label>
                <label className={cx('lable')}>
                    <span className={cx('title')}>Chức vụ:</span>
                    <input
                        type="text"
                        name="position"
                        ref={inputRef}
                        value={formData.position}
                        onChange={handleChange}
                        className={cx('input')}
                    />
                </label>
                <label className={cx('lable')}>
                    <span className={cx('title')}>Avatar URL:</span>
                    <input
                        type="text"
                        name="avatar"
                        value={formData.avatar}
                        placeholder="Có thể bỏ qua"
                        onChange={handleChange}
                        className={cx('input')}
                    />
                </label>
                <label className={cx('lable')}>
                    <span className={cx('title')}>Tên Giảng viên:</span>
                    <input
                        type="text"
                        name="lecturerName"
                        value={formData.lecturerName}
                        onChange={handleChange}
                        className={cx('input')}
                    />
                </label>
                <label className={cx('lable')}>
                    <span className={cx('title')}>Số điện thoại:</span>
                    <input
                        type="text"
                        name="lecturerPhone"
                        value={formData.lecturerPhone}
                        onChange={handleChange}
                        className={cx('input')}
                    />
                </label>
                <label className={cx('lable')}>
                    <span className={cx('title')}>Mật khẩu:</span>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={cx('input')}
                    />
                </label>
                <label className={cx('lable')}>
                    <span className={cx('title')}>Email:</span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cx('input')}
                    />
                </label>
                {error && <p className={cx('error')}>{error}</p>}
                <Button primary>{title}</Button>
            </form>
        </div>
    );
};

export default LecturerForm;
