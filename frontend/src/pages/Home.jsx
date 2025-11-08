import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import WaitingForDriver from '../components/WaitingForDriver';
import LookingForDriver from '../components/LookingForDriver';
//import WebSocketContext from '../context/WebSocketContext.jsx';
import { WebSocketContext } from '../context/WebSocketContext.jsx';

import { UserDataContext } from '../context/userContext.jsx';

import { jwtDecode } from "jwt-decode";



const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  // 💡 Change: Renamed 'panel' to 'showLocationPanel' for clarity.
  const [showLocationPanel, setShowLocationPanel] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(''); // pickup or destination


  const vehiclePanelRef = useRef(null);
  const confirmedPanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingDriver, setWaitingDriver] = useState(false);
  const [fare, setFare] = useState({})
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const { sendEvent, subscribe } = React.useContext(WebSocketContext);
  const { user } = React.useContext(UserDataContext);
  //const { captain } = React.useContext(CaptainDataContext);
  useEffect(() => {
    const token = localStorage.getItem('token'); // 🔹 user token name
    let userId = null;

    if (token) {
      try {
        const decoded = jwtDecode(token);
        userId = decoded._id; // MongoDB user ID
        console.log('✅ Decoded userId:', userId);
      } catch (err) {
        console.error('❌ Error decoding user token:', err);
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

      if (data.type === 'init') {
        const socketId = data.socketId;
        console.log('🎯 Received socketId:', socketId);

        if (!userId) {
          console.warn('⚠️ userId missing — token not decoded!');
          return;
        }

        ws.send(
          JSON.stringify({
            type: 'register',
            role: 'user', // ✅ this time role is "user"
            userId: userId, // from decoded token
          })
        );
      }
    };

    ws.onclose = () => console.log('🔌 WS closed');
    ws.onerror = (err) => console.error('⚠️ WS error', err);

    return () => ws.close();
  }, []);








  // --------------------- Fetch Suggestions ---------------------
  const fetchSuggestions = async (input) => {
    if (!input.trim()) return;
    try {
      const response = await axios.get('http://localhost:4000/maps/get-suggestions', {
        params: { input },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Suggestions response:', response.data);

      // ✅ FIX: use response.data directly instead of response.data.suggestions
      if (Array.isArray(response.data)) {
        setSuggestions(response.data.map(item => item.display_name));
        console.log('✅ Set suggestions:', response.data);

      } else if (Array.isArray(response.data.suggestions)) {
        setSuggestions(response.data.suggestions.map(item => item.display_name));
        console.log('✅ Set suggestions:', response.data);

      } else {
        setSuggestions([]);
      }

    } catch (error) {
      console.error('Error fetching suggestions:', error.message);
      setSuggestions([]);
    }
  };


  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === 'pickup') setPickup(value);
    else setDestination(value);

    setActiveField(field);

    if (value.length >= 3) {
      // 🛠️ FIX: Show the panel when the user starts typing and meets the fetch threshold
      setShowLocationPanel(true);
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      // 🛠️ FIX: Hide the panel if the input is cleared
      if (value.length === 0) {
        setShowLocationPanel(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    let newPickup = pickup;
    let newDestination = destination;

    if (activeField === 'pickup') newPickup = suggestion;
    else newDestination = suggestion;

    setPickup(newPickup);
    setDestination(newDestination);

    setSuggestions([]);
    setShowLocationPanel(false);

    if (newPickup && newDestination) {
      calculateFare(); // fetch fares for all vehicles
    }
  };

  const calculateFare = async () => {
    try {
      const response = await axios.get('http://localhost:4000/rides/calculate-fare', {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // Backend should return an object like: { car: 150, bike: 70, auto: 110 }
      setFare(response.data.fares);
      console.log('Fare API Response:', response.data);

      setVehiclePanel(true); // open panel after fetching fares

    } catch (error) {
      console.error('Error calculating fare:', error.response?.data || error.message);
    }
  };



  const defaultVehicle = selectedVehicle || Object.keys(fare)[0]; // first available
  const defaultFare = fare[defaultVehicle];




  // --------------------------------------------------------------

  // GSAP Animations for panels
  // 🛠️ Change: Use 'showLocationPanel' instead of 'panel'
  useGSAP(() => {
    if (showLocationPanel) {
      gsap.to(panelRef.current, {
        height: 'auto',
        minHeight: '300px',
        padding: 20,
        duration: 0.3
      });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        minHeight: '0px',
        padding: 0,
        duration: 0.3
      });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [showLocationPanel]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)'
    });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmedPanelRef.current, {
      transform: confirmedRidePanel ? 'translateY(0)' : 'translateY(100%)'
    });
  }, [confirmedRidePanel]);


  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)'
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingDriverRef.current, {
      transform: waitingDriver ? 'translateY(0)' : 'translateY(100%)'
    });
  }, [waitingDriver]);
  //console.log('Panel Open:', showLocationPanel, 'Suggestions:', suggestions);

  return (

    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 ml-8 absolute mt-5' src="https://tse1.mm.bing.net/th/id/OIP.nm1FItlXC1Gk_ed4g2EINAHaCm?pid=Api&P=0&h=180" alt="" />
      <div className='h-screen w-screen'>
        <img className='w-full h-full object-cover' src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png" alt="" />
      </div>

      <div className='h-screen absolute top-0 w-full flex flex-col justify-end'>
        <div className='h-[30%] bg-white p-6 relative'>
          {/* 🛠️ Change: Use showLocationPanel */}
          <h5 ref={panelCloseRef} className='absolute opacity-0 top-6 right-6 text-2xl' onClick={() => setShowLocationPanel(!showLocationPanel)}>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="line absolute h-16 w-1 top-[37%] left-10 bg-gray-800 rounded-full"></div>

            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 placeholder:text-gray-700'
              // 💡 Change: Only set activeField on click. Panel visibility is now managed by handleInputChange.
              onClick={() => { setActiveField('pickup'); }}
              value={pickup}
              onChange={(e) => handleInputChange(e, 'pickup')}
              type="text"
              placeholder='Add a pickup location'
            />

            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3 placeholder:text-gray-700'
              // 💡 Change: Only set activeField on click. Panel visibility is now managed by handleInputChange.
              onClick={() => { setActiveField('destination'); }}
              value={destination}
              onChange={(e) => handleInputChange(e, 'destination')}
              type="text"
              placeholder='Enter your destination'
            />
          </form>

        </div>

        <div ref={panelRef} className='bg-white overflow-hidden'>
          <LocationSearchPanel
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            // 🛠️ Change: Pass the new state variable and setter
            panelOpen={showLocationPanel}
            setPanelOpen={setShowLocationPanel}
            panelClose={panelCloseRef}
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-20 bottom-0 bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          setConfirmedRidePanel={(val) => {
            setConfirmedRidePanel(val);
            setVehiclePanel(false);
          }}
          setVehiclePanel={setVehiclePanel}
          calculateFare={(vehicleName) => {
            setSelectedVehicle(vehicleName); // store selected vehicle
            calculateFare(vehicleName);
          }}
          fare={fare}  // pass fares
        />
      </div>

      <div ref={confirmedPanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmedRide
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVehicleFound={setVehicleFound}
          setSelectedVehicle={setSelectedVehicle} // <-- pass setter
          fare={fare}
          selectedVehicle={selectedVehicle}
          pickup={pickup}
          destination={destination}
        />


      </div>




      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-20 bottom-0 bg-white px-3 py-6 pt-12"
      >
        {vehicleFound && (
          <LookingForDriver
            setVehicleFound={setVehicleFound}
            pickup={pickup}
            destination={destination}
            selectedVehicle={selectedVehicle || Object.keys(fare)[0]} // fallback
            fare={fare}  // pass the entire fare object
          />

        )}

      </div>



      <div ref={waitingDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
        <WaitingForDriver setWaitingDriver={setWaitingDriver} />
      </div>
    </div>
  )
};

export default Home;