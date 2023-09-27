//customize the router using useRoute hook
import { useRoutes } from 'react-router-dom'
import SalaryList from './pages/SalaryList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <SalaryList />
    },
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
  ])
  return routeElements
}
