import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useState } from 'react'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { CaptainDataContext } from '../context/CaptainContext.jsx';
import { jwtDecode } from "jwt-decode";
const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
  const ridePopUpPanelRef = useRef(null)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const [rideData, setRideData] = useState(null);

  const confirmRidePopUpPanelRef = useRef(null)
  useEffect(() => {
    const token = localStorage.getItem('captaintoken');
    let captainId = null;

    if (token) {
      try {
        const decoded = jwtDecode(token);
        captainId = decoded._id; // MongoDB _id
        console.log('✅ Decoded captainId:', captainId);
      } catch (err) {
        console.error('❌ Error decoding token:', err);
      }
    }

    const hostname = window.location.hostname;
    let wsUrl;

    if (hostname.includes('devtunnels.ms')) {
      // your backend devtunnel must be started separately on port 4000
      wsUrl = 'wss://551j3n41-4000.inc1.devtunnels.ms';
    } else {
      wsUrl = 'ws://localhost:4000';
    }

    const ws = new WebSocket(wsUrl);


    ws.onopen = () => {
      console.log('✅ WebSocket connected to server');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('🔍 WS message received:', data);

      // --- INIT ---
      if (data.type === 'init') {
        const socketId = data.socketId;
        console.log('🎯 Received socketId:', socketId);

        if (!captainId) {
          console.warn('⚠️ captainId missing — token not decoded!');
          return;
        }

        ws.send(
          JSON.stringify({
            type: 'register',
            role: 'captain',
            userId: captainId,
          })
        );
      }

      // --- 🚖 NEW RIDE EVENT ---
      if (data.event === 'newRide') {
        const { pickup, destination, fare, otp, rideId } = data.data;

        console.log("🚖 New Ride Assigned!");
        console.log("📍 Pickup:", pickup);
        console.log("🏁 Destination:", destination);
        console.log("💰 Fare:", fare);
        console.log("🔐 OTP:", otp);
        console.log("🆔 Ride ID:", rideId);

        // Optional: show popup UI
        setRidePopUpPanel(true);
      }

      // --- 📡 CAPTAIN LOCATION UPDATE ---
      if (data.event === 'captainLocationUpdate') {
        const { userId, location } = data.data;
        console.log(`📍 Captain ${userId} moved to`, location);
      }
    };



    ws.onclose = () => console.log('🔌 WS closed');
    ws.onerror = (err) => console.error('⚠️ WS error', err);

    // 🚗 Every 10 seconds, send captain's live location to server
    const locationInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN && captainId) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            ws.send(
              JSON.stringify({
                type: 'locationUpdate',
                userId: captainId,
                role: 'captain',
                location: { latitude, longitude },
              })
            );
            console.log(`📍 Sent location: ${latitude}, ${longitude}`);
          },
          (err) => console.error('❌ Error fetching location', err),
          { enableHighAccuracy: true }
        );
      }
    }, 10000); // every 10 sec

    // 🧹 Cleanup when unmounting
    return () => {
      clearInterval(locationInterval);
      ws.close();
    };
  }, []);


  useGSAP(() => {
    if (!ridePopUpPanelRef.current) return; // ✅ Prevent GSAP null target
    gsap.to(ridePopUpPanelRef.current, {
      transform: ridePopUpPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.5,
      ease: "power2.out",
    });
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (!confirmRidePopUpPanelRef.current) return; // ✅ Prevent GSAP null target
    gsap.to(confirmRidePopUpPanelRef.current, {
      transform: confirmRidePopUpPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.5,
      ease: "power2.out",
    });
  }, [confirmRidePopUpPanel]);

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex justify-between items-center w-full'>
        <img className='w-16' src="https://tse1.mm.bing.net/th/id/OIP.nm1FItlXC1Gk_ed4g2EINAHaCm?pid=Api&P=0&h=180" alt="" />
        <Link to='/captain-login' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='w-full h-full object-cover' src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png" alt="" />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      {ridePopUpPanel && (
        <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
          <RidePopUp
            ride={rideData} // ✅ send ride data
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            setRidePopUpPanel={setRidePopUpPanel}
          />
        </div>
      )}

      {confirmRidePopUpPanel && (
        <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-6 pt-12'>
          <ConfirmRidePopUp
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            setRidePopUpPanel={setRidePopUpPanel}
          />
        </div>
      )}

    </div>
  )
}

export default CaptainHome