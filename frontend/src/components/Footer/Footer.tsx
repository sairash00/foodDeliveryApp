import React from 'react'
import { FaGithub, FaInstagram} from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className=' text-[#e4e3e3] px-[4rem] flex flex-col gap-5 justify-center items-center w-full mt-10 h-[50vh] bg-black ' >
        <div className=' text-4xl font-bold ' >Yumm !</div>
        <div className='flex text-center flex-col gap-1' >
            <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRttWSdCSfDRcmxKHhXTDzszmNfGMWXcHcqxgcVNLJVQhPDtLZnMgLlFNsjklpwLgRkHrmQ" target='_blank' className=' font-semibold tracking-wide' >Sairash7248@gmail.com</a>
            <a href='tel:+9779825920250' target='_blank' className=' font-semibold tracking-wide ' >(+977) 9825920250 </a>
        </div>
        <div className='flex gap-2' >
            <a href="http://linkedin.com/in/sairash-khatiwada" target="_blank"> <FaLinkedin  className=' text-xl hover:scale-[1.2] transition ' /> </a>
            <a href="http://instagram.com/sairash_Khatiwada" target="_blank"> <FaInstagram  className=' text-xl hover:scale-[1.2] transition   ' /> </a>
            <a href="http://github.com/sairash00" target="_blank"> <FaGithub className=' text-xl hover:scale-[1.2] transition   '  /> </a>
        </div>
    </div>
  )
}

export default Footer