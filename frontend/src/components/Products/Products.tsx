import { useState, useEffect, Suspense, lazy } from 'react';
import { getProducts } from "../../utils/getProductApi";
import Skeleton from "../../DaisyComponents/Skeleton";

const ProductCard = lazy(() => import("./ProductCard") )

interface Product {
  _id: string;
  name: string;
  price: number;
  images: [string];
}

const Products = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    const result = await getProducts();
    if (typeof result === 'string') {
      setError(result);
    } else {
      setProducts(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="px-5 min-h-[80vh] max-sm:px-2 py-5">
      {loading ? (
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2">
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[90vh]">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2">
          {products.map((product) => (
            <Suspense key={product._id} fallback={<Skeleton/>}>
              <ProductCard
                id={product._id}
                name={product.name}
                price={product.price}
                images={product.images}
             />
            </Suspense>
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

export default Products;
