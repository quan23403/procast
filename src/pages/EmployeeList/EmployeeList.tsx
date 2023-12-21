import { Button } from 'antd'
// import { useState } from 'react'
// import TeacherList from './TeacherList.json'
// import TAList from './TAList.json'
import employeeApi, { employeeConfig } from '~/apis/employee.api'
import useQueryParams from '~/hooks/useQueryParams'
import { isUndefined, omitBy } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import path from '~/constants/path'
import { useLayoutEffect, useRef } from 'react'
export interface employeeType {
  user_id: string
  user_name: string
  dob: string
  email: string
  job_position: string
  role: string
  start_date: string
  password: string
  full_name: string
  gender: string
}
// eslint-disable-next-line react-refresh/only-export-components
export default function () {
  const queryParams: employeeConfig = useQueryParams()
  const { job_position } = useParams<{ job_position: string }>()
  // const [active, setActive] = useState<boolean>(false)
  const active = useRef(true)
  useLayoutEffect(() => {
    if (job_position !== 'Teacher') {
      active.current = false
      console.log(job_position)
      console.log(active.current)
    } else {
      active.current = true
      console.log(active.current)
    }
  }, [job_position])

  const navigate = useNavigate()
  const queryConfig: employeeConfig = omitBy(
    {
      job_position: queryParams.job_position
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['employee', queryConfig],
    queryFn: () => {
      return employeeApi.getSalary(queryConfig)
    }
  })
  const nameHeaderTable = ['#', 'Họ và tên', 'Ngày sinh', 'Giới tính', 'Email']

  // Lấy dữ liệu test từ File Json
  // const teacherList = TeacherList
  // const teachingassistantList = TAList
  // List danh sách theo nhu cầu
  // const [list, setList] = useState(teacherList)
  return (
    <div className='container-employee-list'>
      <div className='title-list' style={{ padding: '20px', backgroundColor: 'white', fontSize: '20px' }}>
        <h1>Danh sách nhân viên</h1>
      </div>
      <div className='container-main-content' style={{ backgroundColor: '#E3E3E3', padding: '20px' }}>
        <div className='maint-content' style={{ backgroundColor: 'white', padding: '10px' }}>
          <div className='option-employee-list' style={{ marginBottom: '10px' }}>
            <Button
              className={`bg-gray-200 ${active.current ? 'text-blue-500 border-blue-500' : ''} border-2`}
              style={{ backgroundColor: '#E4E4E4', marginRight: '15px' }}
              onClick={() => {
                navigate({
                  pathname: path.employeeList,
                  search: createSearchParams({
                    job_position: 'Teacher'
                  }).toString()
                })
              }}
            >
              Danh sách giáo viên
            </Button>
            <Button
              style={{ backgroundColor: '#E4E4E4' }}
              className={`bg-gray-200 ${active.current ? 'text-blue-500 border-blue-500' : ''} border-2`}
              onClick={() => {
                navigate({
                  pathname: path.employeeList,
                  search: createSearchParams({
                    job_position: 'TA'
                  }).toString()
                })
              }}
            >
              Danh sách TA
            </Button>
          </div>
          <div className='employee-list'>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Open Sans' }}>
              <thead>
                <tr>
                  {nameHeaderTable.map((header, index) => (
                    <th style={{ border: 'solid 1px #ddd' }} key={index}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.data.data.map((data: employeeType, index: number) => (
                  <tr key={index}>
                    <th style={{ border: 'solid 1px #ddd', fontWeight: 'normal' }}>{index + 1}</th>
                    <th
                      style={{
                        border: 'solid 1px #ddd',
                        fontWeight: 'normal',
                        width: '30%',
                        textAlign: 'left',
                        paddingLeft: '10px'
                      }}
                    >
                      {data.full_name}
                    </th>
                    <th style={{ border: 'solid 1px #ddd', fontWeight: 'normal' }}>{data.dob}</th>
                    <th style={{ border: 'solid 1px #ddd', fontWeight: 'normal' }}>{data.gender}</th>
                    <th
                      style={{
                        border: 'solid 1px #ddd',
                        fontWeight: 'normal',
                        width: '30%',
                        textAlign: 'left',
                        paddingLeft: '10px'
                      }}
                    >
                      {data.email}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
