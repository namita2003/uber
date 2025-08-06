import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0 w-[93%] ' onClick={()=>{
                props.setWaitingDriver(false)
            }} ><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <div className='flex items-center justify-between'>
                <img className='h-12' src="https://open3dmodel.com/wp-content/uploads/2019/09/White-coupe-car-3D-Model.jpg" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium '>Sarthak</h2>
                    <h4 className='text-xl font-semibold -mb-1 -mt-1'>MP04 AB1234</h4>
                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                </div>
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

            </div>
        </div>
    )
}

export default WaitingForDriver