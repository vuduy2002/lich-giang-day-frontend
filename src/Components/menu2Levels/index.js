import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import { useEffect, useRef, useState } from 'react';
const cx = classNames.bind(style);
function Menu2Levels({ listMenu }) {
    const [showMenu, setshowMenu] = useState(false);
    const wrapperRef = useRef(null);
    //handle Click
    const handleClick = (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setshowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);
    return (
        <div className={cx('bttMenu')}>
            <div className={cx('Menu_icon')} onClick={() => setshowMenu(true)}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div ref={wrapperRef} className={cx('box', { _box: showMenu })}>
                {listMenu.map((item, index) => {
                    return (
                        <div key={index} className={cx()}>
                            <Link className={cx('Link')} to={item.to}>
                                {item.title}
                            </Link>
                            {item.subMenu ? (
                                <div className={cx('boxSub')}>
                                    {item.subMenu?.map((subMenu, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                className={cx('Link')}
                                                to={subMenu.to}
                                            >
                                                {subMenu.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Menu2Levels;
