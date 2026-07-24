import { baseApi } from '@/shared';
import type { ProductDetails } from '../../ProductsPage';

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