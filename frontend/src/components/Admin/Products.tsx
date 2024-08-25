import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios, { AxiosResponse } from 'axios';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  images: [string];
}

interface ApiResponse {
  status: number;
  success: boolean;
  message: string;
  products: Product[];
}

const Product = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProducts = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(import.meta.env.VITE_GET_PRODUCTS);
      if (response.status === 200 && response.data.success) {
        setProducts(response.data.products);
        setError(null); // Clear any previous errors
      } else {
        setError(response.data.message || 'Failed to fetch products');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'Network Error');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="justify-center py-8 flex gap-6 max-sm:gap-5 w-[100%] flex-wrap">
      {loading ? (
        <div className="text-center w-10 h-10 border-b-4 border-r-4 animate-spin rounded-full border-[#fc4e03] "></div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center">No Products Found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
