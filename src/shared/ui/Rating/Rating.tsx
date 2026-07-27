import './Rating.css';
import StarIcon from '../../assets/icons/star.svg';

interface RatingProps {
    className: string;
    rating: number | undefined;
}

export const Rating = ({rating, className = ''}: RatingProps) => {

    return (
        <div className={className} role="img" aria-label={`Rating: ${rating ?? 'not rated'} out of 5`}>
            <span>{rating}</span>
            <span aria-hidden="true"><StarIcon/></span>
        </div>
    )

}