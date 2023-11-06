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
        // Get the access token from your store or wherever you store it
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
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
            return refreshToken()
                .then((newTokens) => {
                    // Update the access token in your store or wherever you store it
                    updateAccessToken(newTokens.accessToken); // Implement this function
                    // Repeat the original request with the new access token
                    const originalRequest = response.config;
                    originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                    return api(originalRequest);
                })
                .catch((refreshError) => {
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

function getAccessToken(){
    return localStorage.getItem('accessToken')
}

function refreshToken(){
    // TODO call refresh token
}

function updateAccessToken(){
    // TODO update to local storage and then to store as well if required
}

export default api;
