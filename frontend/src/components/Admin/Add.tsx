import axios, { AxiosResponse } from 'axios'
import React, { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { FaImage } from 'react-icons/fa6'

interface Data {
  name: string,
  price: string,
  category: string,
  image: File | null
}

// interface ValidatedData {
//   name: string,
//   price: string,
//   category: string,
//   image: File
// }

interface Response {
  status: number,
  success: boolean,
  message: string
}
const Add = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Data>({
    name: "",
    price: "",
    category: "",
    image:null
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
      const {name, value, files} = e.target
     
      if(name !== "image"){
        setData({
          ...data,
          [name]: value
        })
      }else if(files && files.length > 0){
        setData({
          ...data,
          image: files[0]
        })
      }
 
  }

  const validateData = ():string | Data => {


    if(!data.name || data.name.length < 3){
      setLoading(false)
      return "Name must be at least 3 characters"
    }else if(data.price === "" || !data.price){
      setLoading(false)
      return "Invalid Price"
    }else if(!data.category ){
      setLoading(false)
      return "Please select a category"
    }else if(data.category !== "Food" && data.category !== "Drinks" && data.category !== "Dessert")  {
      setLoading(false)
      return "Invalid Category"
    }

    const validatedData = {
      name: data.name,
      price: data.price,
      category:data.category,
      image: data.image
    }

    return validatedData

    }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void> => {
    setLoading(true)
    e.preventDefault()
    const validatedData = validateData()
    if(typeof validatedData === "string"){
      toast.error(validatedData)
      return
    }

    const formData = new FormData();
      formData.append('name', validatedData.name);
      formData.append('price', validatedData.price);
      formData.append('category', validatedData.category);
      formData.append('image', validatedData.image as File );
     

    try {
      const response:AxiosResponse<Response> = await axios.post(import.meta.env.VITE_ADD_PRODUCT, formData)
      if(response.data.success && response.status === 200){
        setLoading(false)
        toast.success("Product added successfully")
        setData({
          name: "",
          price: "",
          category: "",
          image: null
        })
      }
    } catch (error) {
      setLoading(false)
      setData({
        name: "",
        price: "",
        category: "",
        image: null
      })
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message || "Couldn't add product. " ) 
      }else{
        toast.error("Couldn't add product")
      }
    }

  }

  return (
    <div className=' w-full flex items-center justify-center py-10 px-[1rem]' >
        <div className='flex flex-col border border-[#fc4e03] gap-8 px-4 py-3 max-9:w-[70%] max-sm:w-full max-md:w-[80%] shadow-lg rounded-md w-[50%] min-h-[70vh] ' >
            <div className='text-2xl max-sm:text-xl text-center font-semibold text-[#fc4e03] ' >Add Products</div>
            <form encType='multipart/form-data ' onSubmit={handleSubmit} className='flex flex-col gap-5 ' >
                <div >
                  <label htmlFor='name'  className='text-sm font-semibold tracking-wide ' >Name *</label>
                  <input value={data.name}  onChange={handleChange} type='text' required autoComplete='Name' id='name' name='name' className=' tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-1 ' />
                </div>
                <div >
                  <label htmlFor='price'  className='text-sm font-semibold tracking-wide ' >Price *</label>
                  <input value={data.price} onChange={handleChange} type='number' required autoComplete='price' id='price' name='price' className=' tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-1 ' />
                </div>
                <div className='flex flex-col gap-2 mb-2 ' >
                    <label htmlFor='category'  className='text-sm font-semibold tracking-wide ' >Category *</label>
                    <select name='category' onChange={handleChange} id='category' required className='outline-none text-sm font-semibold bg-transparent ' >
                        <option value="">Select category</option>
                        <option value="Food">Foods</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Dessert">Dessert</option>
                    </select>
                </div>
                <label htmlFor='image' className=' w-full h-[15vh] border border-[#00000059] rounded-md flex items-center justify-center flex-col ' >
                  <label htmlFor='image'  className='text-lg flex flex-col items-center hover:text-[gray] transition font-semibold tracking-wide ' > <FaImage/> <div className='text-sm font-normal ' >Add Image</div> </label>
                  <input type='file' disabled = {data.image} name ='image' onChange={handleChange} required id='image' className=' sr-only tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-1 ' />
                  <p className='text-sm font-semibold' >{data.image ? data.image.name : ""}</p>
                </label>
                <button disabled ={loading} type='submit' className='w-full py-2 bg-[#fc4e03] rounded-md text-white font-semibold transition-all hover:bg-[#bd3a02]' >{loading? "Adding..." : "Add"}</button>
            </form>
        </div>
    </div>
  )
}

export default Add