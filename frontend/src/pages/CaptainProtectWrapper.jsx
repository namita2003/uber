import React, { useState, useContext } from 'react'
import { CaptainDataContext } from '../context/captainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {captain, setCaptain} = React.useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);
    React.useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        }
    }, [token, navigate]);
    axios.get(`http://localhost:4000/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if (response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
            setIsLoading(false);
        }
    }).catch(error => {
        console.error("Error fetching captain profile:", error);
        //setIsLoading(false);
        localStorage.removeItem('token');
        navigate('/captain-login');
    });
    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper