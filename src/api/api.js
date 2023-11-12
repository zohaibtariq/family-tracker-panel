import axios from 'axios';
const BASE_URL = 'http://localhost:3000'; // Replace with your API base URL
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        // console.log('api.interceptors.request.use.config')
        // console.log(config)
        // Get the access token from your store or wherever you store it
        if(config.url === "/otp/refresh"){ // if call from refresh token then inject refresh
            // token other vice inject access token
            const refreshToken = getStoredRefreshToken();
            if (refreshToken) {
                config.headers.Authorization = `Bearer ${refreshToken}`;
            }
        }else{
            const accessToken = getStoredAccessToken();
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        // If the response status code is unauthenticated (e.g., 401), refresh the token
        if (response.status === 401) {
            return getNewAccessTokenFromRefreshToken()
                .then((newTokens) => {
                    // console.log('getNewAccessTokenFromRefreshToken then')
                    // console.log(newTokens.data.data.accessToken)
                    // console.log(newTokens.data.data.refreshToken)
                    // Update the access token in your store or wherever you store it
                    updateNewToken(newTokens.data.data); // Implement this function
                    // Repeat the original request with the new access token
                    // const originalRequest = response.config;
                    // originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                    // return api(originalRequest);
                })
                .catch((refreshError) => {
                    console.log('refreshError')
                    console.log(refreshError)
                    // Handle token refresh error, e.g., logout the user
                    return Promise.reject(refreshError);
                });
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

function getStoredAccessToken(){
    return localStorage.getItem('accessToken')
}
function getStoredRefreshToken(){
    return localStorage.getItem('refreshToken')
}

export function getNewAccessTokenFromRefreshToken(){
    return api.post('/otp/refresh', {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getStoredRefreshToken()}`
        }
    })
}

export function updateNewToken({data}){
    // console.log('updateNewToken')
    // console.log(data)
    if(data){
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('user', data.data.user);
        localStorage.setItem('userId', data.data.userId);
        localStorage.setItem('isLoggedIn', data.data.isLoggedIn);
    }
}

export default api;
