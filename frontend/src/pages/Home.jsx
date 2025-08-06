import React from 'react'
import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import WaitingForDriver from '../components/WaitingForDriver';
import LookingForDriver from '../components/LookingForDriver';

const home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panel, setPanel] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmedPanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingDriverRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingDriver, setWaitingDriver] = useState(false)


  const submitHandler = (e) => {
    e.preventDefault();
  }


  useGSAP(() => {
    if(panel){
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 20,
        //opacity: 1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      })
    }else{
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
        //opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      })
    }
  }, [panel]);

  useGSAP(() => {
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
      })
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [vehiclePanel]);
  useGSAP(() => {
    if(confirmedRidePanel){
      gsap.to(confirmedPanelRef.current, {
        transform: 'translateY(0)',
      })
    }else{
      gsap.to(confirmedPanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [confirmedRidePanel]);
  useGSAP(() => {
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
      })
    }else{
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [vehicleFound]);
  useGSAP(() => {
    if(waitingDriver){
      gsap.to(waitingDriverRef.current, {
        transform: 'translateY(0)',
      })
    }else{
      gsap.to(waitingDriverRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [waitingDriver]);
  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 ml-8 absolute mt-5' src="https://tse1.mm.bing.net/th/id/OIP.nm1FItlXC1Gk_ed4g2EINAHaCm?pid=Api&P=0&h=180" alt="" />
      <div className='h-screen w-screen'>
        {/* image for temprory use */}
        <img className='w-full h-full object-cover' src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png" alt="" />
      </div>
      <div className=' h-screen absolute top-0 w-full flex flex-col justify-end '>
        <div className='h-[30%] bg-white p-6 relative'>
          <h5 ref={panelCloseRef} className='absolute opacity-0 top-6 right-6 text-2xl' onClick={() => setPanel(!panel)}>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            e.preventDefault();
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[37%] left-10 bg-gray-800 rounded-full"></div>
            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 placeholder:text-gray-700'
              onClick={() => setPanel(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              type="text"
              placeholder='Add a pickup location' />
            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3 placeholder:text-gray-700'
              onClick={() => setPanel(true)}
              value= {destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className='h-0 bg-white  '>
          <LocationSearchPanel panelOpen={panel} setPanelOpen={setPanel} panelClose= {panelCloseRef} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />

        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanel={setVehiclePanel} />
        

      </div>
      <div ref={confirmedPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmedRide setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFound={setVehicleFound}/>

      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingDriverRef}  className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
        <WaitingForDriver setWaitingDriver={setWaitingDriver}/>
      </div>
    </div>
  )
}

export default home