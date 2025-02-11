import React, { useContext } from 'react'
import AllRoutes from './AllRoutes'
import { AppContext } from './context/AppContext';
import Navbar from './components/Navbar';

const App = () => {
  const { isLoggedin } = useContext(AppContext);
  return (
    <>
    {isLoggedin && <Navbar />}
    <AllRoutes />
    </>
  )
}

export default App