import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoAddOutline } from 'react-icons/io5';

interface Products{
  _id: string,
  name: string,
  category: string,
  price: number,
  images: [string]
}
interface Props {
  key: string;
  product: Products
}

  interface Response{
    status: number,
    success: boolean,
    message: string
  }

const ProductCard = ({product}:Props) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [deleted, setDeleted] = useState<boolean>(false)
  
  const DeleteProduct = async ():Promise<void> => {
    setLoading(true)
    try {
      const response:AxiosResponse<Response> = await axios.post(import.meta.env.VITE_DELETE_PRODUCT, {id: product._id})
      if(response.status === 200 && response.data.success){
        setLoading(false)
        toast.success(response.data.message || "Product remove successfully")
        setDeleted(true)
      }
      
    } catch (error) {
      setLoading(false)
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message || "Couldn't remove product")
      }else{
        toast.error("Couldn't remove product")
      }
    }
  }

  return (
     <div className= { deleted? 'hidden' : 'px-2 max-xs:w-full max-sm:justify-between max-xsm:w-full hover:shadow-lg shadow-[#8080804b] hover:bg-[white] transition-all py-2 flex flex-col gap-2 min-w-[16vw] min-h-[45vh] border border-[#fc4e0330] shadow-md rounded-md overflow-hidden' } >
      <img src="/foods.jpg" loading='lazy' alt="" className='  shadow-md shadow-[#8080804b] object-cover object-center w-full max-xs:h-[50vh] h-[30vh] rounded-lg' />
      <div className='flex justify-between items-center ' >
        <div>
            <h2 className='text-sm font-semibold ' >{product.name}</h2>
            <p className=' font-bold '>Rs. {product.price}</p>
        </div>
        <div className='flex items-center gap-2' >
            <p className='font-semibold' >Cat. {product.category}</p>
        </div>
      </div>
      <button onClick={DeleteProduct} className='bg-[#c90202] hover:bg-[#ee0202] font-semibold transition text-[#fff] px-4 py-2 rounded-md'>{loading ? "Removing" : "Remove Product"} </button>
    </div>
  );
}

export default ProductCard;
