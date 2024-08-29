import {useState, useEffect} from 'react'
import ProductCard from './ProductCard'
import { getProducts } from '../../utils/getProductApi'

interface Product{
  _id:string,
  category:string,
  name:string,
  price: number,
  images: [string]
}


const Foods = () => {
  const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)
   const [products, setProducts] = useState<Product[]>([])

   const fetchProducts= async () => {
     setLoading(true)
     const result = await getProducts()
     if(typeof result === 'string') {
       setError(result)
     }else{
       const filteredProducts = result.filter(product => product.category === "Food")
       setProducts(filteredProducts)
     }
     setLoading(false)
   }

   useEffect(() => {
    fetchProducts()
   }, [])


  return (
    <div className="justify-center min-h-[70vh] py-8 flex gap-6 max-sm:gap-5 w-full flex-wrap">
      {loading ? (
        <div className="w-10 h-10 self-center animate-spin rounded-full border-b-4 border-r-4 border-[#fc4e03] " ></div>
      ) : error ? (
        <div className="text-red-500 text-xl self-center ">{error}</div>
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} id={product._id} name={product.name} price={product.price} images={product.images} />
        ))
      ) : (
        <div className=" self-center text-2xl font-semibold " >No products available</div>
      )}
    </div>
  )
}

export default Foods