import { baseApi } from '@/shared';
import type { CategoriesResponse, ProductsResponse } from '../types';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, {
            category?: string;
            search?: string;
            skip?: string;
            limit: string;
        }>({
            query: ({ category, search, skip, limit }) => {
                const pagination = new URLSearchParams({
                    limit,
                    skip: skip || '0',
                });

                if(search) {
                    const searchParams = new URLSearchParams({
                        q: search,
                        ...(category ? { limit: '0' } : { limit, skip: skip || '0' }),
                    });
                    return `/products/search?${searchParams.toString()}`;
                }

                if(category) {
                    return `/products/category/${encodeURIComponent(category)}?${pagination.toString()}`;
                }

                return `/products?${pagination.toString()}`;
            },
            transformResponse: (
                response: ProductsResponse,
                _meta,
                { category, search, limit, skip }
            ): ProductsResponse => {
                if(!search || !category) return response;

                const products = response.products.filter(
                    (product) => product.category === category
                );
                const start = Number(skip) || 0;
                const pageSize = Number(limit);

                return {
                    ...response,
                    products: products.slice(start, start + pageSize),
                    total: products.length,
                    skip: start,
                    limit: pageSize,
                };
            }
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