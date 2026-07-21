import { baseApi } from "@/shared";
import { ProductsResponse, CategoriesResponse } from '@/pages/index';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, {
            category?: string;
            search?: string;
        }>({
            query: ({ category, search }) => {
                if(search) {
                    return `/products/search?q=${encodeURIComponent(search)}&limit=0`;
                }

                if(category) {
                    return `/products/category/${encodeURIComponent(category)}`;
                }

                return '/products';
            },
            transformResponse: (
                response: ProductsResponse,
                _meta,
                { category, search }
            ): ProductsResponse => {
                if(!search || !category) return response;

                const products = response.products.filter(
                    (product) => product.category === category
                );

                return { ...response, products, total: products.length };
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