import { classesList } from '~/types/classLists.type'
import { Student, studentList } from '~/types/student.type'
interface Props {
  classesList: classesList[]
  studentList: studentList
}
export default function ClassCheckIn({ classesList, studentList }: Props) {
  const headerTableClassCheckIn = ["#","Họ và tên", "Ngày sinh", "Ghi chú"];
  return (
    <>
      <div className='page-content-title'>
        Điểm danh đi học
        <small>(Chỉ điểm danh trong khoảng từ khi buổi học bắt đầu đến khi buổi học kết thúc được 5 tiếng)</small>
      </div>
      <div className='page-content-note'>
        <span className='item'>Đi học: 1</span>
        <span className='item'>
          Đi muộn: <span style={{ color: 'yellow' }}>M</span>
        </span>
        <span className='item'>Nghỉ học: 0</span>
        <span className='item'>Nghỉ phép: P</span>
      </div>
      <div className='page-content-wrap' style={{overflowX:"auto"}}>
        <table className='table-attendence' style={{width:"100%", borderCollapse:"collapse"}}>
          <thead>
            <tr>
              {headerTableClassCheckIn.map((header) =>(
            <th style={{ border: "solid 1px #ddd",fontWeight:"normal"}}>{header}</th>
              ))}
              {classesList.map((courseClass: classesList) => (
                <th style={{ border: "solid 1px #ddd",fontWeight:"normal"}} key={courseClass.id}>{courseClass.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentList.studentList.map((student: Student, index) => (
              <tr key={student.id}>
                <td style={{ border: "solid 1px #ddd",fontWeight:"normal", textAlign:"center"}}>{index+1}</td>
                <td style={{ border: "solid 1px #ddd",fontWeight:"normal", width:"30%", textAlign:"left", paddingLeft:"10px"}}>{student.name}</td>
                <td style={{ border: "solid 1px #ddd",fontWeight:"normal", textAlign:"center"}}>{student.dob}</td>
                <td style={{ border: "solid 1px #ddd",fontWeight:"normal"}}>{student.note === null ? '' : student.note}</td>
                {student.checkin.map((courseClass) => (
                  <span id={courseClass.class}>{courseClass.status}</span>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
