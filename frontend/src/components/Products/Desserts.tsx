import {useState, useEffect} from 'react'
import ProductCard from './ProductCard'
import { getProducts } from '../../utils/getProductApi'
import Skeleton from '../../DaisyComponents/Skeleton'

interface Product{
  _id:string,
  category:string,
  name:string,
  price: number,
  images: [string]
}


const Desserts = () => {

  const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)
   const [products, setProducts] = useState<Product[]>([])

   const fetchProducts= async () => {
     setLoading(true)
     const result = await getProducts()
     if(typeof result === 'string') {
       setError(result)
     }else{
       const filteredProducts = result.filter(product => product.category === "Dessert")
       setProducts(filteredProducts)
     }
     setLoading(false)
   }

   useEffect(() => {
    fetchProducts()
   }, [])

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
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              images={product.images}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[90vh]">
          <div className="text-2xl font-semibold">No products available</div>
        </div>
      )}
    </div>
  )
}

export default Desserts