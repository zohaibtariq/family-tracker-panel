import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    verifyOTP,
    sendOTP,
    selectAccessToken,
    selectApiErrors,
    selectIsLoggedIn
} from '../store/authSlice';
import ErrorComponent from './ErrorComponent';

// import {verifyOTP} from "../api/api"; // Make sure to import 'sendOTP'

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('3132523242');
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    // const accessToken = useSelector((state) => state.auth.accessToken);
    const accessToken = useSelector(selectAccessToken);
    const apiErrors = useSelector(selectApiErrors);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    // const error = useSelector((state) => state.auth.error);
    // const [apiErrors, setApiErrors] = useState([]);

    const handleSendOTP = async () => {
      try {
        const response = await dispatch(sendOTP(phoneNumber));
        console.log('handleSendOTP response')
        console.log(response)
        const otp = response.payload.otp;
        setOtp(otp);
          // dispatch(authSlice.actions.clearApiErrors());
      } catch (error) {
          console.error('handleSendOTP')
          console.error(error)
          // dispatch(authSlice.actions.setApiErrors(error.response.data.message));

      }
    };

    const handleVerifyOTP = async () => {
      try {
        const response = await dispatch(verifyOTP({ phoneNumber, otp }));
        console.log('handleVerifyOTP response')
        console.log(response)
          // dispatch(authSlice.actions.clearApiErrors());

      } catch (error) {
        console.error('handleVerifyOTP....')
        console.error(error)
          // dispatch(authSlice.actions.setApiErrors(error.response.data.message));

      }
    };

    return (
        <div>
            <h1>Login Page</h1>
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
            <button onClick={handleVerifyOTP}>Login</button>
            {isLoggedIn && <p>LOGIN: {isLoggedIn?'TRUE':'FALSE'}</p>}
            {accessToken && <p>Access Token: {accessToken}</p>}
    {apiErrors && apiErrors.length > 0 && <ErrorComponent errors={apiErrors} />} {/* Display API
     errors */}
        </div>
    );
};

export default LoginPage;
