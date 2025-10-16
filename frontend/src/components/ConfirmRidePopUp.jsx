import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [OTP, setOTP] = useState('')
    const submitHandler=(e)=>{
        e.preventDefault();
    }
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0 w-[93%] ' onClick={() => {
                props.setConfirmRidePopUpPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>
            <div className='flex items-center justify-between p-3 bg-purple-400 rounded-lg mt-4 '>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://c2.staticflickr.com/6/5252/5403292396_0804de9bcf_b.jpg" alt="" />
                    <h2 className='text-lg font-medium'>Harshi Pateliya</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2km</h5>
            </div>
            <div className='flex gap-3 justify-between items-center flex-col'>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div className=''>
                            <h3 className='text-lg font-medium'>502/11-A</h3>
                            <p className='text-sm text-gray-600 -mt-1'>Naimish, sitapur</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-user-fill"></i>
                            <div className=''>
                                <h3 className='text-lg font-medium'>186-B/5</h3>
                                <p className='text-sm text-gray-600 -mt-1'>ghuramau Bangla, sitapur</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-5 p-3 '>
                            <i className="text-lg ri-currency-line"></i>
                            <div className=''>
                                <h3 className='text-lg font-medium'>₹193.20</h3>
                                <p className='text-sm text-gray-600 -mt-1'>Cash cash</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={(e)=>{
                        submitHandler(e)
                    }}>
                        <input type="text"
                        value={OTP}
                        onChange={(e)=>{setOTP(e.target.value)}}
                        className='bg-[#eee] px-4 py-4 font-mono text-lg rounded-lg w-full mt-5 placeholder:text-gray-700' placeholder='Enter OTP' />
                        <Link to='/captain-riding' className='w-full text-lg flex justify-center bg-green-600 text-white p-3 mt-5 rounded-lg font-semibold'>
                            Confirm
                        </Link>
                        <button onClick={() => {
                            props.setConfirmRidePopUpPanel(false)
                            props.setRidePopUpPanel(false)
                        }} className='w-full bg-red-600 text-white text-lg p-3 mt-2 rounded-lg font-semibold'>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp