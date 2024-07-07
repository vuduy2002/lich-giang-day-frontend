import React, { useState } from 'react';

import { login } from '../../services/authService';

import classNames from 'classnames/bind';

import style from './Login.module.scss';
import Button from '../../Components/Button';

const cx = classNames.bind(style);

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(userId, password);
            if (user.role === 'admin') {
                window.location.href = '/listEvents';
            } else if (user.role === 'lecturer') {
                window.location.href = '/lecturerCalender';
            }
        } catch (error) {
            console.error('Login failed', error);
            setErrorMessage('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-container')}>
                <h1 className={cx('login-title')}>Đăng nhập</h1>
                <form onSubmit={handleSubmit}>
                    <div className={cx('input-group')}>
                        <label
                            className={cx('input-group-lable')}
                            htmlFor="username"
                        >
                            Tên đăng nhập
                        </label>
                        <input
                            className={cx('input-group-input')}
                            type="text"
                            id="username"
                            name="username"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    <div className={cx('input-group')}>
                        <label
                            className={cx('input-group-lable')}
                            htmlFor="password"
                        >
                            Mật khẩu
                        </label>
                        <input
                            className={cx('input-group-input')}
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button primary> Đăng nhập</Button>
                </form>
                {errorMessage && (
                    <div className={cx('error-message')}>{errorMessage}</div>
                )}
            </div>
        </div>
    );
};

export default Login;
