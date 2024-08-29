import { useState, useEffect, ChangeEvent } from 'react';
import { RxCross2 } from 'react-icons/rx';
import axios, { AxiosResponse } from 'axios';
import OrderForm from './NewAddressForm';
import toast from 'react-hot-toast';

interface Address {
  city: string;
  state: string;
  country: string;
}
interface OrderItems {
  item: {
    _id: string;
  };
  quantity: number;
}
interface Data {
  items: OrderItems[];
  pickUp: boolean;
  paid: boolean;
  address: Address | null;
}

interface Items {
  item: {
    name: string;
    images: [string];
    price: number;
    _id: string;
  };
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

interface Props {
  setShow: () => void;
}

interface OrderResponse {
  status: number;
  success: boolean;
  message: string;
}

const PlaceOrderPage = ({ setShow }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [newAddress, setNewAddress] = useState<boolean>(false);

  const [data, setData] = useState<Data>({
    items: [],
    pickUp: false,
    paid: false,
    address: null,
  });

  const fetchCartDetails = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Response> = await axios.get(import.meta.env.VITE_GET_CART_DETAILS);
      if (response.status === 200 && response.data.success) {
        setProducts(response.data.products);
        const orderItems: OrderItems[] = response.data.products.cart.map((product) => ({
          item: { _id: product.item._id },
          quantity: product.quantity,
        }));
        setData((prevData) => ({ ...prevData, items: orderItems }));
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

  useEffect(() => {
    if (products?.cart) {
      const calculatedTotal = products.cart.reduce((sum, product) => {
        return sum + product.item.price * product.quantity;
      }, 0);
      setTotal(calculatedTotal);
    }
  }, [products]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    // Check if the event target is an input element
    if (e.target instanceof HTMLInputElement) {
      const { name, type, checked} = e.target;
  
      if (type === 'checkbox') {
        if (name === 'pickUp') {
          setData({ ...data, pickUp: checked });
        } else if (name === 'newAddress') {
          setNewAddress(checked);
          if (checked && !data.address) {
            setData({ ...data, address: { city: '', state: '', country: '' } });
          }
        }
      }
    } else {
      const { name, value } = e.target;
      if (newAddress && data.address) {
        setData({
          ...data,
          address: {
            ...data.address,
            [name]: value,
          },
        });
      }
    }
  };
  

  const dataValidations = (data: Data, newAddress: boolean): string | Data => {
    if (!data.items || data.items.length === 0) {
      return 'Cannot place order, No items available';
    }

    if (data.pickUp && data.address) {
      return 'pickUp is selected, Address not needed';
    }

    if (!data.pickUp && !newAddress) {
      return data;
    }

    if (newAddress && data.pickUp) {
      return 'Choose either pickUp or provide a new address';
    }

    if (newAddress && !data.pickUp) {
      if (!data.address?.city) {
        return 'Please select a city';
      } else if (!data.address?.state) {
        return 'Please select a state';
      } else if (!data.address?.country) {
        return 'Please select a country';
      }
    }

    return data;
  };

  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const placeOrder = async (): Promise<void> => {
    setOrderLoading(true);

    const validatedData = dataValidations(data, newAddress);
    if (typeof validatedData === 'string') {
      setOrderLoading(false);
      toast.error(validatedData);
      return;
    }
    try {
      const response: AxiosResponse<OrderResponse> = await axios.post(import.meta.env.VITE_ADD_ORDER, validatedData);
      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
      }
      setOrderLoading(false)
      setNewAddress(false);
      setData({
        items: [],
        pickUp: false,
        paid: false,
        address: null,
      });
    } catch (error) {
      setOrderLoading(false);
      setNewAddress(false);
      setData({
        items: [],
        pickUp: false,
        paid: false,
        address: null,
      });
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Couldn't place order");
      } else {
        toast.error("Couldn't place order");
      }
    }
  };


  return (
    <div className="w-[100vw] min-h-[100vh] bg-[#00000019] py-[2rem] max-xs:px-[1rem] absolute top-0 flex justify-center px-[2rem] z-10 backdrop-blur-xl">
      <div className="w-[60%] h-fit max-md:w-[70%] max-sm:w-[85%] flex flex-col gap-10 max-xs:w-full">
        <div
          onClick={setShow}
          className="w-[5vh] h-[5vh] rounded-full bg-[#fc4e03] transition flex items-center justify-center self-end hover:bg-[#bb3901]"
        >
          <RxCross2 className="text-white text-2xl" />
        </div>
        <h1 className="text-2xl self-center text-[#fc4e03] font-semibold">Place Order</h1>
        {loading ? (
          <div className="flex w-10 h-10 rounded-full border-b-4 border-r-4 border-[#fc4e03] animate-spin "></div>
        ) : err ? (
          <div className="text-red-500 text-center">{err}</div>
        ) : (
          <div className="flex flex-col gap-4">
            {products?.cart.map((product) => (
              <div key={product._id} className="flex gap-8 max-xsm:gap-4 items-center">
                <img
                  src={product.item.images?.[0]}
                  loading="lazy"
                  alt={product.item.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <h2 className="text-lg max-xs:text-base font-semibold">{product.item.name}</h2>
                    <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                  </div>
                  <p className="font-semibold">Rs. {(product.item.price * product.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t mt-4">
              <h2 className="text-lg font-semibold">Total:</h2>
              <p className="text-lg font-semibold">Rs. {total.toFixed(2)}</p>
            </div>
            <OrderForm data={data} newAddress={newAddress} handleChange={handleChange} />
            <button
              className="w-full bg-[#fc4e03] text-white py-2 px-4 mt-6 rounded-md transition hover:bg-[#bb3901] focus:outline-none focus:shadow-outline"
              type="button"
              onClick={placeOrder}
              disabled={orderLoading}
            >
              {orderLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrderPage;
