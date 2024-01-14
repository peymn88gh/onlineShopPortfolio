import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Confetti from 'react-dom-confetti';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const EmailVerification = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const userId = queryParams.get('userId');
    const {t}=useTranslation('common')
    const [verificationStatus, setVerificationStatus] = useState(`${t('verifying')} ...`);
    const [confettiActive, setConfettiActive] = useState(false);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    // Function to set values in local storage
    const setLocalStorage = (key, value) => {
        localStorage.setItem(key, value);
    };

    useEffect(() => {
        setLocalStorage('id', userId);
        setLocalStorage('token', token);
        
        axios.put(`${process.env.REACT_APP_BASE_URL}/UserAsync/VerifyUser/${userId}`,{}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then(res=>{
            setTimeout(() => {
                setVerificationStatus('Email Verified! Congratulations!');
                setConfettiActive(true);
                }, 2000);
                setLoading(false);
        })
        .catch((err)=>console.log(err))
    }, [userId, token]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-2xl font-bold mb-4">{verificationStatus}</div>

        <Confetti active={confettiActive} />

        <div className="text-gray-500 mt-4">
            You can now access all the features of our website.
        </div>

        <button
            className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-slate-700"
            disabled={loading}
            onClick={() => {
                navigate('/');
            }}
        >
            Continue to Main Page
        </button>
        </div>
    );
};

export default EmailVerification;
