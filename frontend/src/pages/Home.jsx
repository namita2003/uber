import { Link } from 'react-router-dom'
import React from 'react'

const home = () => {
    return (
        <div className='h-screen bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] pt-8 flex justify-between flex-col w-full bg-red-400 '>
            <img className='w-16 ml-8' src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png" alt="" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-[30px] font-semibold'>Get Started With Uber</h2>
                <Link to ='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
            </div>
        </div>
    )
}

export default home