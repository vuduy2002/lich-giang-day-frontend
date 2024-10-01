import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './listLectures.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faPen,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
    getLecturers,
    deleteLecturer,
} from '../../../../services/Admin/lectureService';
import Button from '../../../Button/Button';
import LecturerForm from '../lecturerForm';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import {
    setError,
    setInputValue,
    setLecturers,
    setLoading,
    setSearchValue,
    setShowForm,
    setUpdateLecturer,
} from '../../../../redux/slices/lecturerSlice';

const cx = classNames.bind(styles);
const ListLecturersAdmin = () => {
    const dispatch = useDispatch();

    const { lecturers, showForm, updateLecturer, searchValue, inputValue } =
        useSelector((state) => state.lecturers);

    useEffect(() => {
        const fetchLecturers = async () => {
            const response = await getLecturers();
            dispatch(setLecturers(response.data));
        };
        fetchLecturers();
    }, [showForm]);

    useEffect(() => {
        const lecturerList = lecturers.filter(
            (lecturer) =>
                lecturer.lecturerName
                    ?.toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                lecturer.lecturerId
                    ?.toLowerCase()
                    .includes(inputValue.toLowerCase()),
        );
        dispatch(setSearchValue(lecturerList));
    }, [inputValue, lecturers]);

    const handleEdit = (lecturer) => {
        dispatch(setShowForm(true));
        dispatch(setUpdateLecturer(lecturer));
    };

    const handleDelete = async (lecturer) => {
        if (
            window.confirm(
                `Bạn muốn xóa Giảng viên có id : ${lecturer.lecturerId} : ${lecturer.lecturerName}`,
            ) === true
        ) {
            await deleteLecturer(lecturer.lecturerId);
            const response = await getLecturers();
            dispatch(setLecturers(response.data));
        }
    };

    return showForm ? (
        <LecturerForm
            listLecturers={lecturers}
            onBack={setShowForm}
            setChildren={setUpdateLecturer}
        >
            {updateLecturer}
        </LecturerForm>
    ) : (
        <div className={cx('container')}>
            <Button
                outline
                size="S"
                leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                onClick={() => {
                    window.history.back();
                }}
            >
                Quay lại
            </Button>
            <h2 className={cx('title')}>Danh sách Giảng viên</h2>
            <div className={cx('header')}>
                <Button
                    primary
                    rightIcon={<FontAwesomeIcon icon={faPlusSquare} />}
                    size="S"
                    onClick={() => dispatch(setShowForm(true))}
                >
                    Thêm Giảng viên
                </Button>
                <input
                    type="text"
                    value={inputValue}
                    placeholder="Search..."
                    className={cx('inputSearch')}
                    onChange={(e) => dispatch(setInputValue(e.target.value))}
                />
            </div>
            <div className={cx('boxTable')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Is Admin</th>
                            <th>Chức vụ</th>
                            <th>Ảnh avatar</th>
                            <th>Tên Giảng viên</th>
                            <th>Số điện thoại</th>
                            <th>Mật khẩu</th>
                            <th>Email</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchValue.length > 0 ? (
                            searchValue.map((lecturer) => (
                                <tr key={lecturer.lecturerId}>
                                    <td>{lecturer.lecturerId}</td>
                                    <td>{lecturer.isAdmin ? 'Yes' : 'No'}</td>
                                    <td>{lecturer.position}</td>
                                    <td>
                                        <img
                                            className={cx('avatar')}
                                            src={lecturer.avatar}
                                            alt="Avatar"
                                            width="50"
                                            height="50"
                                        />
                                    </td>
                                    <td>{lecturer.lecturerName}</td>
                                    <td>{lecturer.lecturerPhone}</td>
                                    <td>{lecturer.password}</td>
                                    <td>{lecturer.email}</td>
                                    <td className={cx('actions')}>
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            onClick={() => handleEdit(lecturer)}
                                            className={cx('icon', 'edit-icon')}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={() =>
                                                handleDelete(lecturer)
                                            }
                                            className={cx(
                                                'icon',
                                                'delete-icon',
                                            )}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={11}
                                    style={{ textAlign: 'center' }}
                                >
                                    Không có kết quả phù hợp...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListLecturersAdmin;
