import { baseApi } from "@/shared";
import { ProductDetails } from '@/pages/index';

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query<ProductDetails, string>({
            query: (id) => `/products/${id}`,
        }),
    }),
});

export const { 
    useGetProductQuery,
} = productApi; 