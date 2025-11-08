import React, { useState, useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("captaintoken");

    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 🔒 Redirect if no token
        if (!token) {
            navigate("/captain-login");
            return;
        }

        // ✅ Fetch captain profile only once
        const fetchCaptainProfile = async () => {
            try {
                const response = await axios.get("http://localhost:4000/captains/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                //console.log("🧾 Full response data:", response.data);

                if (response.status === 200) {
                    setCaptain(response.data);

                    //console.log("✅ Captain profile loaded:", response.data);
                }
            } catch (error) {
                console.error("❌ Error fetching captain profile:", error);
                localStorage.removeItem("token");
                navigate("/captain-login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCaptainProfile();
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        return <div>Loading...</div>; // 🌀 can replace with spinner
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;
