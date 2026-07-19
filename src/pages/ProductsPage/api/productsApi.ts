import { baseApi } from "@/shared";
import { ProductsResponse, CategoriesResponse } from '@/pages/index';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, void>({
            query: () => '/products',
        }),
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => '/products/categories',
        }),
        getProductsByCategory: builder.query<ProductsResponse, string>({
            query:(category) => `/products/category/${category}`
        }),
    }),
});

export const { 
    useGetProductsQuery,
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
} = productsApi; 