import './CartPage.css';
import { useAppSelector, formatNumber } from '@/shared';
import { Button } from '@/shared/ui';
import { CartItem } from './components/CartItem';

export const CartPage = () => {

    const products = useAppSelector(state => state.cart.products);
    const cart = useAppSelector(state => state.cart);

    return (
        <div className="cart-page">
            {products.length > 0 ?
                <>
                    <table className="cart-page__table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                    <CartItem
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="cart-page__actions">
                        <div className="cart-page__total">
                            Total: {formatNumber(cart.total)} €
                        </div>

                        <Button className="cart_button">Buy now</Button>
                    </div>
                </>
                : <div className="cart-page__empty"> Your cart is empty</div>
            }
        </div>
    );
};