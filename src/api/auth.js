import api from './api';

export const sendOTP = async (phoneNumber) => {
    console.log('API:::sendOTP')
    console.log(phoneNumber)
    try {
        const response = await api.post('/otp/send', {
            "countryCode": "+92", // TODO we need to make it dynamic, it should be used in auth
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
