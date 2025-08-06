import React, {useState, useContext } from 'react'
import { UserDataContext } from '/src/context/UserContext.jsx';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);
    React.useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    axios.get(`http://localhost:4000/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if (response.status === 200) {
            const data = response.data;
            setUser(data.user);
            setIsLoading(false);
        }
    }).catch(error => {
        console.error("Error fetching user profile:", error);
        //setIsLoading(false);
        localStorage.removeItem('token');
        navigate('/login');
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

export default UserProtectedWrapper