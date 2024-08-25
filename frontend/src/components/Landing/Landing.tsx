import React from 'react'
import { FaAngleDown} from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='w-full flex flex-col justify-between items-center py-3  h-[90vh] bg-[url("/background.png")] bg-cover  bg-no-repeat  ' >
        <div className='flex flex-col items-center h-full  gap-8 justify-center' >
            <div className='text-2xl text-[#000] font-semibold font-[marcellus] tracking-wide ' >Welcome to,</div>
            <div className='text-6xl w-[60%] max-sm:text-4xl max-[900px]:w-[95%] tracking-wide leading-normal font-[marcellus] text-center text-[#000] font-bold ' >Yumm! Where Flavor Meets Elegance</div>
            <Link to={"/products"} className=' animate-bounce text-center border min-w-[7vw] border-[gray] hover:bg-[#fc4e03] hover:border-[#fc4e03] hover:text-[#fff] rounded-full transition-all font-[marcellus] tracking-wide  text-[#000] text-sm font-semibold px-2 py-2' >Dig In</Link>
        </div>
        {/* <Link to={"/products"} className=' w-10  h-10 font-semibold rounded-full bg-[#fc4e03] flex items-center text-[#fff] justify-center animate-bounce ' >
            GO
        </Link> */}
    </div>
  )
}

export default Landing