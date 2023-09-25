//customize the router using useRoute hook
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import SalaryList from './pages/SalaryList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
// import { useContext } from 'react'
// import { AppConxtext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
const isAuthenticated = true
function ProtectedRoute() {
  // const { isAuthenticated } = useContext(AppConxtext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  // const { isAuthenticated } = useContext(AppConxtext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='' />
}
export default function useRouteElements() {
  const routeElements = useRoutes([
    // {
    //   path: '/',
    //   // element: <?thanh's component/>
    //   index: true
    // },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/list',
          element: (
            <MainLayout>
              <SalaryList />
            </MainLayout>
          )
        }
        // {
        //   path: '/salary',
        //   element: <SalaryList />
        // }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
