import './ProductCard.css';
import { ProductResponse } from '@/pages/index';
import { Link } from 'react-router-dom';
import StarIcon from '@/shared/assets/icons/star.svg';

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
                {/* <h3 className='product__descr'>{title}</h3> */}
                <div className="product__purchase">
                    <span className='product__price'>{price} €</span>
                    <div className="product__buttons">
                        <button>-</button>
                        <div className='product__count'>0</div>
                        <button>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}