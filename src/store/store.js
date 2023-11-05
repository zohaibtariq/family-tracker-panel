import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export function createAppStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            // Add other reducers here if needed
        },
    });
}
