import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetProductQuery } from '@/pages/index';
import { Rating, AvailabilityBadge, Button } from '@/shared/ui';

export const ProductPage = () => {
    const { id } = useParams();

    const { data: product } = useGetProductQuery(id ?? skipToken)

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
                    <Button className='product-page__button product-page__button_minus'>
                        -
                    </Button>
                    <div className='product-page__count'>0</div>
                    <Button className='product-page__button product-page__button_add'>
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

