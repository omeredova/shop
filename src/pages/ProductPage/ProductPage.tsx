import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Rating, AvailabilityBadge, Button } from '@/shared/ui';
import { useGetProductQuery } from './api/productApi';
import { useAddToCart, useAppSelector, useRemoveFromCart } from '@/shared';

export const ProductPage = () => {
    const { id } = useParams();

    const { data: product } = useGetProductQuery(id ?? skipToken)
    const user = useAppSelector((state) => state.auth.user);
    const cart = useAppSelector((state) => state.cart);
    const addToCart = useAddToCart();
    const removeFromCart = useRemoveFromCart();
    const quantity = cart.products.find(
        (cartProduct) => cartProduct.id === product?.id
    )?.quantity ?? 0;
    const isInUserCart = Boolean(user && quantity > 0);

    return(
        <article className='product-page'>
            <div className='product-page__images'>
                <img src={product?.thumbnail} alt="" />

            </div>
            <div className='product-page__info'>
                <div className="product-page__main">
                    <h3 className='product-page__title'>{product?.title}</h3>
                    <h2 className='product-page__brand'>{product?.brand}</h2>
                    <Rating rating={product?.rating} className='product-page__rating'/>
                    <AvailabilityBadge 
                        status={product?.availabilityStatus ?? 'Out of Stock'}
                    />
                </div>
                <div className="product-page__price-block">
                    <h3 className='product-page__price-title'>Retail Price:</h3>
                    <div className='product-page__price'>{product?.price} €</div>
                </div>
                <div className="product-page__purchase">
                    <Button
                        className={`product-page__button product-page__button_minus ${
                            isInUserCart
                                ? 'product-page__button_minus_visible'
                                : ''
                        }`}
                        onClick={() => {
                            if (product) {
                                void removeFromCart(product);
                            }
                        }}
                    >
                        -
                    </Button>
                    <div className={`product-page__count ${
                        isInUserCart ? 'product-page__count_visible' : ''
                    }`}>
                        {quantity}
                    </div>
                    <Button
                        className='product-page__button product-page__button_add'
                        onClick={() => {
                            if (product) {
                                void addToCart(product);
                            }
                        }}
                    >
                        +
                    </Button>
                </div>
                <div className="product-page__descr">
                    <h3 className='product-page__descr-title'>Description:</h3>
                    <div className='product-page__description'>{product?.description}</div>
                </div>
            </div>
        </article>
    )
}