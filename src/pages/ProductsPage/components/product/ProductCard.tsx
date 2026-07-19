import './ProductCard.css';
import { ProductResponse } from '@/pages/index';
import { Link } from 'react-router-dom';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Button } from '@/shared/ui';

export const ProductCard = (props: ProductResponse) => {

    const { title, price, thumbnail, rating, id } = props

    return(
        <div className='product'>
            <Link to={`${id}`}>
                <div className="product__cover-wrap">
                    <div className="product__cover">
                        <img className='product__img' src={thumbnail} alt={`photo of ${title}`} />
                    </div>
                    <div className="product__rating">
                        <span>{rating}</span>
                        <StarIcon/>
                    </div>
                </div>
            </Link>
            <div className="product__body">
                <Link to={`${id}`} className='product__descr'>{title}</Link>
                <span className='product__price'>{price} €</span>
                <div className="product__purchase">
                    <Button className='product__button product__button_add'>
                        -
                    </Button>
                        <div className='product__count'>0</div>
                    <Button className='product__button product__button_minus'>
                        +
                    </Button>
                </div>
            </div>
        </div>
    )
}