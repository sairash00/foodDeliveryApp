import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div>
        <nav className=' flex px-2 max-sm:gap-4  max-sm:text-sm gap-8 h-[8vh] items-center border-b justify-center ' >
            <Link className=' font-semibold focus:text-[#fc4e30] focus:underline focus:animate-pulse  underline-offset-4  ' to={"/admin"} >Products</Link>
            <Link className=' font-semibold focus:text-[#fc4e30] focus:underline focus:animate-pulse  underline-offset-4  ' to={"/admin/add"} >Add Products</Link>
            <Link className=' font-semibold focus:text-[#fc4e30] focus:underline focus:animate-pulse  underline-offset-4  ' to={"/admin/orders"} >Orders</Link>
        </nav>
        <Outlet/>
    </div>
  )
}

export default Main