import React, { useEffect, useState } from 'react'
import ProductDetail from './ProductDetail'
import toast from 'react-hot-toast';
import axios, { AxiosResponse } from 'axios';

interface ItemDetails {
  _id: string;
  name: string;
  price: number;
  images: [string]
}

interface OrderItem {
  item: ItemDetails;
  quantity: number;
  _id: string;
}

interface Address {
  city: string;
  state: string;
  country: string;
}
interface Items {
  deliveryAddress: Address | null
  _id: string;
  by: {
    name: string
    phoneNumber: number;
    address: Address
  };
  items: OrderItem[];
  pickUp: boolean;
  status: string;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Props{
  key: string;
  details: Items
}

interface Status{
  id: string;
  status: string
}

interface Response{
  status: number,
  success: boolean,
  order:{
    status: string
  }
}

const Card = ({details}:Props) => {
  const [totalAmt, setTotalAmt] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<Status>({
    id: details._id,
    status: ""
  })
  const [orderStatus, setOrderStatus] = useState<string>(details.status);


  useEffect(() => {
    let total = 0;
    details.items.map((item) => {
      total += item.quantity * item.item.price
    })
    setTotalAmt(total)
  },[details])


  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>):void => {
    e.preventDefault()
    setStatus({
      ...status,
      status: e.target.value
    })
  }

   const changeStatus = async():Promise<void> => {
    setLoading(true)
    try {
      const response:AxiosResponse<Response> = await axios.post(import.meta.env.VITE_UPDATE_ORDER_STATUS,status) 
      if(response.status === 200 || response.data.success){
        toast.success("Status changed successfully");
        setLoading(false)
        setOrderStatus(response.data.order.status)
      }
    } catch (error) {
      setLoading(false)
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message || "Could't change status")
      }else{
        toast.error("Could't change status")
      }
    }
  }

  return (
    <div  className='min-w-fit border-[3px] px-6 max-sm:w-full max-sm:px-3 max-md:w-[70%] py-3 flex flex-col gap-10 rounded-lg h-fit border-[#fc4e037b] ' >
        <div className=' flex items-center max-md:w-full flex-col gap-4' >
          {
            details?.items.map((item) => (
              <ProductDetail key={item._id} cart = {true} name={item.item?.name} image= {item.item?.images?.[0]} price={item.item?.price} quantity={item.quantity} />
            ))
          }
        </div>

        <div className=' w-full flex flex-col gap-1 ' >
            <div className='text-md font-semibold' >By: {details.by.name} </div>
            <div className='text-md font-semibold' >Number: {details.by.phoneNumber} </div>
            <hr />
            <details className=' mt-1 mb-2 ' >
              <summary className='font-semibold ' >Address</summary>
                 { details?.deliveryAddress ? <ul>
                   <li className='text-sm ml-4 tracking-wide  font-semibold' >City: Chaarali </li>
                   <li className='text-sm ml-4 tracking-wide font-semibold' >State: Koshi </li>
                   <li className='text-sm ml-4  tracking-wide font-semibold' >Country: Nepal </li>
                 </ul> : "Registered Address" }
            </details>
            <hr />
            <details className=' mt-1 mb-2 ' >
              <summary className='font-semibold ' >Registered Address</summary>
                 <ul>
                   <li className='text-sm ml-4 tracking-wide  font-semibold' >City: {details.by.address.city}</li>
                   <li className='text-sm ml-4 tracking-wide font-semibold' >State: {details.by.address.state} </li>
                   <li className='text-sm ml-4  tracking-wide font-semibold' >Country: {details.by.address.country} </li>
                 </ul>
            </details>
            <hr />
            <details className=' mt-1 mb-2 ' >
              <summary className='font-semibold  ' >Order Details</summary>
                <div className='text-sm ml-4 text-[#202020] font-semibold' >Total: Rs {totalAmt} </div>
                <div className='text-sm ml-4 text-[#202020] font-semibold' >{details.paid ? "Paid" : "Unpaid"} </div>
                <div className='text-sm ml-4 text-[#202020] font-semibold' >Pick Up: {details.pickUp ? "Yes" : "No" } </div>
            </details>
            <hr />
            <div className='text-md text-[#202020] font-semibold mt-1 mb-1 ' >Status: {orderStatus} </div>
            <select onChange={handleChange}  className=' py-1 outline-none text-sm mt-1 mb-1 font-semibold bg-transparent ' >
                <option value="" >Select the status of order</option>
                <option value="delivering">Delivering</option>
                <option value="delivered">Delivered</option>
                <option value="pickedUp">Picked Up</option>
                <option value="cancelled">Cancel</option>
            </select>
            <button disabled ={loading} onClick={changeStatus} className='px-2 py-1 bg-[#a93503] text-white rounded-md font-semibold hover:bg-[#fc4e03] transition ' > {loading ? "Updating..." : "Update"} </button>
        </div>
    </div>
  )
}

export default Card