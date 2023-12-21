/* eslint-disable react-refresh/only-export-components */
//customize the router using useRoute hook
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import SalaryList from './pages/SalaryList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import path from './constants/path'
import Schedule from './pages/Schedule/Schedule'
import CourseDetail from './pages/CourseDetail/CourseDetail'
import UserLayout from './pages/User/Layouts/UserLayout'
import Profile from './pages/User/pages/Profile'
import ChangePassword from './pages/User/pages/ChangePassword'
import ClassList from './pages/ClassList'
import Attendance from './pages/CourseDetail/Attendance'
import StudentList from './pages/StudentList'
import StudyRoadMap from './pages/StudyRoadMap'
import ClassDetailLayout from './layouts/ClassDetailLayout'
import { useContext } from 'react'
import { AppConxtext } from './contexts/app.context'
import EmployeeList from './pages/EmployeeList'

// const isAuthenticated = true;
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppConxtext)
  // console.log(isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppConxtext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/home' />
}
export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
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
      path: '/',
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
          path: path.home,
          index: true,
          element: (
            <MainLayout>
              <Schedule />
            </MainLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            }
          ]
        },
        {
          path: path.detail,
          element: (
            <MainLayout>
              <ClassDetailLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.courseDetail,
              element: <CourseDetail />
            },
            {
              path: path.studentList,
              element: <StudentList />
            },
            {
              path: path.studyRoadmap,
              element: <StudyRoadMap />
            },
            {
              path: path.classAttendance,
              element: <Attendance />
            }
          ]
        },
        {
          path: path.classList,
          element: (
            <MainLayout>
              <ClassList />
            </MainLayout>
          )
        },
        // {
        //   path: '/classlist',
        //   element: (
        //     <MainLayout>
        //       <ClassList />
        //     </MainLayout>
        //   )
        // },
        // {
        //   path: '/studentlist',
        //   element: (
        //     <MainLayout>
        //       <StudentList />
        //     </MainLayout>
        //   )
        // },
        {
          path: path.employeeList,
          element: (
            <MainLayout>
              <EmployeeList />
            </MainLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
