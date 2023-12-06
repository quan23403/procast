import './App.css'
import useRouteElements from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useEffect, useContext } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppConxtext } from './contexts/app.context'
function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppConxtext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
