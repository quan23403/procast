import { useQuery } from '@tanstack/react-query'
import { Button, Calendar, CalendarProps, Col, DatePicker, Row } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { isUndefined, omitBy } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'
import scheduleApi from '~/apis/schedule.api'
import path from '~/constants/path'
import useQueryParams from '~/hooks/useQueryParams'
import { CourseClass, ScheduleParam } from '~/types/schedule.type'

export default function Schedule() {
  const today = new Date(Date.now())
  const navigate = useNavigate()
  const queryParams: ScheduleParam = useQueryParams()
  const queryConfig: ScheduleParam = omitBy(
    {
      fromDate: queryParams.fromDate,
      toDate: queryParams.toDate
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['schedule', queryConfig],
    queryFn: () => {
      console.log(queryConfig)
      return scheduleApi.getSessions(queryConfig)
    }
  })
  // const dataTest = [
  //   { course_id: 57, course_code: "PS", course_name: "PS57", start_time: "08:00:00", end_time: "10:00:00", date: "2023-12-06" },
  //   { course_id: 57, course_code: "APS", course_name: "APS57", start_time: "08:00:00", end_time: "10:00:00", date: "2023-12-06" },
  // ]
  const colorByCourseCode = (course_code: string) => {
    if(course_code == "PS") {
      return "#C6FFC5";
    }
    else if(course_code == "APS")
      return "#FFC5C5"
    return "";
  }
  const dateCellRender = (value: Dayjs) => {
    const dateClasses: CourseClass[] = data?.data.data.filter((data) => data.date == value.format('YYYY-MM-DD')) || [];
    // const dateClasses: CourseClass[] = dataTest.filter((data) => data.date == value.format('YYYY-MM-DD')) || [];
    return (
      <ul>
        {dateClasses.map((item) => (
          <li key={item.course_id} style={{ backgroundColor:  colorByCourseCode(item.course_code), marginBottom:"10px"}}>
            {/* <a>{item.date}</a> <br /> */}
            <a>{item.start_time.slice(0, 5)}{item.end_time.slice(0, 5)} {item.course_name}</a> 
          </li>
          // return null
        ))}
      </ul>
    )
  }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current)
    return info.originNode
  }

  return (
    <>
      <div>
        <Calendar
          className='user-schedule'
          cellRender={cellRender}
          headerRender={({ value, onChange }) => {
            return (<div>
              <Row gutter={8}>
                <Col>
                  <DatePicker
                    defaultValue={dayjs(today)}
                    value={value}
                    onChange={(date) => {
                      if (date !== null)
                        onChange(date)
                    }}
                    format={'MM/YYYY'}
                    allowClear={false}
                    picker="month"
                    renderExtraFooter={() =>
                    (
                      <Button
                      rootClassName="bg-sky-400"
                        type="primary"
                        onClick={() => {
                          onChange(dayjs(today))
                        }}
                      >Now</Button>
                    )
                    }
                  />
                </Col>
              </Row>
            </div>)
          }}
          onChange={(date) => {
            navigate({
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                fromDate: date.startOf('month').format('YYYY-MM-DD'),
                toDate: date.endOf('month').format('YYYY-MM-DD')
              }).toString()
            })
          }}
        ></Calendar>
      </div>
    </>
  )
}
