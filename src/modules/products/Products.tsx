import './Products.css';
import { useGetProductsQuery } from '@/modules/index';
import { ProductResponse, Categories, ProductCard } from '@/modules/index';
import { useGetCategoriesQuery } from './api/productsApi';

export const Products = () => {

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