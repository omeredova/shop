import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { baseApi } from '@/shared';
import { authReducer, cartReducer } from '@/app/store';

export const setupStore = () => {
    return configureStore({
        reducer: {
            api: baseApi.reducer,
            auth: authReducer,
            cart: cartReducer,
        },

        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(baseApi.middleware),
    });
};

export const renderWithProviders = (
    ui: ReactNode
) => {

    const store = setupStore();

    return {
        store,
        ...render(
            <Provider store={store}>
                <BrowserRouter>
                    {ui}
                </BrowserRouter>
            </Provider>
        ),
    };
};