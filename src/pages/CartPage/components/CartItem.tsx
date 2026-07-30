import './CartItem.css';
import { Link } from 'react-router-dom';
import { QuantityControl } from '@/shared/ui';
import type { ProductCartResponse } from '@/pages/ProductsPage';
import { useAddToCart, useRemoveFromCart, useSetCartQuantity, formatNumber } from '@/shared';

interface CartProductProps {
    product: ProductCartResponse;
}

export const CartItem = ({ product }: CartProductProps) => {

    const addToCart = useAddToCart();
    const removeFromCart = useRemoveFromCart();
    const setCartQuantity = useSetCartQuantity();

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
            <td data-label="Price"> {formatNumber(product.price)} €</td>
            <td data-label="Quantity">
                <QuantityControl
                    className="cart-product__btns"
                    quantity={product.quantity}
                    onQuantityChange={(nextQuantity) =>
                        void setCartQuantity(product, nextQuantity)
                    }
                    onDecrement={() => void removeFromCart(product)}
                    onIncrement={() => void addToCart(product)}
                    decrementLabel={`Remove ${product.title} from cart`}
                    incrementLabel={`Add ${product.title} to cart`}
                />
            </td>
            <td data-label="Total">{formatNumber(product.total)} €</td>
        </tr>
    );
};