import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import ProductDetail from './ProductDetail';
import PlaceOrderPage from './PlaceOrder';

interface Items {
  item:{
    name: string,
    images: [string],
    price: number
  },
  quantity: number;
  _id: string;
}
interface Product {
  cart: Items[] | [];
  _id: string;
}

interface Response {
  status: number;
  success: boolean;
  products: Product;
}

const Cart: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false)

  const fetchCartDetails = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Response> = await axios.get(import.meta.env.VITE_GET_CART_DETAILS);
      if (response.status === 200 && response.data.success) {
        setProducts(response.data.products);
      } else {
        setErr('Failed to fetch cart details');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErr(error.response?.data?.message || 'Something went wrong!');
      } else {
        setErr('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);


  const placeOrder = ():void => {
    setShow(!show)
  }

  return (
    <div className='w-[100vw] h-[100vh] relative ' >
      { show ? <PlaceOrderPage setShow = {placeOrder} /> : null}
      <div className='w-full gap-10  min-h-[62vh] px-[2rem] pt-10 flex justify-around items-start flex-wrap'>
        {loading ? (
          <div className='w-8 h-8 rounded-full self-center border-b-2 border-r-2 border-[#fc4e03] animate-spin'></div>
        ) : err ? (
          <div className='text-xl font-semibold self-center text-red-500'>{err}</div>
        ) : products && products.cart && products.cart.length > 0 ? (
          products.cart.map((product, index) => {
            let total:number = 0;
            total = total + product.item?.price * product.quantity;
            return <ProductDetail
              key={index}  
              cart={true}
              name={product.item?.name}
              id ={product._id}
              image={product.item?.images?.[0]}
              price={total}
              quantity={product.quantity}
            />
          })
        ) : (
          <div className='text-xl  self-center'>Cart is Empty</div>
        )}
        {products?.cart && products.cart.length > 0 ?<button onClick={placeOrder} className=' fixed  bottom-2 px-3 py-2 rounded-md text-[#000] bg-[#0000001d] hover:text-white backdrop-blur-[6px] hover:bg-[#000000] transition font-semibold ' >Place Order </button> : <></>}
      </div>
    </div>
  );
};

export default Cart;
