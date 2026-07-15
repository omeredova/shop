import './Products.css';
import { useGetProductsQuery } from '@/modules/index';
import { ProductCard } from '@/modules/index';
import { Product } from '@/modules/index';

export const Products = () => {

    const { data } = useGetProductsQuery();

    const productsData = data?.products.map(({id, thumbnail, title, price}: Product) => (
        <ProductCard
            thumbnail={thumbnail}
            title={title}
            price={price}
            id={id}
        />
    ))

    return(
        <section className='products'>
            <div className='products__container'>
                {data ? productsData : <h1>LOADING</h1>}
            </div>
        </section>
    )
}