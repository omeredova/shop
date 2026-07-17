import { baseApi } from "@/shared";
import { ProductsResponse, CategoriesResponse } from '@/modules/index';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, void>({
            query: () => '/products',
        }),
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => '/products/categories',
        }),
    }),
});

export const { 
    useGetProductsQuery,
    useGetCategoriesQuery,
} = productsApi; 