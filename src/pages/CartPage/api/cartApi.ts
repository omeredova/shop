import { baseApi } from '@/shared';
import type { CartResponse, CartsByUserResponse, AddCartRequest, UpdateCartRequest } from '../types/cart.types';

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCartByUser: builder.query<CartResponse | null, number>({
            query: (userId) => `/carts/user/${userId}`,
            transformResponse: (response: CartsByUserResponse) =>
                response.carts[0] ?? null,
        }),
        addCart: builder.mutation<CartResponse, AddCartRequest>({
            query: (body) => ({
                url: '/carts/add',
                method: 'POST',
                body,
            }),
        }),
        updateCart: builder.mutation<CartResponse, UpdateCartRequest>({
            query: ({ cartId, userId, products }) => ({
                url: `/carts/${cartId}`,
                method: 'PUT',
                body: {
                    merge: true,
                    userId,
                    products,
                },
            }),
        }),
    }),
});

export const {
    useGetCartByUserQuery,
    useLazyGetCartByUserQuery,
    useAddCartMutation,
    useUpdateCartMutation
} = cartApi;
