import './ProductCard.css';
import { Link } from 'react-router-dom';
import { QuantityControl, Rating } from '@/shared/ui';
import type { ProductResponse } from '../../types';
import { useAddToCart, useAppSelector, useRemoveFromCart, useSetCartQuantity, formatNumber } from '@/shared';

interface ProductCardProps extends ProductResponse {
    priority?: boolean;
}

export const ProductCard = (props: ProductCardProps) => {

    const { priority = false, ...product } = props;
    const { title, price, thumbnail, rating, id } = product;
    const quantity = useAppSelector(
        (state) => state.cart.products.find((product) => product.id === id)?.quantity ?? 0
    );
    const addToCart = useAddToCart();
    const removeFromCart = useRemoveFromCart();
    const setCartQuantity = useSetCartQuantity();

    return(
        <div className='product'>
            <Link to={`${id}`}>
                <div className="product__cover-wrap">
                    <div className="product__cover">
                        <img
                            className='product__img'
                            src={thumbnail}
                            alt={title}
                            width="240"
                            height="240"
                            loading={priority ? 'eager' : 'lazy'}
                            decoding="async"
                            fetchPriority={priority ? 'high' : 'auto'}
                        />
                    </div>
                    <Rating rating={rating} className='product__rating'/>
                </div>
            </Link>
            <div className="product__body">
                <Link to={`${id}`} className='product__descr'>{title}</Link>
                <span className='product__price'>{formatNumber(price)} €</span>
                <QuantityControl
                    className="product__purchase"
                    quantity={quantity}
                    onQuantityChange={(nextQuantity) =>
                        void setCartQuantity(product, nextQuantity)
                    }
                    onDecrement={() => void removeFromCart(product)}
                    onIncrement={() => void addToCart(product)}
                    decrementLabel={`Remove ${title} from cart`}
                    incrementLabel={`Add ${title} to cart`}
                />
            </div>
        </div>
    )
}