import './Attendance.css'
export default function Attendance() {
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
                        <div className="page-content-title">
                            Điểm danh đi học
                            <small>(Chỉ điểm danh trong khoảng từ khi buổi học bắt đầu đến khi
                                buổi học kết thúc được 5 tiếng)</small>
                        </div>
                        <div className="page-content-note">
                            <span className="item">Đi học: 1</span>
                            <span className="item">Đi muộn: <span style={{ color: 'yellow' }}>M</span></span>
                            <span className="item">Nghỉ học: 0</span>
                            <span className="item">Nghỉ phép: P</span>
                        </div>
                        <div className="page-content-wrap">
                            <table className="table-attendence">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Họ Tên</th>
                                        <th>Ngày sinh</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="seperate">
                            <hr />
                        </div>
                        <div className="page-content-title">
                            Điểm danh bài tập
                        </div>
                        <div className="page-content-note">
                            <span className="item">Có làm bài tập: 1</span>
                            <span className="item">Không làm bài tập: 0</span>
                            <span className="item">Không giao bài tập: N</span>
                        </div>
                        <div className="page-content-wrap">
                            <table className="table-attendence">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Họ Tên</th>
                                        <th>Ngày sinh</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}