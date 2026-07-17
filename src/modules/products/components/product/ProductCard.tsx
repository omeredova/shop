import './ProductCard.css';
import { ProductResponse } from '@/modules/index';
import StarIcon from '@/shared/assets/icons/star.svg';

export const ProductCard = (props: ProductResponse) => {

    const { title, price, thumbnail, rating } = props

    return(
        <div className='product'>
            <div className="product__cover-wrap">
                <div className="product__cover">
                    <img className='product__img' src={thumbnail} alt={`photo of ${title}`} />
                </div>
                <div className="product__rating">
                    <span>{rating}</span>
                    <StarIcon/>
                </div>
            </div>
            <div className="product__body">
                <h3 className='product__descr'>{title}</h3>
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