import './Product.css';
import { Product } from '@/modules/index';

export const ProductCard = (props: Product) => {

    const { title, price, thumbnail } = props

    return(
        <div className='product'>
            <img className='product__img' src={thumbnail} alt="product_ph" />
            <div className='product__descr'>{title}</div>
            <div className='product__price'>{price}</div>
        </div>
    )
}