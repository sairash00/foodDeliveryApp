import{ useEffect, useState } from 'react';
import Card from './Card';
import axios, { AxiosResponse } from 'axios';

interface ItemDetails {
  _id: string;
  name: string;
  price: number;
  images: [string];
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
  by: {
    name: string;
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

interface OrdersResponse {
  success: boolean;
  message: string;
  orders: Order[];
}

const Orders = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const getAllOrders = async (): Promise<void> => {
    setLoading(true);
    setErr(null); 
    try {
      const response: AxiosResponse<OrdersResponse> = await axios.get(import.meta.env.VITE_GET_ALL_ORDERS);
      if (response.status === 200 && response.data.success) {
        setOrders(response.data.orders);
      } else {
        setErr(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErr(error.response?.data.message || 'Something went wrong');
      } else {
        setErr('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[80vh] justify-center items-center py-10">
        <p className="text-lg font-semibold text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="flex min-h-[80vh] justify-center items-center py-10">
        <p className="text-lg font-semibold text-red-500">{err}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex  min-h-[80vh] justify-center items-center py-10">
        <p className="text-lg font-semibold text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="px-[2rem] max-sm:px-[1rem] max-xs:px-[0.7rem] justify-center py-10 gap-8 flex flex-wrap">
      {orders.map((item) => (
        <Card key={item._id} details={item} />
      ))}
    </div>
  );
};

export default Orders;
