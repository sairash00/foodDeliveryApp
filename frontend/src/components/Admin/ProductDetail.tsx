
interface Props {
    image:string,
    name:string,
    price:number,
    quantity:number,
    cart: boolean
}

const ProductDetail =(props:Props) => {
  return (
    <div className=' w-fit px-2  min-h-[10vh] py-1 gap-8 max-sm:gap-4 max-sm:w-full max-sm:justify-center border-b flex items-center border-[#fc4e03a4] ' >
        <div className='w-10 h-10 rounded-md border overflow-hidden'>
          <img
            className='object-cover w-full h-full'
            loading='lazy'
            src={props.image}
            alt={props.name}
          />
       </div>
        <div className=' max-xs:text-[0.7rem] max-sm:text-sm  font-bold ' > {props.name} </div>
        <div className=' max-xs:text-[0.7rem] max-sm:text-sm text-sm font-semibold ' >Rs. {props.price * props.quantity}</div>
        <div className=' max-xs:text-[0.7rem] max-sm:text-sm text-sm font-semibold ' >Qty. {props.quantity}</div>
        {/* <AiOutlineDelete className=' text-xl text-red-700 hover:scale-[1.1] hover:text-red-800 transition ' /> */}
    </div>
  )
}

export default ProductDetail