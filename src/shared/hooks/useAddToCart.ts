import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct, rollbackAddedProduct } from '@/app/store';
import { useAddCartMutation, useUpdateCartMutation } from '@/pages/CartPage/api/cartApi';
import type { ProductResponse } from '@/pages/ProductsPage/types';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useAddToCart = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const cart = useAppSelector((state) => state.cart);
    const pendingProductIds = useRef(new Set<number>());
    const [addCart] = useAddCartMutation();
    const [updateCart] = useUpdateCartMutation();

    return useCallback(async (product: ProductResponse) => {
        if (!user) {
            navigate('/account/login');
            return;
        }

        if (pendingProductIds.current.has(product.id)) {
            return;
        }

        pendingProductIds.current.add(product.id);

        const cartProduct = cart.products.find(
            ({ id }) => id === product.id
        );
        const quantity = (cartProduct?.quantity ?? 0) + 1;
        const hasExistingCart = cart.id !== null && cart.products.length > 0;
        const products = cartProduct
            ? cart.products.map(({ id, quantity: currentQuantity }) => ({
                id,
                quantity: id === product.id ? quantity : currentQuantity,
            }))
            : [
                ...cart.products.map(({ id, quantity }) => ({ id, quantity })),
                { id: product.id, quantity: 1 },
            ];

        dispatch(addProduct(product));

        try {
            if (hasExistingCart && cart.id !== null) {
                await updateCart({
                    cartId: cart.id,
                    userId: user.id,
                    products: [{ id: product.id, quantity }],
                }).unwrap();
            } else {
                await addCart({
                    userId: user.id,
                    products,
                }).unwrap();
            }
        } catch {
            dispatch(rollbackAddedProduct(product));
        } finally {
            pendingProductIds.current.delete(product.id);
        }
    }, [
        addCart,
        cart,
        dispatch,
        navigate,
        updateCart,
        user,
    ]);
};