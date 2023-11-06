import {createSlice, createAsyncThunk, /*isRejectedWithValue*/} from '@reduxjs/toolkit';
import api from '../api/api';

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  userId: null,
  isLoggedIn: false,
  // error: null,
  apiErrors: [],
};

// Async Thunk to send OTP
export const sendOTP = createAsyncThunk('auth/sendOTP', async (phoneNumber, {rejectWithValue}) => {
  try {
    const response = await api.sendOTP(phoneNumber); // Replace with your API call
    console.log('authSlice::sendOTP success')
    console.log(response)
    return response.data;
  } catch (error) {
    console.log('authSlice::sendOTP error')
    console.log(error)
    // throw error.response.data;
    // return isRejectedWithValue(error.response.data.message)
    throw rejectWithValue(error.response.data.message)
    // return {error: error.response.data.message}
  }
});

// Async Thunk to verify OTP
export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (data, {rejectWithValue}) => {
  try {
    console.log('authSlice:::verifyOTP success')
    console.log(data)
    const response = await api.verifyOTP(data); // Replace with your API call
    return response.data;
  } catch (error) {
    console.log('authSlice::verifyOTP error....')
    console.log(error)
    console.log(error.response.data)
    // throw error.response.data;
    // throw error.response.data.message
    // throw error.response.data;
    // throw error.response;
    // return isRejectedWithValue(error.response.data.message)
    throw rejectWithValue(error.response.data.message)
    // return {error: error.response.data.message}
  }
});

// Async Thunk to log in
// export const login = createAsyncThunk('auth/login', async (data) => {
//   try {
//     const response = await api.login(data); // Replace with your API call
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// });

// Async Thunk to sign up
// export const signup = createAsyncThunk('auth/signup', async (data) => {
//   try {
//     const response = await api.signup(data); // Replace with your API call
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.userId = null;
        state.isLoggedIn = false;
        state.apiErrors = [];
      })
      .addCase(sendOTP.rejected, (state, action) => {
        console.log('addCase sendOTP.rejected')
        console.log(action)
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.userId = null;
        state.isLoggedIn = false;
        state.apiErrors = action.payload;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        console.log('addCase verifyOTP.fulfilled')
        console.log(action)
        state.accessToken = action.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken;
        state.user = action.payload?.user;
        state.userId = action.payload?.userId;
        state.isLoggedIn = (action.payload?.accessToken || action.payload?.refreshToken || action.payload?.user || action.payload?.userId)
        state.apiErrors = [];
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        console.log('addCase verifyOTP.rejected')
        console.log(action)
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.userId = null;
        state.isLoggedIn = false;
        state.apiErrors = action.payload;
      })
    },
});

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectUser = (state) => state.auth.user;
export const selectUserId = (state) => state.auth.userId;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectApiErrors = (state) => state.auth.apiErrors;

export default authSlice.reducer;