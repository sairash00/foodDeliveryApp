import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Link } from 'react-router-dom'

interface Props{
    handleShow: () => void;
}

const Search = ( {handleShow}:Props ) => {
  return (
    <div className=' w-[100vw] backdrop-blur-[10px]  h-[100vh] z-10 fixed bg-[#00000070] ' >
        <div className=' w-full flex max-md:flex-col-reverse justify-between h-full' >
            <div className=' w-[55%] h-full max-md:w-full '></div>
            <div className=' w-[40%] max-md:shadow-none h-full border-l border-[#ffffff50] overflow-hidden max-md:w-full' >
                <div className='w-full border-b border-[#ffffff50] flex justify-end h-[10vh] px-[2rem] py-4  text-[#fff] text-4xl' ><RxCross2 onClick={handleShow} className='hover:text-[#e4e3e3] transition-all hover:scale-[1.2]  ' /></div>
                <Link onClick={handleShow} to={"/products"} className=' text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-7 px-4 ' >Home</Link>
                <Link onClick={handleShow} to={"/products"} className=' text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-7 px-4 ' >Products</Link>
                <Link onClick={handleShow} to={"/dashboard/orders"} className=' text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-7 px-4 ' >Orders</Link>
                <Link onClick={handleShow} to={"/dashboard/cart"} className=' text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-7 px-4  ' >Cart</Link>
                <Link onClick={handleShow} to={"/Admin"} className=' text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-7 px-4  ' >Admin</Link>
                <div className=' text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-7 px-4  ' >Log Out</div>
            </div>
        </div>
    </div>
  )
}

export default Search