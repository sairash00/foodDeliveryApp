import axios, { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

interface data {
    name: string,
    email: string,
    password: string,
    phone: string,
    country: string,
    city: string,
    state: string
}
interface VerifiedData {
    name: string,
    email: string,
    password: string,
    phoneNumber: number,
    address:{
        country: string,
        city: string,
        state: string
    }
}

interface Response {
    success: boolean,
    message: string,
}

const Register = () => {

    const [show, setShow] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleShow = () :void => {
        setShow(!show)
    }

    const [data, setData] = useState<Partial<data>>({
        name: '',
        email: '',
        password: '',
        phone: "" ,
        country: 'Nepal',
        city: 'Chaarali',
        state: 'Koshi'
    })
    const handleData = (e:React.ChangeEvent<HTMLInputElement>) : void => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const dataValidations = ():string | VerifiedData => {

        if(!data.name || !data.email || !data.password || !data.phone || !data.country || !data.state || !data.city){
            return "All fields are required"
        }

        if(data.email.length < 10){
            return "Please enter a valid email address"
        }

        if(data.password.length < 8){
            return "Password must be 8 characters"
        }

        if(data.phone.length < 10 || data.phone.length > 10 ){
            return "Invalid Phone Number"
        }

        const number = parseInt(data.phone)

        const verifiedData= {
            name: data.name,
            email: data.email,
            password: data.password,
            phoneNumber: number,
            address:{
                country: data.country,
                city: data.city,
                state: data.state
            }
            
        }

        return verifiedData;
    }
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        const verifiedData = dataValidations();
        if(typeof verifiedData ==='string'){
            toast.error(verifiedData)
            return
        }
        setLoading(true)

        try {
            
            const response:AxiosResponse<Response> = await axios.post(import.meta.env.VITE_REGISTER, verifiedData);
            if(response.status === 200){
                toast.success("Registration Successfull")
                navigate("/products")
            }
            setData({
                name: '',
                email: '',
                password: '',
                phone: "",
                country: 'Nepal',
                city: 'Chaarali',
                state: 'Koshi'
            })
            setLoading(false)

        } catch (error) {
            setData({
                name: '',
                email: '',
                password: '',
                phone: "",
                country: 'Nepal',
                city: 'Chaarali',
                state: 'Koshi'
            })
            setLoading(false)
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data?.message || "Registration Failed" )
            }else{
                toast.error("Couldn't register User")
            }
        }
    }

  return (
    <div className=' w-[100vw] h-[100vh] bg-[url("/loginBg.png")] bg-no-repeat bg-cover bg-center' >
        <div className='w-full flex gap-5 justify-center flex-col px-[.5rem] items-center py-[4rem] h-full backdrop-blur-[20px] ' >
            {/* <div className=' text-3xl font-semibold  ' >Sign In</div> */}
           <div className=' w-[30vw] max-md:w-[40vw] max-sm:w-[50vw] max-xs:w-full flex flex-col px-6 items-center py-5 h-[75vh] overflow-x-auto shadow-lg bg-[#f5f5f5] rounded-md ' >
            <div className=' text-4xl font-bold text-[#FC4E03] ' >Yumm !</div>
            <form onSubmit={handleSubmit} className=' flex mt-8 gap-5 flex-col w-full ' >
                
                <div >
                    <label htmlFor='fullname'  className='text-sm font-semibold tracking-wide ' >Full Name</label>
                    <input type='text' value={data.name} onChange={handleData} required autoComplete='FullName' id='fullname' name='name' className=' tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-2 ' />
                </div>

                <div >
                    <label htmlFor='email'  className='text-sm font-semibold tracking-wide ' >Email</label>
                    <input type='email' value={data.email} onChange={handleData} required autoComplete='email' id='email' name='email' className=' tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-2 ' />
                </div>

                <div>
                    <label htmlFor='password' className='text-sm tracking-wide font-semibold ' >Password</label>
                    <input type= {show ? 'text' : 'password'} value={data.password} onChange={handleData} required autoComplete='password' id='password' name='password' className=' tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-2 ' />
                    <div className='mt-3 mb-2 flex items-center gap-2 ' >
                        <input onClick={handleShow} type="checkbox" className='  ' id='checkbox' />
                        <label className='text-sm' htmlFor="checkbox">Show Password</label>
                    </div>
                </div>

                <div >
                    <label htmlFor='phone'  className='text-sm font-semibold tracking-wide ' >Phone Number</label>
                    <input type='number' value={data.phone} onChange={handleData} required autoComplete='PhoneNumber' id='phone' name='phone' className=' tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-2 ' />
                </div>

                <div className='flex flex-col gap-2 mb-2 ' >
                    <label htmlFor='country'  className='text-sm font-semibold tracking-wide ' >Country</label>
                    <select  className='outline-none text-sm font-semibold bg-transparent ' >
                        <option   value="Nepal">Nepal</option>
                    </select>
                </div>
                
                <div className='flex flex-col gap-2 mb-2 '  >
                    <label htmlFor='province' className='text-sm font-semibold tracking-wide ' >Province</label>
                    <select  className='outline-none text-sm font-semibold bg-transparent ' id='province' >
                        <option   value="Koshi">Koshi</option>
                    </select>
                </div>

                <div className='flex flex-col gap-2 mb-2 ' >
                    <label htmlFor='city'  className='text-sm  font-semibold tracking-wide ' >City</label>
                    <select id='city' className='outline-none text-sm font-semibold bg-transparent ' >
                        <option   value="Chaarali">Chaarali</option>
                    </select>
                </div>

                {/* <div >
                    <label htmlFor='Street'  className='text-sm font-semibold tracking-wide ' >Street</label>
                    <input type='text' value={data.street} onChange={handleData} required autoComplete='street' id='street' name='street' className=' tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-2 ' />
                </div> */}
                
                { loading ? <div className=' mb-4 w-6 h-6 self-center rounded-full border-b-4 border-r-4 border-[#fc4e03] animate-spin'></div>:<button className='bg-[#fc4e03] outline-none py-4 h-[6vh] flex items-center justify-center text-white font-semibold tracking-wide rounded-md shadow-md hover:bg-[#bd3a02] transition shadow-[rgba(128,128,128,0.48)] ' type='submit' >Register</button>}

            </form>
                <div className='  mt-2 max-xsm:text-[0.5rem] text-sm max-9:text-[0.7rem] ' >
                    Already have an account, <Link className='underline font-semibold underline-offset-2' to={"/login"}> Login</Link>
                </div>
           </div>
        </div>
    </div>
  )
}

export default Register