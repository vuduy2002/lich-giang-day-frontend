import classNames from 'classnames/bind';
import style from './checkBox.module.scss';

const cx = classNames.bind(style);

function InputCheckBox({
    disable = false,
    name,
    value = ' ',
    checked,
    handleChange,
}) {
    return (
        <label>
            <input
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                onChange={handleChange}
                disabled={disable}
            />

            <span
                className={cx('custom-checkbox', { disable: disable })}
            ></span>
        </label>
    );
}

export default InputCheckBox;
