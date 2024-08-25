import React, { useEffect } from 'react'
import ProductDetail from './ProductDetail'
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

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

interface Order {
  deliveryAddress: Address | null;
  _id: string;
  by: string;
  items: OrderItem[];
  pickUp: boolean;
  status: string;
  paid: boolean;
}

interface Props {
  order: Order
}

interface Response {
  status: number;
  success: boolean;
  message: string
}

const Card= ({order}:Props) => {
  const [cancelled, setCancelled] = useState<boolean>(false)
  const [deleted, setDeleted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false);

  const CancelOrder = async ():Promise<void> => {
    setLoading(true)
    try {

      const response : AxiosResponse<Response> = await axios.post(import.meta.env.VITE_CANCEL_ORDER, {id: order._id})
      if(response.status === 200 && response.data.success){
        toast.success("Order Cancelled")
        setLoading(false)
        setCancelled(true)
      }
      
    } catch (error) {
      setCancelled(false)
      setLoading(false)
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || "Couldn't cancel order")
      }else{
        toast.error("Couldn't cancel order")
      }
    }
  }
  const DeleteOrder = async():Promise<void> => {
    setLoading(true)
    try {
      const response:AxiosResponse<Response> = await axios.post(import.meta.env.VITE_DELETE_ORDER, {id: order._id})
      if(response.status === 200 && response.data.success ){
        setLoading(false)
        toast.success("Order deleted Successfully!")
        setDeleted(true)
      }
    } catch (error) {
      setLoading(false)
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message || "Couldn't delete order")
      }else{
        toast.error("Couldn't delete order")
      }
    }
  }

  const PerformTask = ():void => {
    if(cancelled || order.status === "cancelled"){
      DeleteOrder()
    }else{
      CancelOrder()
    }
  }

  const [totalAmt, setTotalAmt] = useState<number>(0)

  useEffect(() => {
    let sum = 0
    order?.items?.forEach((item) => {
      sum += item.item?.price * item.quantity
    })
    setTotalAmt(sum)
  },[order])

  return (
    <div  className= {deleted ? 'hidden' : ' w-[60%] flex flex-wrap max-sm:w-full gap-8 justify-around px-6 max-lg:px-2 py-4 h-fit border-[3px] rounded-lg border-[#fc4e037b] ' } >
        <div className=' max-950:w-[100%] max-950:mb-5 max-950:items-center flex flex-col gap-4 max-sm:px-2 max-950:h-fit h-[30vh] overflow-x-hidden px-6 ' >
            {
              order?.items?.map((item) => {
               return <ProductDetail
                  key={item._id} 
                  image = {item.item?.images?.[0]}
                  name = {item.item?.name}
                  price = {item.item?.price}
                  quantity = {item.quantity}
                  cart = {false}
                />
            })
            }
        </div>
        <div className=' max-950:w-[100%] w-[35%] max-950:px-6 max-sm:px-2 max-950:items-center flex flex-col justify-center gap-1 ' >
            <div className='text-md text-[#fc4e03] font-bold' >{order.paid ? "Paid" : "Unpaid" }</div>
            <div className='text-md font-semibold' >Total: {totalAmt} </div>
            <div className='text-md font-semibold' >PickUp: {order.pickUp ? "Yes!" : "No"} </div>
            <div className='text-md font-semibold' >Status: {cancelled ? "Cancelled" : order.status} </div>
            <details>
              <summary className='font-semibold ' >Address</summary>
              { order.deliveryAddress ? <ul> <li className='text-sm font-semibold' >City: {order.deliveryAddress?.city} </li>
              <li className='text-sm font-semibold' >State: {order.deliveryAddress?.state} </li>
              <li className='text-sm font-semibold' >Country: {order.deliveryAddress?.country} </li> </ul> : <p className='text-sm font-semibold' >Registered Address</p> }
            </details>

            <button onClick={PerformTask} disabled ={loading} className='px-2 py-1 w-full bg-[#a93503] text-white rounded-md font-semibold hover:bg-[#fc4e03] transition ' > {loading ? "Processing" : cancelled ? "Delete" : order.status === "cancelled" ? "Delete" : 'Cancel' } </button>
        </div>
    </div>
  )
}

export default Card