import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to = '/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className='w-full h-full object-cover' src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png" alt="" />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between mt-5'>
                    <img className='h-12 ml-2' src="https://open3dmodel.com/wp-content/uploads/2019/09/White-coupe-car-3D-Model.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium '>Sarthak</h2>
                        <h4 className='text-xl font-semibold -mb-1 -mt-1'>MP04 AB1234</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>
                <div className='flex gap-3 justify-between items-center flex-col'>

                    <div className='w-full mt-8'>

                        <div>
                            <div className='flex items-center gap-5 p-3 border-b-2 '>
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

                </div>
                <button className='w-full bg-green-600 text-white p-4 mt-10 rounded-lg font-semibold'>Make a payment</button>

            </div>
        </div>
    )
}

export default Riding