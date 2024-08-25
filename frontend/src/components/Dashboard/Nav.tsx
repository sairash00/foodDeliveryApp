import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (

    <nav className=' flex justify-center py-4 h-[8vh] border-b gap-8 ' >
        <Link className=' font-semibold focus:text-[#fc4e03] focus:underline underline-offset-4 focus:animate-bounce ' to={"/dashboard/cart"} >Cart</Link>
        <Link className=' font-semibold focus:text-[#fc4e03] focus:underline underline-offset-4 focus:animate-bounce ' to={"/dashboard/orders"} >Orders</Link>
    </nav>

)
}

export default Nav