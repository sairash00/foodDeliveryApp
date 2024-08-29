import Navbar from './components/Navbar/Navbar.tsx'
import {Outlet } from 'react-router-dom'

const Routing = () => {
  return (
    <>
     <Navbar/>
      <Outlet/>
    </>
  )
}

export default Routing