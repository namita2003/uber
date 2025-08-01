import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import UserLogin from './pages/UserLogin'
import { UserDataContext } from './context/userContext';

const App = () => {
  
  
  return (
    <div >
      <Routes>
        {/* Define your routes here */}
        <Route path = '/' element={<Home />}/>
        <Route path = '/login' element={<UserLogin/>}/>
        <Route path = '/signup' element={<UserSignUp/>}/>
        <Route path = '/captain-login' element={<CaptainLogin/>}/>
        <Route path = '/captain-signup' element={<CaptainSignUp/>}/>

        
      </Routes>
    </div>
  )
}

export default App