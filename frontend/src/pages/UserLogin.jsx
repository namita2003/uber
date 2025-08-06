'use client'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '/src/context/UserContext.jsx';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const oldUser = {
      email: email,
      password: password
    }
    const response = await axios.post(`http://localhost:4000/users/login`, oldUser)
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user)
      localStorage.setItem('token', data.token);
      navigate('/home');
    }
    
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png" alt="" />
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
            <p className='text-center'>New here?<Link to = '/signup' className='text-blue-600'> Create new account</Link></p>
        </form>
      </div>
      <div>
        <Link to='/captain-login'
        className='bg-[#10b461] text-white flex items-center justify-center mb-5 font-semibold w-full px-4 py-2 rounded text-lg placeholder:text-base'>
          Sign in as captain</Link>
        
      </div>
    </div>
  )
}

export default UserLogin;