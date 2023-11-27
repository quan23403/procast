import './CourseDetail.css'
import '../../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { CoureseDetailService } from './CourseDetail.service'
import { useParams } from 'react-router-dom'
import DetailNavbar from './DetailNavbar/DetailNavbar'

export interface Course {
  id: number
  courseType: string
  note?: string | null
}
export default function CourseDetail() {
  const { id } = useParams()
  const service = new CoureseDetailService()
  const detail = service.getDetail(id)
  const note: string | null = null

  return (
    <div className='course'>
      {/* <div className='course-label'>
        <h1>
          Chi tiết lớp học {detail.courseType}-{detail.id}
        </h1>
      </div>
      <DetailNavbar></DetailNavbar> */}

      <div className='content'>
        <div className='row'>
          <div className='col'>
            <div className='field'>THÔNG TIN LỚP HỌC:</div>
            <div className='detail'>
              {detail.courseType}-{detail.id}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='field'>Khóa học:</div>
            <div className='detail'>a{}</div>
          </div>
          <div className='col'>
            <div className='field'>
              Ngày khai giảng:
              <br />
              Kết thúc:
            </div>
            <div className='detail'>
              a{}
              <br />a{}
            </div>
          </div>
          <div className='col'>
            <div className='field'>Ca học:</div>
            <div className='detail'>a{}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='field'>Số học viên:</div>
            <div className='detail'>a{}</div>
          </div>
          <div className='col'>
            <div className='field'>Số học viên tối đa:</div>
            <div className='detail'>a{}</div>
          </div>
          <div className='col' />
        </div>
        <div className='row'>
          <div className='col'>
            <div className='field'>Địa điểm học:</div>
            <div className='detail'>a{}</div>
          </div>
          <div className='col'>
            <div className='field'>Phòng học:</div>
            <div className='detail'>a{}</div>
          </div>
          <div className='col'>
            <div className='field'>Giảng viên:</div>
            {/* dùng for và el<br/> */}
            <div className='detail'>{}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='field'>Số buổi học:</div>
            <div className='detail'>{}</div>
          </div>
          <div className='col'>
            <div className='field'>Lịch học:</div>
            <div className='detail'>{}</div>
          </div>
          <div className='col' />
        </div>
      </div>
      <div className='note'>
        <div className='note-label'>
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{
              marginRight: '16px'
            }}
          />
          <label>Ghi chú</label>
        </div>
        <div className='note-content'>{detail.note == '' || detail.note == null ? 'Không có ghi chú.' : note}</div>
      </div>
    </div>
  )
}
