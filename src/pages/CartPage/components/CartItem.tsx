import './CartItem.css';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';
import type { ProductCartResponse } from '@/pages/ProductsPage';

interface CartProductProps {
    product: ProductCartResponse;
}

export const CartItem = ({ product }: CartProductProps) => {
    return (
        <tr className="cart-item">
            <td data-label="Product">
                <div className="cart-product">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="cart-product__image"
                    />
                    <Link
                        to={`/products/${product.id}`}
                        className="cart-product__title"
                    >
                        {product.title}
                    </Link>
                </div>
            </td>
            <td data-label="Price"> {product.price} €</td>
            <td data-label="Quantity">
                <div className="cart-product__btns">
                    <Button className="cart-page__button">
                        -
                    </Button>
                    <div className="product-page__count">
                        {product.quantity}
                    </div>
                    <Button className="cart-page__button">
                        +
                    </Button>
                </div>
            </td>
            <td data-label="Total">{product.total} €</td>
        </tr>
    );
};