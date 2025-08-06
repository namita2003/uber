import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0 w-[93%] ' onClick={() => {
                props.setVehiclePanel(false);
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>
            <div onClick={()=>{
                props.setConfirmedRidePanel(true);
            }} className='flex items-center justify-between w-full p-3 mb-2 border-2 active:border-black rounded-xl'>
                <img className='h-10' src="https://open3dmodel.com/wp-content/uploads/2019/09/White-coupe-car-3D-Model.jpg" alt="" />
                <div className='ml-6 w-1/2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable,compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'> ₹193.20</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmedRidePanel(true);
            }} className='flex items-center justify-between w-full p-3 mb-2  border-2 active:border-black rounded-xl'>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className='-ml-4 w-1/2'>
                    <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable,motorcycle ride</p>
                </div>
                <h2 className='text-lg font-semibold'> ₹65</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmedRidePanel(true);
            }} className='flex items-center justify-between w-full p-3 mb-2  border-2 active:border-black rounded-xl'>
                <img className='h-10' src="https://tse4.mm.bing.net/th/id/OIP.gERohywpalGF3NjolmHt5wHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    {/* <p className='font-normal text-xs text-gray-600'>Affordable,compact rides</p> */}
                </div>
                <h2 className='text-lg font-semibold'> ₹118.21</h2>
            </div>
        </div>
    )
}

export default VehiclePanel