import './ProductsPage.css';
import { useGetProductsQuery } from '@/pages/index';
import { ProductResponse, Categories, ProductCard } from '@/pages/index';
import { useGetCategoriesQuery } from './api/productsApi';

export const ProductsPage = () => {

    const { data } = useGetProductsQuery();
    const { data: categories } = useGetCategoriesQuery();

    const productsData = data?.products.map(({id, thumbnail, title, price, rating}: ProductResponse) => (
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
                {data ? productsData : <h1>LOADING</h1>}
            </div>
        </section>
    )
}