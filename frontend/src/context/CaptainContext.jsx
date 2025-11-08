import React, { createContext, useContext, useState } from 'react';

// Create the context
export const CaptainDataContext = React.createContext();

// Custom hook for easy access
export const useCaptain = () => useContext(CaptainDataContext);

// Provider component
export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState({
        fullname: { firstname: "Namit", lastname: "Chaturvedi" },
        earned: 5200,
    });

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };
    //console.log(captain);

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
    }
    //console.log(updateCaptain);
    console.log("CaptainContext mounted");

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};