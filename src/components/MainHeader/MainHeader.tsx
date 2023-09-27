import { useContext, useState } from 'react'
import { useFloating, FloatingPortal } from '@floating-ui/react-dom-interactions'
import { useMutation } from '@tanstack/react-query'
import { logout } from '~/apis/auth.api'
import { AppConxtext } from '~/contexts/app.context'
export default function MainHeader() {
  const [open, setOpen] = useState(true)
  const { x, y, reference, floating, strategy } = useFloating({
    open,
    onOpenChange: setOpen
  })
  const showPopover = () => {
    setOpen(true)
    console.log(open)
  }
  const hidePopover = () => {
    setOpen(false)
    console.log(open)
  }
  const { setIsAuthenticated } = useContext(AppConxtext)
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div>
      <nav className='bg-white border-gray-200 dark:bg-gray-800'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <a href='https://flowbite.com/' className='flex items-center'>
            <img src='https://cdn-icons-png.flaticon.com/128/1290/1290874.png' className='h-8 mr-3' alt='Tiw Logo' />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Tiw </span>
          </a>
          <div
            className='flex items-center md:order-2'
            ref={reference}
            onMouseEnter={showPopover}
            onMouseLeave={hidePopover}
          >
            <img
              className='w-8 h-8 rounded-full'
              src='https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/284423813_524356292703123_8076039949760181028_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=C6Y3chScY3AAX8ygwZn&_nc_ht=scontent.fhan2-4.fna&oh=00_AfDNrond-Dtr9oTbP3f34QBrtjLLHrioICRYeYpEOIZjPA&oe=651410B0'
              alt='user photo'
            />
            {/* </button> */}
            <FloatingPortal>
              {/* Dropdown menu */}
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
                          onClick={handleLogout}
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
          <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-user'>
            <ul className='flex flex-col font-normal p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700'>
              <li>
                <a
                  href='#'
                  className='block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                  aria-current='page'
                >
                  Trang Chủ
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  Đào tạo
                </a>
              </li>
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
