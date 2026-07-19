import './ProductsPage.css';
import { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } from '@/pages/index';
import { ProductResponse, Categories, ProductCard } from '@/pages/index';
import { useProductsFilter } from '@/shared';

export const ProductsPage = () => {

    const { category } = useProductsFilter();
    const { data: categories } = useGetCategoriesQuery();

    const { data: allProducts, isFetching: isAllProductsFetching } = useGetProductsQuery(undefined, {
        skip: !!category
    });
    const { data: categoryProducts, isFetching: isCategoryFetching } = useGetProductsByCategoryQuery(category!,
        {
            skip: !category
        }
    )

   const products = category ? categoryProducts : allProducts;
   const isFetching = isCategoryFetching || isAllProductsFetching;
    
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

    return(
        <section className='products'>
            <div className="products__categories">
                {categories && (
                    <Categories categories={categories} />
                )}
            </div>
            <div className='products__container'>
                {isFetching ? (
                    <h1>LOADING</h1>
                ) : productsData }
            </div>
        </section>
    )
}