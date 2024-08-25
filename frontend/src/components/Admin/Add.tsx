import React from 'react'
import { FaImage } from 'react-icons/fa6'

const Add = () => {
  return (
    <div className=' w-full flex items-center justify-center py-10 px-[1rem]' >
        <div className='flex flex-col border border-[#fc4e03] gap-8 px-4 py-3 max-9:w-[70%] max-sm:w-full max-md:w-[80%] shadow-lg rounded-md w-[50%] min-h-[70vh] ' >
            <div className='text-2xl max-sm:text-xl text-center font-semibold text-[#fc4e03] ' >Add Products</div>
            <form encType='' className='flex flex-col gap-5 ' >
                <div >
                  <label htmlFor='name'  className='text-sm font-semibold tracking-wide ' >Name *</label>
                  <input  type='text' required autoComplete='Name' id='name' name='name' className=' tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-1 ' />
                </div>
                <div >
                  <label htmlFor='price'  className='text-sm font-semibold tracking-wide ' >Price *</label>
                  <input  type='number' required autoComplete='price' id='price' name='price' className=' tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-1 ' />
                </div>
                <div className='flex flex-col gap-2 mb-2 ' >
                    <label htmlFor='category'  className='text-sm font-semibold tracking-wide ' >Category *</label>
                    <select  className='outline-none text-sm font-semibold bg-transparent ' >
                        <option value="food">Foods</option>
                        <option value="drink">Drinks</option>
                        <option value="dessert">Dessert</option>
                    </select>
                </div>
                <div className=' w-full h-[15vh] border border-[#00000059] rounded-md flex items-center justify-center flex-col ' >
                  <label htmlFor='image'  className='text-lg flex flex-col items-center hover:text-[gray] transition font-semibold tracking-wide ' > <FaImage/> <div className='text-sm font-normal ' >Add Image</div> </label>
                  <input type='file' required id='image' name='image' className=' sr-only tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-1 ' />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Add