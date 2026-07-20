import './Rating.css';
import StarIcon from '@/shared/assets/icons/star.svg';

interface RatingProps {
    className: string;
    rating: number | undefined;
}

export const Rating = ({rating, className = ''}: RatingProps) => {

    return (
        <div className={className}>
            <span>{rating}</span>
            <StarIcon/>
        </div>
    )

}