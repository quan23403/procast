import { useContext, useState } from 'react'
import { useFloating, FloatingPortal } from '@floating-ui/react-dom-interactions'
import { AppConxtext } from '~/contexts/app.context'
import { Link, NavLink, createSearchParams, useNavigate } from 'react-router-dom'
import NavbarComponent from '../NavbarComponent'
import { trainingLabel, trainingPath } from '~/constants/navbarPaths'
import { Button, Dropdown, Menu, type MenuProps } from 'antd'
import { AppstoreOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons'
import path from '~/constants/path'
import useCurrentMonthYear from '~/hooks/useCurrentMonthYear'
export default function MainHeader() {
  const { currentMonth, currentYear } = useCurrentMonthYear()
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
  const items: MenuProps['items'] = [
    {
      label: <Link to={path.home}>Trang chủ</Link>,
      key: 'mail',
      icon: <HomeOutlined />
    },
    {
      label: 'Đào tạo',
      key: 'SubMenu',
      icon: <BookOutlined />,
      children: [
        {
          label: <Link to={path.classList}>Khóa học</Link>,
          key: 'setting:1'
        },
        {
          label: 'Lớp học',
          key: 'setting:2'
        },
        {
          label: (
            <Button rootClassName='border-none pl-0' onClick={onSalaryListNagivate}>
              Bảng lương TA
            </Button>
          ),
          key: 'setting:3'
        },
        {
          label: 'Option 4',
          key: 'setting:4'
        }
      ]
    }
    // {
    //   label: (
    //     <a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
    //       Navigation Four - Link
    //     </a>
    //   ),
    //   key: 'alipay'
    // }
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
  const { reset } = useContext(AppConxtext)
  const handleLogout = () => {
    reset()
  }
  return (
    <div>
      <nav className='bg-gray-800 border-gray-200 '>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <a href='#' className='flex items-center'>
            <img
              src='https://cdn-icons-png.flaticon.com/128/1290/1290874.png'
              className='h-8 mr-3'
              alt='procast logo'
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Procast</span>
          </a>
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
                    width: 'max-content'
                  }}
                >
                  <div
                    className='z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
                    // id='user-dropdown'
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
                          Đổi mật khẩu
                        </a>
                      </li>
                      <li>
                        <a
                          href='#'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                        >
                          Sửa hồ sơ
                        </a>
                      </li>
                      <li>
                        <button
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                          onClick={() => handleLogout()}
                        >
                          Sign out
                        </button>
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
          <div>
            {/* items-center justify-between hidden w-full md:flex md:w-auto md:order-1 */}
            {/* flex flex-col font-normal p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700 */}
            {/* <ul
              className='flex font-normal p-0 text-white
             space-x-10 mt-0 border-0'
            >
              <li>
                <NavLink to='/home' className=''>
                  {({ isActive }) => (
                    <div className={isActive ? 'bg-black' : ''}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                        />
                      </svg>
                      Trang chủ
                    </div>
                  )}
                </NavLink>
              </li>
              <Dropdown menu={{ items }} placement='bottomLeft'>
                <Button>Đào tạo</Button>
              </Dropdown>
              <li>
                <a
                  href='#'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  Báo cáo
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  Nhân sự
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  Contact
                </a>
              </li>
            </ul> */}

            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode='horizontal'
              items={items}
              rootClassName='bg-gray-800 text-white w-80'
            />
          </div>
        </div>
      </nav>
    </div>
  )
}
