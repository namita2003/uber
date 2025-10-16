import React from 'react'

const RidePopUp = (props) => {
    console.log(props);
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0 w-[93%] ' onClick={() => {
                props.setRidePopUpPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
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
                <div className='flex items-center justify-between w-full mt-5'>
                    <button onClick={() => {
                        props.setRidePopUpPanel(false)
                    }} className=' bg-gray-300 text-gray-700 p-3 px-10 rounded-lg font-semibold'>
                        Ignore
                    </button>
                    <button onClick={() => {
                        props.setConfirmRidePopUpPanel(true)
                    }} className=' bg-green-600 text-white p-3 px-10 rounded-lg font-semibold'>
                        Accept
                    </button>
                    
                </div>
            </div>
        </div>
    )
}

export default RidePopUp