import './ProductPage.css';
import { useParams } from 'react-router-dom';

export const ProductPage = () => {
    const { id } = useParams();

    return(
        <h1>PRODUCT PAGE, PRODUCT ID: {id}</h1>
    )
}

