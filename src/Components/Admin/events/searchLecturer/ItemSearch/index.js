import classNames from 'classnames/bind';
import style from './ItemSearch.module.scss';
import InputCheckBox from '../../../../checkBox';

const cx = classNames.bind(style);
function ItemSearch({ data, formData, handleChange, name, disable = false }) {
    //checked input
    const checked = formData.some((item) => {
        return item.lecturerId === data.lecturerId;
    });

    return (
        <div className={cx('wrapper', { disable: disable })}>
            <InputCheckBox
                name={name}
                value={data.lecturerId}
                checked={checked}
                handleChange={handleChange}
                disable={disable}
            />

            <img
                className={cx('avatar', { disable: disable })}
                src={data.avatar}
                alt="avatar"
            ></img>

            <div className={cx('content')}>
                <div className={cx('title')}>
                    <span className={cx('name')}>{data.lecturerName}</span>
                </div>
            </div>
        </div>
    );
}

export default ItemSearch;
