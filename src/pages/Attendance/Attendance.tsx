import './Attendance.css'
import ClassCheckin from './ClassCheckin'
import HWCheck from './HWCheck'

export interface Student {
    id: number;
    name: string;
    dob: string;
    note?: string;
    checkin: {
        class: string;
        status: string;
    }[];
    hw: {
        class: string;
        status: string;
    }[]
};

export default function Attendance() {
    const classesList: {id: number, name:string}[] = [
        {
            id: 1,
            name: 'B1'
        },
        {
            id: 2,
            name: 'B2'
        },
        {
            id: 3,
            name: 'B3'
        }, {
            id: 4,
            name: 'B4'
        }, {
            id: 5,
            name: 'B5'
        }, {
            id: 6,
            name: 'B6'
        },
        {
            id: 7,
            name: 'B7'
        }, {
            id: 8,
            name: 'B8'
        }, {
            id: 9,
            name: 'B9'
        }, {
            id: 10,
            name: 'B10'
        }
    ]
    const studentList: Student[] = [];
    return (
        <div>
            <div className="main-content">
                <div className="page-control">
                    <div className="title name-class">
                        Chi tiết lớp học
                    </div>
                    <div className="title btt-group">
                        <a href="">
                            <i className="far" />
                            <button className="btt-blu">Danh Sách</button>
                        </a>
                    </div>
                </div>
                <div className="page-tab">
                    <ul className="nav">
                        <li>
                            <a href="">Thông tin chung</a>
                        </li>
                        <li>
                            <a href="">Danh sách học viên</a>
                        </li>
                        <li>
                            <a href="">Lộ trình học</a>
                        </li>
                        <li>
                            <a href="">Điểm danh</a>
                        </li>
                        <li>
                            <a href="">Bổ trợ</a>
                        </li>
                        <li>
                            <a href="">Lịch sử thay đổi</a>
                        </li>
                    </ul>
                    <div className="time-system">Time : 23/04/2003</div>
                </div>
                <div className="tag-content">
                    <div className="page-content">
                        <ClassCheckin classesList={classesList} studentList={studentList}/>
                        <div className="seperate">
                            <hr />
                        </div>
                        <HWCheck classesList={classesList} studentList={studentList}/>
                    </div>
                </div>
            </div>
        </div>

    )
}