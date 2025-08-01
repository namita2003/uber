'use client'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainSignUp = () => {
        const [email, setEmail] = useState('')
            const [password, setPassword] = useState('')
            const [firstname, setFirstname] = useState('')
            const [lastname, setLastname] = useState('')
            const [captainData, setCaptainData] = useState({})
            const submitHandler = (e) => {
                e.preventDefault()
                
        
                setCaptainData({
                    fullname: {
                        firstName: firstname,
                        lastname: lastname,
                    },
                    email: email,
                    password: password
                })
                
        
                setEmail('');
                setFirstname('');
                setLastname('');
                setPassword('');
        
            }
    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://tse3.mm.bing.net/th/id/OIP.lt49XVuKn_yk4ix5m48XdgHaHa?pid=Api&P=0&h=180" alt="" />
                <form action="" onSubmit={(e) => {
                    // e.preventDefault();
                    submitHandler(e);
                }}>
                    <h3 className='text-lg w-full font-medium mb-2'>What's our captain's name</h3>
                    <div className='flex gap-4 mb-6'>
                        <input
                            required
                            value={firstname}
                            onChange={(e) => {
                                setFirstname(e.target.value)
                            }}
                            className='bg-[#eeeeee] w-1/2 px-4 py-2 border rounded text-lg placeholder:text-base'
                            type="text"
                            placeholder='type your firstname'
                        />
                        <input
                            required
                            value={lastname}
                            onChange={(e) => {
                                setLastname(e.target.value)
                            }}
                            className='bg-[#eeeeee] w-1/2 px-4 py-2 border rounded text-lg placeholder:text-base'
                            type="text"
                            placeholder='type your lastname'
                        />
                    </div>

                    <h3 className='text-lg font-medium mb-2'>What's our captain's email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-6 w-full px-4 py-2 border rounded text-lg placeholder:text-base'
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
                        className='bg-[#eeeeee] mb-6 w-full px-4 py-2 border rounded text-lg placeholder:text-base'
                        type="password"
                        placeholder='Enter Password'
                    />
                    <button type='submit'
                        className='bg-[#111] text-white font-semibold mb-3 w-full px-4 py-2 rounded text-lg placeholder:text-base'>
                        Login</button>
                    <p className='text-center'>Already have account?<Link to='/captain-login' className='text-blue-600'> Login as a captain.</Link></p>
                </form>
            </div>
            <div>
                <p className='text-[8px] font-serif leading-tight'>
                    The site is protected by reCAPTCHA and the Google <span className='text-blue-600'>Privacy Policy</span> and <span className='text-blue-600'>Terms of Service</span> apply.
                </p>

            </div>
        </div>
    )
}

export default CaptainSignUp