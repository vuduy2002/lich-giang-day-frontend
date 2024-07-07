import classNames from 'classnames/bind';
import style from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { memo, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import Popper from '../../Popper';
import ItemSearch from './ItemSearch';

const cx = classNames.bind(style);

function Search({ arrData, formData, name, handleChange }) {
    const refInput = useRef();
    const [inputValue, setInputValue] = useState('');

    const [showlist, setShowlist] = useState(false);

    //delete icon
    let iconDelete = false;
    if (inputValue.trim().length > 0) {
        iconDelete = true;
    }
    const handleDelete = () => {
        setInputValue('');
        refInput.current.focus();
    };

    //Filter
    const resultData = arrData.filter((item) => {
        return item.lecturerName
            .toLowerCase()
            .includes(inputValue.toLowerCase());
    });

    return (
        <Tippy
            visible={showlist && arrData.length > 0}
            interactive
            placement="bottom"
            render={(attrs) => (
                <div className={cx('box-result')} tabIndex="-1" {...attrs}>
                    <Popper>
                        {resultData.map((data1) => {
                            return (
                                <ItemSearch
                                    data={data1}
                                    formData={formData}
                                    name={name}
                                    handleChange={handleChange}
                                    key={data1.lecturerId}
                                />
                            );
                        })}
                    </Popper>
                </div>
            )}
            onClickOutside={() => {
                setShowlist(false);
                setInputValue('');
            }}
        >
            <div className={cx('wrapper')}>
                <input
                    ref={refInput}
                    value={inputValue}
                    className={cx('search-input')}
                    placeholder="Search"
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    onFocus={() => setShowlist(true)}
                ></input>
                {iconDelete && (
                    <FontAwesomeIcon
                        className={cx('delete')}
                        icon={faXmark}
                        onClick={handleDelete}
                    />
                )}
            </div>
        </Tippy>
    );
}

export default memo(Search);
