import { useQuery } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import { Outlet, useParams } from 'react-router-dom'
import classDetailApi from '~/apis/classDetail.api'
import DetailNavbar from '~/pages/CourseDetail/DetailNavbar/DetailNavbar'

export default function ClassDetailLayout() {
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
  console.log(data)
  return (
    <div>
      <div className='course-label'>
        <h1>
          Chi tiết lớp học {data?.data.data.course_name}
        </h1>
      </div>
      <DetailNavbar id={id? id : 'null'}></DetailNavbar>
      <Outlet />
    </div>
  )
}
