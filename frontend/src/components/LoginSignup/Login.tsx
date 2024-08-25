import axios, { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

interface data {
    email: string,
    password: string
}
interface fetchedData {
    success: boolean;
    message: string;
}


const Login = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const handleShow = () :void => {
        setShow(!show)
    }

    const [data, setData] = useState <Partial<data>> ({
        email : "",
        password : ""
    })

    const handleData = (e:React.ChangeEvent<HTMLInputElement>) : void => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const validation = ():string | null => {
        if(!data || !data.email || !data.password){
            return  "All fields are required"
        }
        if(data?.email && data?.email.length < 10){
            return "Invalid email"
        }
        if(data?.password && data?.password.length < 8){
            return "Password must be 8 characters long"
        }

        return null
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void> => {

        e.preventDefault()
        
        const validate = validation();
        if(validate){
            toast.error(validate)
            return
        }
        setLoading(true)

        try {
            const response: AxiosResponse<fetchedData> = await axios.post(import.meta.env.VITE_LOGIN, data)
            if (response.status === 200) {
                toast.success("Login Successfull")
                navigate('/products')
            }
            setData({email: "", password: "",})
            setLoading(false)

        } catch (error) {
            setData({email: "", password: "",});
            setLoading(false)
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data?.message || "Couldn't Login")
            }else(
                toast.error("Error occured")
            )
        }
    }
    

  return (
    <div className=' w-[100vw] h-[100vh]  bg-[url("/loginBg.png")] bg-no-repeat bg-cover bg-center' >
        <div className='w-full flex gap-5 justify-center flex-col items-center px-[0.5rem] py-[4rem] h-full backdrop-blur-[20px] ' >
            {/* <div className=' text-3xl font-semibold  ' >Sign In</div> */}
           <div className=' w-[30vw] max-md:w-[40vw] max-sm:w-[50vw] max-xs:w-full flex flex-col px-6 items-center py-5 h-fit shadow-lg bg-[#f5f5f5] rounded-md ' >
            <div className=' text-4xl font-bold text-[#FC4E03] ' >Yumm !</div>
            <form onSubmit={handleSubmit} className=' flex mt-8 gap-5 flex-col w-full ' >

                <div >
                    <label htmlFor='email'  className='text-sm font-semibold tracking-wide ' >Email</label>
                    <input value={data?.email} onChange={handleData} type='email' required autoComplete='email' id='email' name='email' className=' tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-2 ' />
                </div>
                <div>
                    <label htmlFor='password' className='text-sm tracking-wide font-semibold ' >Password</label>
                    <input value={data?.password} onChange={handleData} type= {show ? 'text' : 'password'} required autoComplete='password' id='password' name='password' className=' tracking-widest font-semibold border-b text-[#fc4e03] border-[#fc4e0369] focus:border-[#fc4e03] outline-none bg-transparent w-full py-2 ' />
                    <div className='mt-3 flex items-center gap-2 ' >
                        <input onClick={handleShow} type="checkbox" className='  ' id='checkbox' />
                        <label className='text-sm  font-semibold ' htmlFor="checkbox">Show Password</label>
                    </div>
                </div>


                { loading ? <div className=' mb-4 w-6 h-6 self-center rounded-full border-b-4 border-r-4 border-[#fc4e03] animate-spin'></div>:<button className='bg-[#fc4e03] outline-none py-4 h-[6vh] flex items-center justify-center text-white font-semibold tracking-wide rounded-md shadow-md hover:bg-[#bd3a02] transition shadow-[rgba(128,128,128,0.48)] ' type='submit' > Sign In</button>}

            </form>
                <div className='  mt-2 max-xsm:text-[0.5rem] text-sm max-9:text-[0.7rem] ' >
                    Don't have an account, <Link className='underline font-semibold underline-offset-2' to={"/register"}> Register Now</Link>
                </div>
           </div>
        </div>
    </div>
  )
}

export default Login