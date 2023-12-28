import dayjs from 'dayjs'
import { MouseEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function DetailNavbar({ id }: {id: string}) {
  const [activeLink, setActiveLink] = useState('')
  const handleClick = (id: string, event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    event.preventDefault()
    setActiveLink(id)
  }

  return (
    <>
      <div className='page-tab'>
        <ul className='nav'>
          <li>
            <NavLink
              to={`/detail/id/${id.toString()}/index`}
              className='block bg-gray-300 mr-4 px-4 h-9 leading-9 rounded-md text-black'
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? 'yellow' : ''
                }
              }}
            >
              Thông tin chung
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/detail/id/${id.toString()}/studentList`}
              className='block bg-gray-300 mr-4 px-4 h-9 leading-9 rounded-md text-black'
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? 'yellow' : ''
                }
              }}
            >
              Danh sách học viên
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/detail/id/${id.toString()}/studyRoadmap`}
              className='block bg-gray-300 mr-4 px-4 h-9 leading-9 rounded-md text-black hover:bg-slate-900'
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? 'yellow' : ''
                }
              }}
            >
              Lộ trình học
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/detail/id/${id.toString()}/classAttendance`}
              className='block bg-gray-300 mr-4 px-4 h-9 leading-9 rounded-md text-black hover:bg-slate-900'
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? 'yellow' : ''
                }
              }}
            >
              Điểm danh
            </NavLink>
          </li>
          <li>
            <a
              id='sup-class'
              className={activeLink === 'sup-class' ? 'active' : ''}
              onClick={(e) => handleClick('sup-class', e)}
              href=''
            >
              Bổ trợ
            </a>
          </li>
        </ul>
        <div className='time-system'>Time : {dayjs().format('DD/MM/YYYY')}</div>
      </div>
    </>
  )
}
