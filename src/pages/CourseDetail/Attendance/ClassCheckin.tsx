import { Select, Table } from 'antd'
import dayjs from 'dayjs'
import { classesList } from '~/types/classLists.type'
import { Student, studentList } from '~/types/student.type'
interface Props {
  classesList: classesList[]
  studentList: studentList
}
export default function ClassCheckIn({ classesList, studentList }: Props) {
  const updateCheckin = (studentId, status) => {
    console.log([studentId, status])
  }
  const columns = [
    { title: '#', dataIndex: 'id', key: 'id', fixed: 'left', width: 40 },
    { title: 'Họ tên', dataIndex: 'name', key: 'name', fixed: 'left', width: 200 },
    { title: 'Ngày sinh', dataIndex: 'dob', key: 'dob', fixed: 'left', width: 120 },
    { title: 'Ghi chú', dataIndex: 'note', key: 'note', fixed: 'left', width: 80 },
    ...classesList.map((session) => {
      const isToday = session.date === dayjs().format('YYYY-MM-DD')
      return {
        title: session.name,
        dataIndex: ['checkin'],
        key: session.id,
        width: 60,
        align: 'center',
        render: (text, record: Student) => {
          const sessionCheck = text.find((ses) => (ses.classId === session.id)) || null
          // const [status, setStatus] = useState<string|null>(sessionCheck.status || null)
          return isToday ?
            <Select
              showSearch
              options={[
                { value: '1' },
                { value: 'M' },
                { value: '0' },
                { value: 'P' },
              ]}
              defaultValue={sessionCheck?.status || null}
              onChange={(value) => {
                updateCheckin(record.id, value)
              }}
              popupMatchSelectWidth={false}
              style={{
                padding:'0'
              }}
              size={'small'}
              bordered={false}
              suffixIcon={<></>}
            ></Select>
            : <span>{sessionCheck?.status || null}</span>;
        },
      }
    })
  ]
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
      <Table 
        dataSource={studentList.studentList} 
        columns={columns}
        bordered={true} 
        scroll={{ x: 1500, y: 300 }}>
      </Table>
    </>
  )

}
