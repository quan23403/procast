import { AutoComplete, Select, Table } from "antd"
import dayjs from "dayjs"
import { classesList } from "~/types/classLists.type"
import { Student, studentList } from "~/types/student.type"

interface Props {
  classesList: classesList[]
  studentList: studentList
}
export default function HWCheck({ classesList, studentList }: Props) {
  const columns = [
    { title: '#', dataIndex: 'id', key: 'id' },
    { title: 'Họ tên', dataIndex: 'name', key: 'name' },
    { title: 'Ngày sinh', dataIndex: 'dob', key: 'dob' },
    { title: 'Ghi chú', dataIndex: 'note', key: 'note' },
    ...classesList.map((session) => {
      const isToday = session.date === dayjs().format('YYYY-MM-DD')
      return {
        title: session.name,
        dataIndex: ['checkin'],
        key: session.id,
        render: (text, record: Student) => {
          console.log([record, text, session])
          const sessionCheck = text.find((ses)=>(ses.classId===session.id))?.status || null
          return isToday ?
            <Select
              showSearch
              options={[
                { value: '1' },
                { value: 'M' },
                { value: '0' },
                { value: 'P' },
              ]}
              defaultValue={sessionCheck}
              onChange={(value)=>{console.log([record, value])}}
              popupMatchSelectWidth={false}
              ></Select>
              : <span>{sessionCheck}</span>;
        },
      }
    })
  ]
  return (
    <>
      <Table dataSource={studentList.studentList} columns={columns}>
      </Table>
    </>
  )
}
