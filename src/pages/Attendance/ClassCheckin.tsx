import { Student } from "./Attendance";

export default function ClassCheckin(props) {
    const classesList = props.classesList;
    const studentList: Student[] = props.studentList;


    return (
        <>
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
                            {classesList.map(courseClass =>(
                                <th key={courseClass.id}>{courseClass.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                            {studentList.map(student =>(
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.dob}</td>
                                    <td>{(student.note === null) ? "" : student.note}</td>
                                    {student.checkin.map(courseClass => (
                                        <span id={courseClass.class}>
                                            {courseClass.status}                
                                        </span>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}