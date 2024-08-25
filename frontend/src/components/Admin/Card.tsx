import React from 'react'
import ProductDetail from './ProductDetail'

const Card = () => {
  return (
    <div  className=' w-[60%] flex flex-wrap max-sm:w-full gap-8 justify-between px-6 max-lg:px-2 py-4 min-h-[30vh] border-[3px] rounded-lg border-[#fc4e037b] ' >
        <div className=' max-950:w-[100%] flex flex-col gap-4 max-sm:px-2 max-950:h-[40vh] h-[30vh] overflow-x-auto px-6 ' >
            <ProductDetail cart = {true} name='' image='' price={0} quantity={0} />
            <ProductDetail cart = {true} name='' image='' price={0} quantity={0} />

        </div>
        <div className=' max-950:w-[100%] w-[35%] max-950:px-6 max-sm:px-2 flex flex-col justify-center gap-1 ' >
            <div className='text-md font-semibold' >id: sdfsdfsdfjsdfljw4r32ij4jdsifsdfi </div>
            <div className='text-md font-semibold' >Total: 700 </div>
            <div className='text-md font-semibold' >Paid: false</div>
            <div className='text-md font-semibold' >Status: Pending </div>
            <select  className='outline-none border px-1 py-1 rounded-md text-sm mt-1 mb-1 font-semibold bg-transparent ' >
                <option>Select the status of order</option>
                <option value="pending">Pending</option>
                <option value="delivering">Delivering</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>
            <button className='px-2 py-1 bg-[#a93503] text-white rounded-md font-semibold hover:bg-[#fc4e03] transition ' >Update Status</button>
        </div>
    </div>
  )
}

export default Card