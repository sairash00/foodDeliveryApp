import React from 'react'
import { Outlet } from 'react-router-dom'
import Top from './Top'
import { useLocation } from 'react-router-dom'

interface user {
  name: string
}

const Dashboard = () => {

  const location = useLocation()
  const user: user = location.state?.user
  return (
    <div className=' w-[100vw] min-h-[90vh] ' >
        <Top user = {user} />
        <Outlet/>
    </div>
  )
}

export default Dashboard