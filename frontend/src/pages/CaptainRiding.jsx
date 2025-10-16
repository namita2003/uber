import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


const CaptainRiding = () => {
  
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    useGSAP(() => {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)',
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)',
            })
        }
    }, [finishRidePanel]);
    return (
        <div>
            <div className='h-screen relative'>

                <div className='fixed p-6 top-0 flex justify-between items-center w-full'>
                    <img className='w-16' src="https://tse1.mm.bing.net/th/id/OIP.nm1FItlXC1Gk_ed4g2EINAHaCm?pid=Api&P=0&h=180" alt="" />
                    <Link to='/captain-login' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                        <i className="text-lg font-medium ri-logout-box-r-line"></i>
                    </Link>
                </div>
                <div className='h-4/5'>
                    <img className='w-full h-full object-cover' src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png" alt="" />
                </div>
                <div className='h-1/5 p-6 bg-yellow-400 flex items-center justify-between relative'
                onClick={()=>{
                    setFinishRidePanel(true)
                }}>
                    <h5 className='p-1 text-center absolute top-0 w-[95%] ' onClick={() => {
                    }}><i className="text-3xl text-black ri-arrow-up-s-line"></i></h5>
                    <h4 className='text-xl font-semibold'>4 KM away</h4>
                    <button className=' bg-green-600 text-white p-3 px-10 rounded-lg font-semibold'>Complete Ride</button>
                </div>

            </div>
            <div ref={finishRidePanelRef} className='fixed w-full h-[70%] z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12'>
                <FinishRide  setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding