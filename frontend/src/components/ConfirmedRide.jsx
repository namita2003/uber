import React from 'react'

const ConfirmedRide = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0 w-[93%] ' onClick={() => {
                props.setConfirmedRidePanel(false);
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your ride</h3>
            <div className='flex gap-3 justify-between items-center flex-col'>
                <img className='h-20' src="https://open3dmodel.com/wp-content/uploads/2019/09/White-coupe-car-3D-Model.jpg" alt="" />
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
                <button onClick={()=>{
                    props.setVehicleFound(true)
                    props.setConfirmedRidePanel(false)
                }} className='w-full bg-green-600 text-white p-2 mt-5 rounded-lg font-semibold'>
                    Confirmed
                </button>
            </div>
        </div>
    )
}

export default ConfirmedRide