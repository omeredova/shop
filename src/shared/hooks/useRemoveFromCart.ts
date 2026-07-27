import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeProduct, rollbackRemovedProduct } from '@/app/store';
import { useAddCartMutation, useUpdateCartMutation } from '@/pages/CartPage/api/cartApi';
import type { ProductResponse } from '@/pages/ProductsPage/types';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { enqueueCartMutation } from './cartMutationQueue';

export const useRemoveFromCart = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
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

        try {
            await enqueueCartMutation(async () => {
                const currentCart = dispatch(
                    (_dispatch, getState) => getState().cart
                );
                const cartProduct = currentCart.products.find(
                    ({ id }) => id === product.id
                );

                if (!cartProduct) {
                    return;
                }

                const quantity = cartProduct.quantity - 1;
                const products = currentCart.products
                    .filter(({ id }) => id !== product.id || quantity > 0)
                    .map(({ id, quantity: currentQuantity }) => ({
                        id,
                        quantity: id === product.id
                            ? quantity
                            : currentQuantity,
                    }));

                dispatch(removeProduct(product.id));

                try {
                    if (currentCart.id !== null) {
                        await updateCart({
                            cartId: currentCart.id,
                            userId: user.id,
                            products: [{ id: product.id, quantity }],
                        }).unwrap();
                    } else if (products.length > 0) {
                        await addCart({
                            userId: user.id,
                            products,
                        }).unwrap();
                    }
                } catch {
                    dispatch(rollbackRemovedProduct(cartProduct));
                }
            });
        } finally {
            pendingProductIds.current.delete(product.id);
        }
    }, [
        addCart,
        dispatch,
        navigate,
        updateCart,
        user,
    ]);
};