import classNames from 'classnames/bind';
import style from './eventForm.module.scss';
import Button from '../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import InputDate from '../../Admin/inputDate';
import { useEffect, useState } from 'react';
import {
    createEvent,
    getEventsOfUSer,
    updateEvent,
} from '../../../services/Lecturer/privateEventService';
import { useLocation } from 'react-router-dom';
const cx = classNames.bind(style);

function PrivateEvents() {
    const idUserData = JSON.parse(localStorage.getItem('user')).tokenID;
    const idUser = atob(idUserData);
    const [formData, setFormData] = useState({
        eventId: '',
        eventName: '',
        eventDescription: '',
        date: '',
        time: '',
        idLecturer: `${idUser}`,
    });
    const location = useLocation();

    const { update, date, event } = location.state;

    console.log(formData);

    useEffect(() => {
        if (!update) {
            (async function createIdEvent() {
                const events = await getEventsOfUSer(idUser);
                console.log(events.data);
                const arrID = events.data.map((item) => {
                    return item.eventId;
                });
                console.log();
                let randomId;
                do {
                    randomId = Math.floor(Math.random() * 10000);
                    if (!arrID.includes(randomId)) {
                        setFormData((pre) => ({
                            ...pre,
                            eventId: `EVP${randomId}`,
                        }));
                        break;
                    }
                } while (arrID.includes(randomId));
            })();

            // attach date

            const dateString = `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()}`;

            setFormData((pre) => ({ ...pre, date: dateString }));
        } else {
            setFormData(event);
        }
    }, []);

    const handleChange = (e) => {
        const { type, value, name } = e.target;
        if (type && name) {
            const parentNode = e.target.parentNode;
            const spanNode = parentNode.querySelector('span');
            // message error
            !value
                ? (spanNode.style.display = 'block')
                : (spanNode.style.display = 'none');

            setFormData((pre) => ({ ...pre, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let checked = true;
        const spanNode = document.querySelectorAll(`.${cx('error')}`);
        spanNode.forEach((item) => {
            if (item.parentElement.querySelector('input').value === '') {
                item.style.display = 'block';
                checked = false;
            }
        });

        if (checked) {
            try {
                if (!update) {
                    await createEvent(formData);
                } else {
                    await updateEvent(formData.eventId, formData);
                }
                alert('Thanh Cong');
                window.history.back();
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className={cx('container')}>
            <Button
                leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                onClick={() => {
                    window.history.back();
                }}
            >
                Quay lại
            </Button>
            <form className={cx('form')} onSubmit={(e) => handleSubmit(e)}>
                <h2>Thêm mới sự kiện riêng tư</h2>
                <label className={cx('label')}>
                    Tên sự kiện:
                    <input
                        className={cx('input')}
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={(e) => handleChange(e)}
                    />
                    <span className={cx('error')} style={{ display: 'none' }}>
                        *Nhập trường này
                    </span>
                </label>{' '}
                <label className={cx('label')}>
                    Mô tả:
                    <input
                        className={cx('input')}
                        type="text"
                        name="eventDescription"
                        value={formData.eventDescription}
                        onChange={(e) => handleChange(e)}
                    />
                    <span className={cx('error')} style={{ display: 'none' }}>
                        *Nhập trường này
                    </span>
                </label>{' '}
                <label className={cx('label')}>
                    Thởi gian bắt đầu:
                    <input
                        className={cx('input')}
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={(e) => handleChange(e)}
                    />
                    <span className={cx('error')} style={{ display: 'none' }}>
                        *Nhập trường này
                    </span>
                </label>{' '}
                <Button type="submit" primary>
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default PrivateEvents;
