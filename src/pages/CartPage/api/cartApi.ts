import { baseApi } from '@/shared';
import type { CartResponse, CartsByUserResponse } from '../types/cart.types';

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCartByUser: builder.query<CartResponse | null, number>({
            query: (userId) => `/carts/user/${userId}`,
            transformResponse: (response: CartsByUserResponse) =>
                response.carts[0] ?? null,
        })
    }),
});

export const {
    useGetCartByUserQuery,
    useLazyGetCartByUserQuery,
} = cartApi;
