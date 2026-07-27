import './ProductsPage.css';
import { useProductsFilter } from '@/shared';
import { useMemo } from 'react';
import { useGetProductsQuery, useGetCategoriesQuery } from './api/productsApi';
import { Categories } from './components/categories/Categories';
import { ProductCard } from './components/product/ProductCard';
import type { ProductResponse } from './types';
import { LimitDropdown, Pagination, Loader, ErrorMessage } from '@/shared/ui';

export interface ProductsFilters {
    category?: string;
    search?: string;
    limit: string;
    skip?: string;
}

export const ProductsPage = () => {

    const { category, search, limit, skip, setFilter } = useProductsFilter();
    const {
        data: categories,
        isLoading: areCategoriesLoading,
        isError: areCategoriesError,
        refetch: refetchCategories,
    } = useGetCategoriesQuery();

    const filters = useMemo<ProductsFilters>(() => ({
        limit,
        ...(category && { category }),
        ...(search && { search }),
        ...(skip && { skip }),
    }), [category, search, limit, skip])

    const {
        data: products,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetProductsQuery(filters);
    
    const productsData = products?.products.map(({id, thumbnail, title, price, rating}: ProductResponse, index) => (
        <ProductCard
            thumbnail={thumbnail}
            title={title}
            price={price}
            id={id}
            rating={rating}
            priority={index < 4}
            key={id}
        />
    ))

    const isEmpty = !isFetching && !isError && products?.products.length === 0;
    const currentSkip = Number(skip) || 0;
    const currentLimit = Number(limit);
    const total = products?.total ?? 0;

    return(
        <section className='products-page'>
            <h1 className="visually-hidden">Products</h1>
            <div className="products-page__categories">
                {areCategoriesLoading && <Loader text="Loading categories..." />}
                {areCategoriesError && (
                    <ErrorMessage
                        message="Failed to load categories."
                        onRetry={() => void refetchCategories()}
                    />
                )}
                {categories && (
                    <Categories categories={categories} />
                )}
            </div>

            <div>
                <div className="products-page__toolbar">
                    <div className="products-page__count">
                        {search
                            ? <>Results for <span className='products-page__count-total'>«{search}»</span>: </>
                            : 'Products found: '}
                        <span className='products-page__count-total'>{isFetching ? '…' : total}</span>
                    </div>
                    <LimitDropdown />
                </div>

                {isLoading && <Loader text="Loading products..." />}

                {isError && (
                    <ErrorMessage
                        message="Failed to load products."
                        onRetry={() => void refetch()}
                    />
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

                {!isLoading && !isError && (
                    <div className='products-page__container' aria-busy={isFetching}>
                        {productsData}
                    </div>
                )}

                {!isError && (
                    <Pagination
                        skip={currentSkip}
                        limit={currentLimit}
                        total={total}
                        disabled={isFetching}
                        ariaLabel="Products pagination"
                        onSkipChange={(nextSkip) => setFilter('skip', String(nextSkip))}
                    />
                )}
            </div>
        </section>
    )
}