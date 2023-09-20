import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from '~/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS),
  setIsAuthenticated: () => null
}

export const AppConxtext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)

  return <AppConxtext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AppConxtext.Provider>
}
