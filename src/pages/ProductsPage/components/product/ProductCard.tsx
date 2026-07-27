import './ProductCard.css';
import { Link } from 'react-router-dom';
import { Button, Rating } from '@/shared/ui';
import type { ProductResponse } from '../../types';
import { useAddToCart, useAppSelector, useRemoveFromCart, formatNumber } from '@/shared';

interface ProductCardProps extends ProductResponse {
    priority?: boolean;
}

export const ProductCard = (props: ProductCardProps) => {

    const { priority = false, ...product } = props;
    const { title, price, thumbnail, rating, id } = product;
    const user = useAppSelector((state) => state.auth.user);
    const quantity = useAppSelector(
        (state) => state.cart.products.find((product) => product.id === id)?.quantity ?? 0
    );
    const addToCart = useAddToCart();
    const removeFromCart = useRemoveFromCart();

    const isInUserCart = Boolean(user && quantity > 0);

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
                <div className="product__purchase">
                    <Button
                        className={`product__button product__button_minus ${
                            isInUserCart ? 'product__button_minus_visible' : ''
                        }`}
                        onClick={() => void removeFromCart(product)}
                        aria-label={`Remove ${title} from cart`}
                    >
                        -
                    </Button>
                    <div className={`product__count ${
                        isInUserCart ? 'product__count_visible' : ''
                    }`}>
                        {quantity}
                    </div>
                    <Button
                        className='product__button product__button_add'
                        onClick={() => void addToCart(product)}
                        aria-label={`Add ${title} to cart`}
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
    )
}