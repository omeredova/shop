import { baseApi } from "@/shared";
import { ProductsResponse } from '@/modules/index';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, void>({
            query: () => '/products',
        }),
    }),
});

export const { 
    useGetProductsQuery
} = productsApi; 