import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP, verifyOTP } from '../store/authSlice';

const SignupPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const error = useSelector((state) => state.auth.error);

  const handleSendOTP = async () => {
    // Call the sendOTP action with phoneNumber
    dispatch(sendOTP(phoneNumber));
    // The sendOTP action will make the API call to send OTP
  };

    const handleSignup = async () => {
    // Call the signup action with phoneNumber and OTP
    dispatch(verifyOTP(phoneNumber, otp));
    // The signup action will make the API call to verify OTP and store the access token upon success
    };

    return (
        <div>
            <h1>Signup</h1>
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
      <button onClick={handleSendOTP}>Send OTP</button>
            <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
      <button onClick={handleSignup}>Signup</button>
            {accessToken && <p>Access Token: {accessToken}</p>}
      {error && <p>Error: {error}</p>}
        </div>
    );
};

export default SignupPage;
