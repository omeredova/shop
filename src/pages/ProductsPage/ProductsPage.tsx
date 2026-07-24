import './ProductsPage.css';
import { useProductsFilter } from '@/shared';
import { useMemo } from 'react';
import { useGetProductsQuery, useGetCategoriesQuery } from './api/productsApi';
import { Categories } from './components/categories/Categories';
import { ProductCard } from './components/product/ProductCard';
import type { ProductResponse } from './types';

export interface ProductsFilters {
    category?: string;
    search?: string;
}

export const ProductsPage = () => {

    const { category, search, setFilter } = useProductsFilter();
    const { data: categories } = useGetCategoriesQuery();

    const filters = useMemo<ProductsFilters>(() => ({
        ...(category && { category }),
        ...(search && { search })
    }), [category, search])

    const { data: products, isFetching, isError } = useGetProductsQuery(filters)
    
    const productsData = products?.products.map(({id, thumbnail, title, price, rating}: ProductResponse) => (
        <ProductCard
            thumbnail={thumbnail}
            title={title}
            price={price}
            id={id}
            rating={rating}
            key={id}
        />
    ))

    const isEmpty = !isFetching && !isError && products?.products.length === 0;

    return(
        <section className='products-page'>
            <div className="products-page__categories">
                {categories && (
                    <Categories categories={categories} />
                )}
            </div>

            <div>
                <div className="products-page__count">
                    {search
                        ? <>Results for <span className='products-page__count-total'>«{search}»</span>: </>
                        : 'Products found: '}
                    <span className='product-page__count-total'>{isFetching ? '…' : products?.total ?? 0}</span>
                </div>

                {isError && (
                    <h1 className='products-page__message'>Failed to load products. Try again later.</h1>
                )}

                {isEmpty && (
                    <div className='products-page__message'>
                        <h1>NO MATCHES.</h1>
                        {category && (
                            <button
                                className='products-page__reset'
                                type='button'
                                onClick={() => setFilter('category', '')}
                            >
                                Search in all categories
                            </button>
                        )}
                    </div>
                )}

                <div className='products-page__container' aria-busy={isFetching}>
                    {productsData}
                </div>
            </div>
        </section>
    )
}