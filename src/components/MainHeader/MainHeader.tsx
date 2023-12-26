import { useContext, useState } from 'react'
import { useFloating, FloatingPortal } from '@floating-ui/react-dom-interactions'
import { AppConxtext } from '~/contexts/app.context'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { Button, Menu, type MenuProps } from 'antd'
import { HomeOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons'
import path from '~/constants/path'
import useCurrentMonthYear from '~/hooks/useCurrentMonthYear'
import useFirstDayOfMonth from '~/hooks/useFirstDayOfMonth'
import useLastDayOfMonth from '~/hooks/useLastDayOfMonth'
export default function MainHeader() {
  const { currentMonth, currentYear } = useCurrentMonthYear()
  const firstDayOfMonth = useFirstDayOfMonth()
  const lastDayOfMonth = useLastDayOfMonth()
  const navigate = useNavigate()
  const onSalaryListNagivate = () => {
    navigate({
      pathname: path.salary,
      search: createSearchParams({
        month: currentMonth,
        year: currentYear
      }).toString()
    })
  }
  const onHomeNavigate = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        fromDate: firstDayOfMonth,
        toDate: lastDayOfMonth
      }).toString()
    })
  }
  const items: MenuProps['items'] = [
    {
      label: (
        <Button rootClassName='border-none pl-0 text-white' onClick={onHomeNavigate}>
          Trang Chủ
        </Button>
      ),
      key: 'home',
      icon: <HomeOutlined />
    },
    {
      label: 'Đào tạo',
      key: 'SubMenu',
      icon: <BookOutlined />,
      children: [
        {
          label: <Link to={path.classList}>Danh sách khóa học</Link>,
          key: 'setting:1'
        },
        {
          label: <Link to={path.inChargeCourse}>Khóa học của tôi</Link>,
          key: 'setting:2'
        }
      ]
    },
    {
      label: 'Nhân sự',
      key: 'Staff',
      icon: <TeamOutlined />,
      children: [
        {
          label: (
            <Button rootClassName='border-none pl-0' onClick={onSalaryListNagivate}>
              Bảng lương TA
            </Button>
          ),
          key: 'setting:3'
        },
        {
          label: <Link to={`/employeeList?job_position=Teacher`}>Danh sách nhân viên</Link>,
          key: 'setting:4'
        }
      ]
    }
  ]
  const [current, setCurrent] = useState('mail')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }
  const [open, setOpen] = useState(false)
  const { x, y, reference, floating, strategy } = useFloating({
    open,
    onOpenChange: setOpen
  })
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  const { reset, profile } = useContext(AppConxtext)
  const handleLogout = () => {
    reset()
  }
  return (
    <div>
      <nav className='bg-gray-800 border-gray-200 '>
        <div className='max-w-screen-xl flex items-center justify-between mx-auto p-4'>
          <Link to={`/?fromDate=2023-12-01&toDate=2023-12-31`} className='flex items-center'>
            <img
              src='https://cdn-icons-png.flaticon.com/128/1290/1290874.png'
              className='h-8 mr-3'
              alt='procast logo'
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Procast</span>
          </Link>
          <div
            className='flex items-center md:order-2'
            ref={reference}
            onMouseEnter={showPopover}
            onMouseLeave={hidePopover}
          >
            <img
              className='w-8 h-8 rounded-full'
              src='https://theieltsworkshop.com/wp-content/uploads/2023/06/logo-tiw-04.png'
              alt='user photo'
            />
            {/* </button> */}
            <FloatingPortal>
              {open && (
                <div
                  ref={floating}
                  style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                    width: 'max-content',
                    zIndex: 6000
                  }}
                >
                  <div
                    className='z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
                    // id='user-dropdown'
                  >
                    <div className='px-4 py-3 '>
                      <span className='block text-sm text-gray-900 dark:text-white'>
                        {profile?.user_name ?? 'Default name'}
                      </span>
                      <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                        {profile?.email ?? 'Default email'}
                      </span>
                    </div>
                    <ul className='py-2' aria-labelledby='user-menu-button '>
                      <li>
                        <Link
                          to={path.changePassword}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                        >
                          Đổi mật khẩu
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={path.profile}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                        >
                          Sửa hồ sơ
                        </Link>
                      </li>
                      <li>
                        <div
                          className='block py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white px-4'
                          onClick={() => handleLogout()}
                        >
                          Đăng xuất
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </FloatingPortal>
            <div
              className='z-50 hidden 
               my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
            >
              <div className='px-4 py-3 '>
                <span className='block text-sm text-gray-900 dark:text-white'>Loc Nguyen</span>
                <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                  loclieulinh318@gmail.com
                </span>
              </div>
              <ul className='py-2' aria-labelledby='user-menu-button '>
                <li>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div             
           style={{width:"30%"}}
>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode='horizontal'
              items={items}
              rootClassName='bg-gray-800 text-white w-400'
            />
          </div>
        </div>
      </nav>
    </div>
  )
}
