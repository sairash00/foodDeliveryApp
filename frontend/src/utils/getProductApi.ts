import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: [string];
}

interface Response {
  success: boolean;
  message: string;
  products: Product[];
}

export const getProducts = async (): Promise<Product[] | string> => {
  try {
    const response = await axios.get<Response>(import.meta.env.VITE_GET_PRODUCTS);
    return response.data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || "An error occurred";
    }
    return "An unexpected error occurred";
  }
};
