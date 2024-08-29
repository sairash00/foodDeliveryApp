import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Card from './Card';

interface ItemDetails {
  _id: string;
  name: string;
  price: number;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserOrders {
  _id: string;
  orders: Order[];
}

interface OrdersResponse {
  success: boolean;
  message: string;
  orders: UserOrders;
}

const Order = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<UserOrders | null>(null);

  const getUserOrders = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<OrdersResponse> = await axios.get(import.meta.env.VITE_GET_USER_ORDER);
      if (response.status === 200 && response.data.success) {
        setOrderDetails(response.data.orders);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErr(error.response?.data?.message || 'Something went wrong');
      } else {
        setErr('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className='w-full gap-6 min-h-[62vh] px-[1rem] pt-10 flex flex-col items-center'>
      {loading && <p>Loading...</p>}
      {err && <p className="text-red-500">{err}</p>}
      {orderDetails?.orders?.length === 0 && !loading && <p>No orders found</p>}
      {orderDetails?.orders?.map((order) => (
        <Card key={order._id} order={order} />
      ))}
    </div>
  );
};

export default Order;
