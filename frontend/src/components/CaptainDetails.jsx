import React from 'react'
import { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext.jsx';

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);
    //console.log("Captain in Details:", captain);
    console.log("🧩 CaptainDetails rendered");

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="http://techbriefly.com/wp-content/uploads/2023/02/What-is-generative-AI-Tools-images-and-more-examples-2.webp" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{captain?.fullname?.firstname} {captain?.fullname?.lastname}</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>Rs 295.20</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex p-3 mt-10 bg-gray-100 rounded-xl items-start justify-center gap-5'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-time-fill"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails