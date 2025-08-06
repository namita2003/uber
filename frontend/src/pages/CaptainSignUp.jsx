'use client'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/captainContext.jsx';
import axios from 'axios';
const CaptainSignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    //const [captainData, setCaptainData] = useState({})
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const navigate = useNavigate();
    const { captain, setCaptain } = React.useContext(CaptainDataContext);
    const submitHandler = async (e) => {
        e.preventDefault()


        const captainData = {
            fullname: {
                firstname: firstname,
                lastname: lastname,
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plateNumber: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        }
        const response = await axios.post(`http://localhost:4000/captains/register`, captainData)
        if (response.status === 201) {
            const data = response.data;
            setCaptain(data.captain)
            localStorage.setItem('token', data.token);
            navigate('/captainHome');
        }


        setEmail('');
        setFirstname('');
        setLastname('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');

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
                    <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
                    <div className='flex gap-4 mb-6'>
                        <input
                            required
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                            className='bg-[#eeeeee] w-1/3 px-4 py-2 border rounded text-lg placeholder:text-base'
                            type="text"
                            placeholder='Color'
                        />
                        <input
                            required
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                            className='bg-[#eeeeee] w-1/3 px-4 py-2 border rounded text-lg placeholder:text-base'
                            type="text"
                            placeholder='Plate'
                        />
                        <input
                            required
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                            className='bg-[#eeeeee] w-1/3 px-4 py-2 border rounded text-lg placeholder:text-base'
                            type="number"
                            min="1"
                            placeholder='Capacity'
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-lg font-medium mb-2'>Vehicle Type</label>
                        <select
                            required
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className='bg-[#eeeeee] w-full px-4 py-2 border rounded text-lg'
                        >
                            <option value="" disabled>Select vehicle type</option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="bike">Bike</option>
                        </select>
                    </div>
                    <button type='submit'
                        className='bg-[#111] text-white font-semibold mb-3 w-full px-4 py-2 rounded text-lg placeholder:text-base'>
                        Captain Signup</button>
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