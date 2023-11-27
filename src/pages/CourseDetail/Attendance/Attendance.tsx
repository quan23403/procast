import '~/css/Attendance.css'
import HWCheck from './HWCheck'
import { studentList } from '~/types/student.type'
import { classesList } from '~/types/classLists.type'
import ClassCheckIn from './ClassCheckin'

export default function Attendance() {
  const classesList: classesList[] = [
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
    },
    {
      id: 4,
      name: 'B4'
    },
    {
      id: 5,
      name: 'B5'
    },
    {
      id: 6,
      name: 'B6'
    },
    {
      id: 7,
      name: 'B7'
    },
    {
      id: 8,
      name: 'B8'
    },
    {
      id: 9,
      name: 'B9'
    },
    {
      id: 10,
      name: 'B10'
    }
  ]
  const initialStudentList: studentList = {
    studentList: [
      {
        id: 1,
        name: 'loc nguyen',
        dob: '2003/08/31',
        note: '',
        checkin: [
          {
            class: 'bo tro',
            status: 'done'
          },
          {
            class: 'advance',
            status: 'done'
          }
        ],
        hw: [
          {
            class: 'bo tro',
            status: 'done'
          },
          {
            class: 'advance',
            status: 'done'
          }
        ]
      },
      {
        id: 2,
        name: 'minh quan',
        dob: '2003/04/23',
        note: '',
        checkin: [
          {
            class: 'bo tro',
            status: 'done'
          },
          {
            class: 'advance',
            status: 'done'
          }
        ],
        hw: [
          {
            class: 'bo tro',
            status: 'done'
          },
          {
            class: 'advance',
            status: 'done'
          }
        ]
      }
    ]
  }
  const studentList: studentList = initialStudentList
  return (
    <div>
      <div className='main-content'>
        <div className='tag-content'>
          <div className='page-content'>
            <ClassCheckIn classesList={classesList} studentList={studentList} />
            <div className='seperate'>
              <hr />
            </div>
            <HWCheck classesList={classesList} studentList={studentList} />
          </div>
        </div>
      </div>
    </div>
  )
}
