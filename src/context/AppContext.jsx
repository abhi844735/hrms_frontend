import React, { createContext, useState } from 'react'
import Cookies from "js-cookie";

export const AppContext = createContext();

const AppProvider = ({children}) => {
    const [isLoggedin, setIsLoggedin] = useState(Cookies.get("token") ? true : false)

  return (
    <AppContext.Provider value={{isLoggedin, setIsLoggedin}}>
        {children}
    </AppContext.Provider>
  )
}

export default AppProvider