import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace with your API base URL

const api = axios.create({
    baseURL: BASE_URL,
});

// API function to send OTP
export const sendOTP = async (phoneNumber) => {
    console.log('API:::sendOTP')
    console.log(phoneNumber)
    try {
        const response = await api.post('/otp/send', {
            "countryCode": "+92", // TODO we need to make it dynamic, it should be used in api
            // as well
            "phoneNumber": phoneNumber
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// API function to verify OTP
export const verifyOTP = async (data) => {
    console.log('API:::verifyOTP:::success')
    console.log(data)
    try {
        const response = await api.post('/otp/verify', {
            "countryCode": "+92",
            "phoneNumber": data.phoneNumber,
            "otp": data.otp
        });
        return response.data;
    } catch (error) {
        console.log('API:::verifyOTP:::error')
        console.log(error)
        console.log(error.response.data.message)
        throw error;
    }
};

const apiFunctions = {
    sendOTP,
    verifyOTP,
};

export default apiFunctions;
