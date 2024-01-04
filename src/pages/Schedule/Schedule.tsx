import { useQuery } from '@tanstack/react-query'
import { Button, Calendar, CalendarProps, Carousel, Col, DatePicker, Layout, Row, theme } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { isUndefined, omitBy } from 'lodash'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import scheduleApi from '~/apis/schedule.api'
import path from '~/constants/path'
import useQueryParams from '~/hooks/useQueryParams'
import { CourseClass, ScheduleParam } from '~/types/schedule.type'
import './Schedule.css'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
import itImage from './courseImage/it.png'
import psImage from './courseImage/ps.png'
import apsImage from './courseImage/aps.png'
import srImage from './courseImage/sr.png'

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
      return scheduleApi.getSessions(queryConfig)
    }
  })
  // const dataTest = [
  //   { course_id: 57, course_code: "PS", course_name: "PS57", start_time: "08:00:00", end_time: "10:00:00", date: "2023-12-06" },
  //   { course_id: 57, course_code: "APS", course_name: "APS57", start_time: "08:00:00", end_time: "10:00:00", date: "2023-12-06" },
  // ]
  const colorByCourseCode = (course_code: string) => {
    if (course_code == 'PS') {
      return '#C6FFC5'
    } else if (course_code == 'APS') return '#FFC5C5'
    else if (course_code == 'SR') return '#ff6f6f'
    else if (course_code == 'IT') return 'rgb(218 154 246)'
    return ''
  }

  const backgroundByCourseCode = (course_code: string) => {
    if (course_code == 'PS') {
      return psImage
    } else if (course_code == 'APS') return apsImage
    else if (course_code == 'SR') return srImage
    else if (course_code == 'IT') return itImage
    return ''
  }
  const dateCellRender = (value: Dayjs) => {
    const dateClasses: CourseClass[] =
      data?.data?.data?.filter((data) => data.date === value.format('YYYY-MM-DD')) || []
    // const dateClasses: CourseClass[] = dataTest.filter((data) => data.date == value.format('YYYY-MM-DD')) || [];
    return (
      <ul>
        {dateClasses.map((item) => (
          <li
            key={item.course_id}
            style={{ backgroundColor: colorByCourseCode(item.course_code), marginBottom: '10px' }}
          >
            {/* <a>{item.date}</a> <br /> */}
            <Link to={`/detail/id/${item.course_id}/index`}>
              {item.start_time.slice(0, 5)}-{item.end_time.slice(0, 5)} {item.course_name}
            </Link>
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
  const { token } = theme.useToken();
  const todayCourse = (data?.data?.data || []).filter((item) => item.date === dayjs(today).format('YYYY-MM-DD'))
console.log(todayCourse)
  return (
    <>
      <Layout>
        <Header
          style={{
            backgroundColor: '#fff',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <h1 style={{
            fontSize: '30px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>Thời khóa biểu lớp học</h1>
        </Header>


        <Content>
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0)',
              }}
            >
              <Carousel autoplay>
                {todayCourse.map((item) => (
                  <div style={{
                    height: '400px',
                  }}>
                    <div
                    key={item.course_id}
                    style={{
                      backgroundImage: `url(${backgroundByCourseCode(item.course_code)})`,
                      backgroundSize: 'cover',
                      height: '400px',
                      width: '180',
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      flexDirection: 'column',
                      padding: '10px',
                      margin: '10px',
                    }}
                  >
                    <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>{item.course_name}</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.start_time.slice(0, 5)}-{item.end_time.slice(0, 5)}</p>
                    <Link to={`/detail/id/${item.course_id}/index`}>
                      <Button
                        style={{
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}
                      >Chi tiết</Button>
                    </Link>
                  </div>
                  </div>
                ))}
              </Carousel>
            </Sider>
            <div
              style={{
                height: '50%',
                width: '80%',
                border: `1px solid ${token.colorBorderSecondary}`,
                borderRadius: '10px',
                marginLeft: '5%'
              }}>
              <Calendar
                className='user-schedule'
                cellRender={cellRender}
                style={{
                  paddingTop: '20px', marginTop: '4px', borderRadius: '10px',

                }}
                headerRender={({ value, onChange }) => {
                  return (<div>
                    <Row gutter={8} style={{ alignItems: 'end', flexDirection: 'column', margin: '16px 24px 16px' }}>
                      <Col>
                        <label>Tháng: </label>
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

          </Layout>

        </Content>
      </Layout>

    </>
  )
}
