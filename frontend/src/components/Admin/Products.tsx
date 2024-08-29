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
    <div className="px-5 min-h-[80vh] max-sm:px-2 py-5">
      {loading ? (
        <div className="flex items-center justify-center min-h-[90vh]">
          <div className="w-10 h-10 animate-spin rounded-full border-b-4 border-r-4 border-[#fc4e03]"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[90vh]">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[90vh]">
          <div className="text-2xl font-semibold">No products available</div>
        </div>
      )}
    </div>
  );
};

export default Product;
