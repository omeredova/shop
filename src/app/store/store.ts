import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared';

export const store = configureStore({
    reducer: {
        api: baseApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(baseApi.middleware),
})