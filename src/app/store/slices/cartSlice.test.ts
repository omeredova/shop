import { describe, expect, it } from 'vitest';
import type {
    ProductCartResponse,
    ProductResponse,
} from '@/pages/ProductsPage';
import cartReducer, {
    addProduct,
    removeProduct,
    rollbackAddedProduct,
    rollbackRemovedProduct,
    setCartData,
} from './cartSlice';

const product: ProductResponse = {
    id: 1,
    title: 'Test product',
    price: 12.5,
    thumbnail: 'product.png',
    rating: 4.5,
};

const cartProduct: ProductCartResponse = {
    ...product,
    quantity: 1,
    total: 12.5,
    discountPercentage: 0,
    discountedTotal: 12.5,
};

describe('cartSlice', () => {
    it('stores cart data received from the API', () => {
        const cart = {
            id: 51,
            products: [cartProduct],
            total: 12.5,
            userId: 1,
            totalProducts: 1,
            totalQuantity: 1,
        };

        expect(cartReducer(undefined, setCartData(cart))).toEqual(cart);
    });

    it('adds a new product and updates cart totals', () => {
        const state = cartReducer(undefined, addProduct(product));

        expect(state.products).toEqual([cartProduct]);
        expect(state.total).toBe(12.5);
        expect(state.totalProducts).toBe(1);
        expect(state.totalQuantity).toBe(1);
    });

    it('increments and decrements an existing product', () => {
        const withTwoItems = cartReducer(
            cartReducer(undefined, addProduct(product)),
            addProduct(product)
        );

        expect(withTwoItems.products[0]).toEqual(
            expect.objectContaining({
                quantity: 2,
                total: 25,
            })
        );
        expect(withTwoItems.totalQuantity).toBe(2);

        const withOneItem = cartReducer(
            withTwoItems,
            removeProduct(product.id)
        );

        expect(withOneItem.products[0]).toEqual(cartProduct);
        expect(withOneItem.total).toBe(12.5);
        expect(withOneItem.totalQuantity).toBe(1);
    });

    it('removes the last product unit from the cart', () => {
        const state = cartReducer(
            cartReducer(undefined, addProduct(product)),
            removeProduct(product.id)
        );

        expect(state.products).toEqual([]);
        expect(state.total).toBe(0);
        expect(state.totalProducts).toBe(0);
        expect(state.totalQuantity).toBe(0);
    });

    it('rolls back optimistic additions and removals', () => {
        const initialState = cartReducer(undefined, addProduct(product));
        const afterAdditionRollback = cartReducer(
            initialState,
            rollbackAddedProduct(product)
        );

        expect(afterAdditionRollback.products).toEqual([]);
        expect(afterAdditionRollback.totalQuantity).toBe(0);

        const afterRemovalRollback = cartReducer(
            afterAdditionRollback,
            rollbackRemovedProduct(cartProduct)
        );

        expect(afterRemovalRollback.products).toEqual([cartProduct]);
        expect(afterRemovalRollback.total).toBe(12.5);
        expect(afterRemovalRollback.totalQuantity).toBe(1);
    });

    it('ignores removal of a product that is not in the cart', () => {
        const state = cartReducer(undefined, removeProduct(999));

        expect(state).toEqual({
            id: null,
            products: [],
            total: 0,
            userId: 0,
            totalProducts: 0,
            totalQuantity: 0,
        });
    });
});