import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCartData } from '@/app/store';
import { useAddCartMutation, useUpdateCartMutation } from '@/pages/CartPage/api/cartApi';
import type { ProductResponse } from '@/pages/ProductsPage/types';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { enqueueCartMutation } from './cartMutationQueue';

export const useSetCartQuantity = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const pendingProductIds = useRef(new Set<number>());
    const [addCart] = useAddCartMutation();
    const [updateCart] = useUpdateCartMutation();

    return useCallback(async (product: ProductResponse, quantity: number) => {
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
                const currentProduct = currentCart.products.find(
                    ({ id }) => id === product.id
                );
                const currentQuantity = currentProduct?.quantity ?? 0;

                if (quantity === currentQuantity) {
                    return;
                }

                const products = quantity === 0
                    ? currentCart.products.filter(({ id }) => id !== product.id)
                    : currentProduct
                        ? currentCart.products.map((cartProduct) =>
                            cartProduct.id === product.id
                                ? {
                                    ...cartProduct,
                                    quantity,
                                    total: quantity * cartProduct.price,
                                    discountedTotal: quantity
                                        * cartProduct.price
                                        * (1 - cartProduct.discountPercentage / 100),
                                }
                                : cartProduct
                        )
                        : [
                            ...currentCart.products,
                            {
                                ...product,
                                quantity,
                                total: quantity * product.price,
                                discountPercentage: 0,
                                discountedTotal: quantity * product.price,
                            },
                        ];
                const quantityDifference = quantity - currentQuantity;
                const updatedCart = {
                    ...currentCart,
                    products,
                    total: Math.max(
                        0,
                        currentCart.total + quantityDifference * product.price
                    ),
                    totalProducts: products.length,
                    totalQuantity: Math.max(
                        0,
                        currentCart.totalQuantity + quantityDifference
                    ),
                };

                dispatch(setCartData(updatedCart));

                try {
                    if (currentCart.id !== null) {
                        await updateCart({
                            cartId: currentCart.id,
                            userId: user.id,
                            products: [{ id: product.id, quantity }],
                        }).unwrap();
                    } else if (products.length > 0) {
                        const createdCart = await addCart({
                            userId: user.id,
                            products: products.map(({ id, quantity }) => ({
                                id,
                                quantity,
                            })),
                        }).unwrap();

                        dispatch(setCartData(createdCart));
                    }
                } catch {
                    dispatch(setCartData(currentCart));
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