import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Rating, AvailabilityBadge, Button, ErrorMessage, Loader } from '@/shared/ui';
import { useGetProductQuery } from './api/productApi';
import { useAddToCart, useAppSelector, useRemoveFromCart, formatNumber } from '@/shared';

export const ProductPage = () => {
    const { id } = useParams();

    const {
        data: product,
        isLoading,
        isError,
        refetch,
    } = useGetProductQuery(id ?? skipToken);
    const cart = useAppSelector((state) => state.cart);
    const addToCart = useAddToCart();
    const removeFromCart = useRemoveFromCart();
    const quantity = cart.products.find(
        (cartProduct) => cartProduct.id === product?.id
    )?.quantity ?? 0;

    if (isLoading) {
        return <Loader text="Loading product..." fullPage />;
    }

    if (isError || !product) {
        return (
            <ErrorMessage
                message="Failed to load this product."
                {...(id && { onRetry: () => void refetch() })}
            />
        );
    }

    return(
        <article className='product-page'>
            <div className='product-page__images'>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    width="600"
                    height="600"
                    decoding="async"
                    fetchPriority="high"
                />

            </div>
            <div className='product-page__info'>
                <div className="product-page__main">
                    <h1 className='product-page__title'>{product.title}</h1>
                    <h2 className='product-page__brand'>{product.brand}</h2>
                    <Rating rating={product.rating} className='product-page__rating'/>
                    <AvailabilityBadge 
                        status={product.availabilityStatus}
                    />
                </div>
                <div className="product-page__price-block">
                    <h3 className='product-page__price-title'>Retail Price:</h3>
                    <div className='product-page__price'>
                        {formatNumber(product.price)} €
                    </div>
                </div>
                <div className="product-page__purchase">
                    <Button
                        className='product-page__button'
                        onClick={() => {
                            void removeFromCart(product);
                        }}
                        aria-label={`Remove ${product.title} from cart`}
                    >
                        -
                    </Button>
                    <div className='product-page__count'>
                        {quantity}
                    </div>
                    <Button
                        className='product-page__button'
                        onClick={() => {
                            void addToCart(product);
                        }}
                        aria-label={`Add ${product.title} to cart`}
                    >
                        +
                    </Button>
                </div>
                <div className="product-page__descr">
                    <h3 className='product-page__descr-title'>Description:</h3>
                    <div className='product-page__description'>{product.description}</div>
                </div>
            </div>
        </article>
    )
}