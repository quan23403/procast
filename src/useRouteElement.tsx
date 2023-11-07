/* eslint-disable react-refresh/only-export-components */
//customize the router using useRoute hook
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import SalaryList from './pages/SalaryList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
// import { useContext } from 'react'
// import { AppConxtext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import path from './constants/path'
import Schedule from './pages/Schedule/Schedule'
import Attendance from './pages/Attendance/Attendance'
import CourseDetail from './pages/CourseDetail/CourseDetail'
import ClassList from './pages/ClassList'
import StudentList from './pages/StudentList'
const isAuthenticated = true
function ProtectedRoute() {
  // const { isAuthenticated } = useContext(AppConxtext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  // const { isAuthenticated } = useContext(AppConxtext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/home' />
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
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.salary,
          element: (
            <MainLayout>
              <SalaryList />
            </MainLayout>
          )
        },
        {
          path: '/home',
          element: (
            <MainLayout>
              <Schedule />
            </MainLayout>
          )
        },
        {
          path: 'detail/:id',
          element: (
            <MainLayout>
              <CourseDetail/>
            </MainLayout>
          )
        }
        ,
        {
          path: '/attendance',
          element: (
            <MainLayout>
              <Attendance/>
            </MainLayout>
          )
        },
        {
          path: '/classlist',
          element: (
            <MainLayout>
              <ClassList />
            </MainLayout>
          )
        },
        {
          path: '/studentlist',
          element: (
            <MainLayout>
              <StudentList />
            </MainLayout>
          )
        },
      ]
    }
  ])
  return routeElements
}
