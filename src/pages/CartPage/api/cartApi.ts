import { baseApi } from "@/shared";
import { CartResponse, CartsByUserResponse } from "@/pages/CartPage";

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
