'use client'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '/src/context/UserContext.jsx';
const UserSignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [userData, setUserData] = useState({})

    const navigate = useNavigate();
    // Accessing user context
    // This allows us to set the user data after signup
    // so that it can be used in other components
    // like home page or user profile
    // This is important for maintaining user state across the application
    // so that we don't have to fetch user data again and again
    // after signup or login
    // This is a common practice in React applications
    // to use context for managing global state
    // especially for user authentication and profile data
    const { user, setUser } = React.useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault()
        
        const newUser = {
            fullname: {
                firstname: firstname,
                lastname: lastname,
            },
            email: email,
            password: password
        }
        const response = await axios.post(`http://localhost:4000/users/register`, newUser)
        if (response.status === 201) {
            const data = response.data;
            setUser(data.user)
            localStorage.setItem('token', data.token);
            // After successful signup, redirecting to home page
            // This is a common practice in React applications
            // to redirect users to a different page after an action
            // like signup or login
            // This helps in providing a better user experience
            // and allows users to start using the application immediately
            // without having to manually navigate to the home page
            // This is especially useful for applications that have a lot of features
            // and users need to be guided to the main page after signup
            // or login
            // This is a common practice in React applications
            // to use useNavigate hook for navigation
            // This allows us to programmatically navigate to different pages
            // based on user actions or application state
            // This is a powerful feature of React Router
            // that allows us to create dynamic and interactive applications
            // that respond to user actions and application state changes
            // This is especially useful for applications that have a lot of features
            // and users need to be guided to the main page after signup
            navigate('/home');
        }
        setEmail('');
        setFirstname('');
        setLastname('');
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
                    <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
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

                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
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
                        Signup</button>
                    <p className='text-center'>Already have account?<Link to='/login' className='text-blue-600'> Login here</Link></p>
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

export default UserSignUp