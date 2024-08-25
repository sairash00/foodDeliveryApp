import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from '../Footer/Footer'

const Connected = () => {
  return (
    <>
      <div className='w-[100vw] py-2 px-[1rem] max-xs:px-[1rem] ' >
        <Nav/>
        <Outlet />
      </div>
        <Footer/> 
    </>
  )
}

export default Connected