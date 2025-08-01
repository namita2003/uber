'use client'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(email, password);
        setCaptainData({
            email: email,
            password: password
        })
        console.log(userData);

        setEmail('');
        setPassword('');
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://tse3.mm.bing.net/th/id/OIP.lt49XVuKn_yk4ix5m48XdgHaHa?pid=Api&P=0&h=180" alt="" />
                <form action="" onSubmit={(e) => {
                    // e.preventDefault();
                    submitHandler(e);
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)

                        }}
                        className='bg-[#eeeeee] mb-7 w-full px-4 py-2 border rounded text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />
                    <h3 className='text-lg font-medium mb-2' >Enter Password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-7 w-full px-4 py-2 border rounded text-lg placeholder:text-base'
                        type="password"
                        placeholder='Enter Password'
                    />
                    <button type='submit'
                        className='bg-[#111] text-white font-semibold mb-3 w-full px-4 py-2 rounded text-lg placeholder:text-base'>
                        Login</button>
                    <p className='text-center'>Join a fleet?<Link to='/captain-signup' className='text-blue-600'> Register as a captain</Link></p>
                </form>
            </div>
            <div>
                <Link to='/login'
                    className='bg-[#d5622d] text-white flex items-center justify-center mb-5 font-semibold w-full px-4 py-2 rounded text-lg placeholder:text-base'>
                    Sign in as user</Link>

            </div>
        </div>
    )
}

export default CaptainLogin