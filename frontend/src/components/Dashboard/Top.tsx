import React from 'react'
import Nav from './Nav'

const Top = () => {
  return (
    <>
        <div className=' w-full h-[30vh]  flex-col  border flex justify-center py-2  items-center px-[2rem] ' >
            <div className='text-center' >
                <div className=' text-5xl max-xs:text-3xl  font-bold text-[#fc4e03] ' >Welcome, Sairash</div>
                <p className='mt-4 max-xs:text-sm text-[#010000b4] font-semibold ' >Yumm is all yours. Eat what you like</p>
            </div>
        </div>
        <Nav/>
    </>
  )
}

export default Top