import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import {
    authReducer,
    cartReducer,
    setCredentials,
} from '@/app/store';
import type { CartResponse } from '@/pages/CartPage';
import type { ProductResponse } from '@/pages/ProductsPage';
import { baseApi } from '@/shared/api/baseApi';
import { server } from '@/shared/utils';
import { useAddToCart } from './useAddToCart';

const product: ProductResponse = {
    id: 1,
    title: 'Test product',
    price: 12.5,
    thumbnail: 'product.png',
    rating: 4.5,
};

const createdCart: CartResponse = {
    id: 51,
    products: [{
        ...product,
        quantity: 1,
        total: 12.5,
        discountPercentage: 0,
        discountedTotal: 12.5,
    }],
    total: 12.5,
    userId: 1,
    totalProducts: 1,
    totalQuantity: 1,
};

const AddProductButton = () => {
    const addToCart = useAddToCart();

    return (
        <button type="button" onClick={() => void addToCart(product)}>
            Add product
        </button>
    );
};

describe('useAddToCart', () => {
    it('stores a newly created cart and updates it on the next addition', async () => {
        let createRequests = 0;
        let updateRequests = 0;

        server.use(
            http.post('https://dummyjson.com/carts/add', () => {
                createRequests += 1;
                return HttpResponse.json(createdCart);
            }),
            http.put('https://dummyjson.com/carts/51', () => {
                updateRequests += 1;
                return HttpResponse.json({
                    ...createdCart,
                    products: [{
                        ...createdCart.products[0],
                        quantity: 2,
                        total: 25,
                    }],
                    total: 25,
                    totalQuantity: 2,
                });
            })
        );

        const store = configureStore({
            reducer: {
                api: baseApi.reducer,
                auth: authReducer,
                cart: cartReducer,
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(baseApi.middleware),
        });

        store.dispatch(setCredentials({
            id: 1,
            username: 'test-user',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            gender: 'female',
            image: 'image.png',
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
        }));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddProductButton />
                </MemoryRouter>
            </Provider>
        );

        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Add product' }));

        await waitFor(() => {
            expect(store.getState().cart.id).toBe(51);
        });

        expect(createRequests).toBe(1);
        expect(store.getState().cart.products[0]?.quantity).toBe(1);

        await user.click(screen.getByRole('button', { name: 'Add product' }));

        await waitFor(() => {
            expect(updateRequests).toBe(1);
        });

        expect(createRequests).toBe(1);
        expect(store.getState().cart.products[0]?.quantity).toBe(2);
    });
});
