import '~/css/Attendance.css'
import { StudentCheckin} from '~/types/student.type'
import { classesList } from '~/types/classLists.type'
import ClassCheckIn from './ClassCheckin'
import { useParams } from 'react-router-dom';
import { isUndefined, omitBy } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import classDetailApi from '~/apis/classDetail.api';
// import DetailClassHeader from '~/components/DetailClassHeader'

export default function Attendance() {
  // const classesList: classesList[] = [
  //   { id: 1, name: 'B1', date: '2023-10-27' },
  //   { id: 3, name: 'B2', date: '2023-10-30' },
  //   { id: 2, name: 'B3', date: '2023-12-07' },
  //   { id: 4, name: 'B4', date: '2023-11-03' },
  //   { id: 5, name: 'B5', date: '2023-11-06' },
  //   { id: 6, name: 'B6', date: '2023-11-08' },
  //   { id: 7, name: 'B7', date: '2023-11-10' },
  //   { id: 8, name: 'B8', date: '2023-11-13' },
  //   { id: 9, name: 'B9', date: '2023-11-15' },
  //   { id: 10, name: 'B10', date: '2023-11-17' },
  // ];
  // const studentList: StudentCheckin[] = [
  //     {
  //       id: 1,
  //       name: 'loc nguyen',
  //       dob: '2003/08/31',
  //       note: '',
  //       checkin: [
  //         {
  //           classId: 1,
  //           status: '1'
  //         },
  //         {
  //           classId: 2,
  //           status: 'M'
  //         }
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: 'minh quan',
  //       dob: '2003/04/23',
  //       note: '',
  //       checkin: [
  //         {
  //           classId: 1,
  //           status: '1'
  //         },
  //         {
  //           classId: 2,
  //           status: '1'
  //         }
  //       ],
  //     }
  //   ]

  const { id } = useParams()
  const queryConfig = omitBy(
    {
      courseId: id
    },
    isUndefined
  )
  const { data: checkinData } = useQuery({
    queryKey: ['checkinData', queryConfig],
    queryFn: () => {
      return classDetailApi.getStudentCheckinList(queryConfig)
    }
  })
  const studentList : StudentCheckin[] = [...(checkinData?.data?.data ?? [])];

  const { data: sessionsData } = useQuery({
    queryKey: ['sessionsData', queryConfig],
    queryFn: () => {
      return classDetailApi.getSessionList(queryConfig)
    }
  })

  const classesList: classesList[] = [...(sessionsData?.data?.data ?? [])].map(item => ({
    ...item,
    date: new Date(item.date)
  })).sort((a, b) => a.date.getTime() - b.date.getTime()).map((item, index) => ({
    ...item,
    name: `Buổi ${index+1}`
  }));
  return (
    <div>
      <div className='main-content'>
        {/* <DetailClassHeader></DetailClassHeader> */}
        <div className='tag-content'>
          <div className='page-content'>
            <ClassCheckIn classesList={classesList} studentList={studentList} />
            {/* <div className='seperate'>
              <hr />
            </div>
            <HWCheck classesList={classesList} studentList={studentList} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
