import './ProductsPage.css';
import { useProductsFilter } from '@/shared';
import { useMemo } from 'react';
import { useGetProductsQuery, useGetCategoriesQuery } from './api/productsApi';
import { Categories } from './components/categories/Categories';
import { ProductCard } from './components/product/ProductCard';
import type { ProductResponse } from './types';
import { LimitDropdown, Pagination } from '@/shared/ui';

export interface ProductsFilters {
    category?: string;
    search?: string;
    limit: string;
    skip?: string;
}

export const ProductsPage = () => {

    const { category, search, limit, skip, setFilter } = useProductsFilter();
    const { data: categories } = useGetCategoriesQuery();

    const filters = useMemo<ProductsFilters>(() => ({
        limit,
        ...(category && { category }),
        ...(search && { search }),
        ...(skip && { skip }),
    }), [category, search, limit, skip])

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
    const currentSkip = Number(skip) || 0;
    const currentLimit = Number(limit);
    const total = products?.total ?? 0;

    return(
        <section className='products-page'>
            <div className="products-page__categories">
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