import { useState } from 'react'
import './DetailNavbar.css'

export default function DetailNavbar() {
    const [activeLink, setActiveLink] = useState(null);
    const handleClick = (id, event) => {
        event.preventDefault();
        setActiveLink(id);
    }

    return (
        <>

            <div className="page-tab">
                <ul className="nav">
                    <li>
                        <a id='detail'
                            className={activeLink === 'detail' ? 'active' : ''}
                            onClick={(e) => handleClick('detail', e) }
                            href="">Thông tin chung</a>
                    </li>
                    <li>
                        <a id='student-list'
                        className={activeLink === 'student-list' ? 'active' : ''}
                        onClick={(e) => handleClick('student-list', e) }
                         href="">Danh sách học viên</a>
                    </li>
                    <li>
                        <a id='plan'
                        className={activeLink === 'plan' ? 'active' : ''}
                        onClick={(e) => handleClick('plan', e) }
                         href="">Lộ trình học</a>
                    </li>
                    <li>
                        <a id='attendance'
                        className={activeLink === 'attendance' ? 'active' : ''}
                        onClick={(e) => handleClick('attendance', e) }
                         href="">Điểm danh</a>
                    </li>
                    <li>
                        <a id='sup-class'
                        className={activeLink === 'sup-class' ? 'active' : ''}
                        onClick={(e) => handleClick('sup-class', e) }
                         href="">Bổ trợ</a>
                    </li>
                    <li>
                        <a id='history'
                        className={activeLink === 'history' ? 'active' : ''}
                        onClick={(e) => handleClick('history', e) }
                         href="">Lịch sử thay đổi</a>
                    </li>
                </ul>
                <div className="time-system">Time : 23/04/2003</div>
            </div>
        </>
    )
}