import './ClassList.css'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import englishClassApi, { deleteCourse } from '~/apis/englishClass.api'
import CreateClassModal from '~/components/CreateClassModal'
import { englishClass } from '~/types/englishClass.type'
import { ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ModifyCourse from '~/components/MofidyCourse'
import { Button, Modal } from 'antd'
import { toast } from 'react-toastify'
export default function ClassList() {
  // const [selected, setSelected] = useState(nameLabelSeacrch[0])
  // const [selected2, setSelected2] = useState(nameLabelSeacrch[2])
  // const [selected3, setSelected3] = useState(nameLabelSeacrch[3])
  // const [selected4, setSelected4] = useState(nameLabelSeacrch[4])
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [isModifyOpen, setModifyOpen] = useState<boolean>(false)
  const [courseId, setCourseId] = useState<number>(0)
  const [teacherName, setTeacherName] = useState<string>('')
  const [roomNumber, setRoomNumber] = useState<number>(0)
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number | string>(0)
  const queryClient = useQueryClient()
  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const openModify = (courseId: number, teacherName: string, roomNumber: number) => {
    setCourseId(courseId)
    setTeacherName(teacherName)
    setRoomNumber(roomNumber)
    setModifyOpen(true)
  }
  const closeModify = () => {
    setModifyOpen(false)
  }
  const showConfirmModal = (id: string | number) => {
    setOpenConfirm(true)
    setDeleteId(id)
  }
  const handleConfirmOk = () => {
    setOpenConfirm(false)
    deleteCourseMutation.mutate(deleteId)
  }
  const handleConfirmCancel = () => {
    setOpenConfirm(false)
  }
  const deleteCourseMutation = useMutation({
    mutationFn: (id: number | string) => deleteCourse(id),
    onSuccess: (_, id) => {
      toast.success(`Xóa thành công lớp học id: ${id}`)
      queryClient.invalidateQueries({ queryKey: ['course'] })
    },
    onError: () => {
      toast.error('Không thể xóa lớp học')
    }
  })
  const { data } = useQuery(['course'], () => englishClassApi.getClass())
  console.log(data?.data.data)
  return (
    <div>
      <div className='main-content'>
        <div className='page-control'>
          <div className='pull-left title'>Khóa học</div>
          <div className='title pull-right'>
            <button className='yellow-btn' onClick={() => openModal()}>
              Thêm mới
            </button>
            <button className='purple-btn'>Xuất Excel</button>
          </div>
        </div>
        
        <div className='page-content'>
          <div className='table-content'>
            <table className='table-checkbox'>
              <thead>
                <tr>
                  <th>Chỉnh sửa</th>
                  <th>Xóa</th>
                  <th>Mã lớp </th>
                  <th>Khóa học</th>
                  <th>Giáo viên</th>
                  <th>Phòng học</th>
                  <th>Ngày khai giảng</th>
                  <th>Ngày kết thúc</th>
                  <th>Ca dạy</th>
                  <th>Tình trạng lớp học</th>
                  <th>Số buổi học</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.data.data.map((classes: englishClass, index) => (
                    <tr key={index}>
                      <td>
                        <button onClick={() => openModify(classes.course_id, classes.main_teacher, classes.room)}>
                          <FormOutlined />
                        </button>
                      </td>
                      <td>
                        <Button type='primary' danger onClick={() => showConfirmModal(classes.course_id)}>
                          Xóa
                        </Button>
                      </td>
                      <td>
                        <Link
                          to={`/detail/id/${classes.course_id.toString()}/index`}
                          className='text-sky-400 underline'
                        >
                          {classes.course_id}
                        </Link>
                      </td>
                      <td>
                        {' '}
                        <Link
                          to={`/detail/id/${classes.course_id.toString()}/index`}
                          className='text-sky-400 underline'
                        >
                          {classes.course_name}
                        </Link>
                      </td>
                      <td>{classes.main_teacher}</td>
                      <td>{classes.room}</td>
                      <td>{classes.start_date}</td>
                      <td>{classes.end_date}</td>
                      <td>15:00-19:00</td>
                      <td>{classes.course_status}</td>
                      <td>{classes.total_sessions}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CreateClassModal isOpen={isModalOpen} onClose={closeModal}></CreateClassModal>
      <ModifyCourse
        isOpen={isModifyOpen}
        onClose={closeModify}
        course_id={courseId}
        teacher={teacherName}
        room={roomNumber}
      ></ModifyCourse>
      <Modal
        open={openConfirm}
        title='Xác nhận xóa khỏa học'
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <h2>
          {' '}
          <ExclamationCircleOutlined />
          {` Bạn có muốn xóa khóa học: ${deleteId}`}
        </h2>
      </Modal>
    </div>
  )
}
