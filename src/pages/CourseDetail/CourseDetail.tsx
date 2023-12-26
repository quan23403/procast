import './CourseDetail.css'
import '../../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import classDetailApi from '~/apis/classDetail.api'
import dayjs from 'dayjs'
// import DetailNavbar from './DetailNavbar/DetailNavbar'

export interface Course {
  id: string | undefined
  courseType: string
  note?: string | null
}
export default function CourseDetail() {
  
  const { id } = useParams()
  const queryConfig = omitBy(
    {
      classId: id
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['classDetail', queryConfig],
    queryFn: () => {
      return classDetailApi.getClassDetail(queryConfig)
    }
  })
  const note: string | null = null
  const detail = data?.data?.data || {
    course_id: null,
    course_name: null,
    main_teacher: null,
    room: null,
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
    study_days: null,
    course_status: null,
    total_sessions: null,
    note: null,
  }
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
              {detail.course_name}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='field'>Khóa học:</div>
            <div className='detail'>{detail.course_name}</div>
          </div>
          <div className='col'>
            <div className='field'>
              Ngày khai giảng: 
              <br />
              Kết thúc: 
            </div>
            <div className='detail'>
            {detail.start_date}
              <br />{detail.end_date}
            </div>
          </div>
          <div className='col'>
            <div className='field'>Ca học: </div>
            <div className='detail'>{dayjs(detail.start_time?.slice(11,19), 'HH:mm:ss').format('HH:mm')}-{dayjs(detail.end_time?.slice(11,19), 'HH:mm:ss').format('HH:mm')}</div>
          </div>
        </div>
        {/* <div className='row'>
          <div className='col'>
            <div className='field'>Số học viên:</div>
            <div className='detail'>{}</div>
          </div>
          <div className='col'>
            <div className='field'>Số học viên tối đa:</div>
            <div className='detail'>{}</div>
          </div>
          <div className='col' />
        </div> */}
        <div className='row'>
          <div className='col'>
            <div className='field'>Địa điểm học:</div>
            <div className='detail'>Hoàng Quốc Việt</div>
          </div>
          <div className='col'>
            <div className='field'>Phòng học:</div>
            <div className='detail'>{detail.room}</div>
          </div>
          <div className='col'>
            <div className='field'>Giảng viên:</div>
            {/* dùng for và el<br/> */}
            <div className='detail'>{detail.main_teacher}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='field'>Số buổi học:</div>
            <div className='detail'>{detail.total_sessions}</div>
          </div>
          <div className='col'>
            <div className='field'>Lịch học:</div>
            <div className='detail'>{detail.study_days?.split(",").map((date)=>(`${date}, `)).join("").slice(0, -2)}</div>
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
