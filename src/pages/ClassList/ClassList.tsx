import './ClassList.css'
import { useState } from 'react'
import Dropdown from './Dropdown'
import CreateModal from '~/components/CreateModal'
import { useQuery } from '@tanstack/react-query'
import englishClassApi from '~/apis/englishClass.api'
import { nameLabelSeacrch, options, options1, options2, options3, options4 } from '~/constants/nameLabelSearch'

export default function ClassList() {
  const [selected, setSelected] = useState(nameLabelSeacrch[0])
  const [selected1, setSelected1] = useState(nameLabelSeacrch[1])
  const [selected2, setSelected2] = useState(nameLabelSeacrch[2])
  const [selected3, setSelected3] = useState(nameLabelSeacrch[3])
  const [selected4, setSelected4] = useState(nameLabelSeacrch[4])
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const { data } = useQuery(['class'], () => englishClassApi.getClass())
  return (
    <div>
      <div className='main-content'>
        <div className='page-control'>
          <div className='pull-left title'>Lớp học</div>
          <div className='title pull-right'>
            <button className='yellow-btn' onClick={() => openModal()}>
              Thêm mới
            </button>
            <button className='purple-btn'>Xuất Excel</button>
          </div>
        </div>
        <div className='page-search'>
          <div className='container-search-element'>
            <input type='text' placeholder='Từ khóa' className='search-element'></input>
          </div>
          <div className='container-search-element'>
            <label>Từ Ngày</label>
            <input type='date' className='search-element'></input>
          </div>
          <div className='container-search-element'>
            <label>Đến ngày</label>
            <input type='date' className='search-element'></input>
          </div>
          <div className='container-search-element'>
            <Dropdown selected={selected} setSelected={setSelected} options={options} />
          </div>
          <div className='container-search-element'>
            <Dropdown selected={selected1} setSelected={setSelected1} options={options1} />
          </div>
          <div className='container-search-element'>
            <Dropdown selected={selected2} setSelected={setSelected2} options={options2} />
          </div>
          <div className='container-search-element'>
            <Dropdown selected={selected3} setSelected={setSelected3} options={options3} />
          </div>
          <div className='container-search-element'>
            <Dropdown selected={selected4} setSelected={setSelected4} options={options4} />
          </div>
        </div>
        <div className='page-content'>
          <div className='table-content'>
            <table className='table-checkbox'>
              <thead>
                <tr>
                  <th>
                    <input type='checkbox'></input>
                  </th>
                  <th>#</th>
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
                  data.data.data?.englishClassList.map((classes) => (
                    <tr>
                      <td>
                        <input type='checkbox'></input>
                      </td>
                      <td>{classes.CourseId}</td>
                      <td>{classes.CourseName}</td>
                      <td>{classes.MainTeacher}</td>
                      <td>{classes.Room}</td>
                      <td>{classes.StartDate}</td>
                      <td>{classes.EndDate}</td>
                      <td>15:00-19:00</td>
                      <td>{classes.CourseStatus}</td>
                      <td>{classes.TotalSessions}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CreateModal isOpen={isModalOpen} onClose={closeModal}></CreateModal>
    </div>
  )
}
