import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        api: baseApi.reducer,
        auth: authReducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(baseApi.middleware),
})