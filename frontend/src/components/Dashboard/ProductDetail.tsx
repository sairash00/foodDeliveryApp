import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import axios, { AxiosResponse } from 'axios';

interface Props {
  image: string;
  name: string;
  price: number;
  quantity: number;
  cart: boolean;
  id: string;
}
 
interface Response {
  status: number;
  success: boolean;
  message: string;
}

const ProductDetail = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);

  const deleteProductFromCart = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Response> = await axios.post(import.meta.env.VITE_REMOVE_FROM_CART, {id:props.id});
      if (response.data.success) {
        setLoading(false);
        setRemove(true);
        toast.success("Product removed from cart");
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Couldn't remove product");
      } else {
        toast.error("Couldn't remove product");
      }
    }
  };

  return (
    <div className={remove ? 'hidden' : 'w-fit px-2 min-h-[10vh] py-1 gap-8 max-sm:gap-4 max-sm:w-full max-sm:justify-center border-b flex items-center border-[#fc4e03a4]'}>
      <div className='w-10 h-10 rounded-md border overflow-hidden'>
        <img
          className='object-cover w-full h-full'
          loading='lazy'
          src={props.image}
          alt={props.name}
        />
      </div>
      <div className='max-xs:text-[0.7rem] max-sm:text-sm text-[#fc4e03] font-bold'>{props.name}</div>
      <div className='max-xs:text-[0.7rem] max-sm:text-sm text-sm font-semibold'>Rs. {props.price}</div>
      <div className='max-xs:text-[0.7rem] max-sm:text-sm text-sm font-semibold'>Qty. {props.quantity}</div>
      {props.cart && (
        loading ? (
          <div className='w-5 h-5 border-b-2 border-r-2 border-[#fc4e03] rounded-full animate-spin'></div>
        ) : (
          <AiOutlineDelete onClick={deleteProductFromCart} className='text-xl text-red-700 hover:scale-[1.1] hover:text-red-800 transition cursor-pointer' />
        )
      )}
    </div>
  );
};

export default ProductDetail;
