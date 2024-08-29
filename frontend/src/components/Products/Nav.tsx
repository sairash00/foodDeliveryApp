import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className=' flex justify-center gap-10 w-full border-b py-2 ' >
        <Link to={"/products"} className=' focus:text-[gray] flex flex-col hover:text-[gray] transition-all items-center w-fit justify-center ' >
            <div className=' w-12 h-12 shadow-md  rounded-full border bg-[url("/all.jpg")] bg-cover bg-no-repeat bg-center overflow-hidden ' ></div>
            <div className='text-sm font-semibold ' >All</div>
        </Link>

        <Link to ={"/products/foods"} className=' focus:text-[gray] flex flex-col hover:text-[gray] transition-all items-center w-fit justify-center ' >
            <div className=' w-12 h-12 shadow-md  rounded-full border bg-[url("/foods.jpg")] bg-cover bg-no-repeat bg-center overflow-hidden ' ></div>
            <div className='text-sm font-semibold ' >Foods</div>
        </Link>

        <Link to = {"/products/drinks"} className=' focus:text-[gray] flex flex-col hover:text-[gray] transition-all items-center w-fit justify-center ' >
            <div className=' w-12 h-12 shadow-md  rounded-full border bg-[url("/drinks.jpg")] bg-cover bg-no-repeat bg-center overflow-hidden ' ></div>
            <div className='text-sm font-semibold ' >Drinks</div>
        </Link>

        <Link to ={"/products/desserts"} className=' focus:text-[gray] flex flex-col hover:text-[gray] transition-all items-center w-fit justify-center ' >
            <div className=' w-12 h-12 shadow-md  rounded-full border bg-[url("/desserts.jpg")] bg-cover bg-no-repeat bg-center overflow-hidden ' ></div>
            <div className='text-sm font-semibold ' >Desserts</div>
        </Link>


    </div>
  )
}

export default Nav