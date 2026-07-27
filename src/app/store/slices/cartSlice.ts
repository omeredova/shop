import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProductCartResponse, ProductResponse } from '@/pages/ProductsPage';

export interface CartState {
    id: number | null;
    products: ProductCartResponse[];
    total: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number,
}

export const getCartWithAddedProduct = (
    state: CartState,
    addedProduct: ProductResponse
): CartState => {
    const existingProduct = state.products.find(
        ({ id }) => id === addedProduct.id
    );
    const products = existingProduct
        ? state.products.map((product) =>
            product.id === addedProduct.id
                ? {
                    ...product,
                    quantity: product.quantity + 1,
                    total: (product.quantity + 1) * product.price,
                }
                : product
        )
        : [
            ...state.products,
            {
                ...addedProduct,
                quantity: 1,
                total: addedProduct.price,
                discountPercentage: 0,
                discountedTotal: addedProduct.price,
            },
        ];

    return {
        ...state,
        products,
        total: state.total + addedProduct.price,
        totalProducts: products.length,
        totalQuantity: state.totalQuantity + 1,
    };
};

const initialState: CartState = {
    id: null,
    products: [],
    total: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartData(state, action: PayloadAction<CartState >) {
            state.id = action.payload.id;
            state.products = action.payload.products;
            state.total = action.payload.total;
            state.userId = action.payload.userId;
            state.totalProducts = action.payload.totalProducts;
            state.totalQuantity = action.payload.totalQuantity;
        },
        resetCart() {
            return initialState;
        },
        addProduct(state, action: PayloadAction<ProductResponse>) {
            return getCartWithAddedProduct(state, action.payload);
        },
        rollbackAddedProduct(state, action: PayloadAction<ProductResponse>) {
            const productIndex = state.products.findIndex(
                ({ id }) => id === action.payload.id
            );
            const product = state.products[productIndex];

            if (!product) {
                return;
            }

            if (product.quantity === 1) {
                state.products.splice(productIndex, 1);
            } else {
                product.quantity -= 1;
                product.total = product.quantity * product.price;
            }

            state.total = Math.max(0, state.total - action.payload.price);
            state.totalProducts = state.products.length;
            state.totalQuantity = Math.max(0, state.totalQuantity - 1);
        },
        removeProduct(state, action: PayloadAction<number>) {
            const productIndex = state.products.findIndex(
                ({ id }) => id === action.payload
            );
            const product = state.products[productIndex];

            if (!product) {
                return;
            }

            if (product.quantity === 1) {
                state.products.splice(productIndex, 1);
            } else {
                product.quantity -= 1;
                product.total = product.quantity * product.price;
            }

            state.total = Math.max(0, state.total - product.price);
            state.totalProducts = state.products.length;
            state.totalQuantity = Math.max(0, state.totalQuantity - 1);
        },
        rollbackRemovedProduct(
            state,
            action: PayloadAction<ProductCartResponse>
        ) {
            const product = state.products.find(
                ({ id }) => id === action.payload.id
            );

            if (product) {
                product.quantity += 1;
                product.total = product.quantity * product.price;
            } else {
                state.products.push(action.payload);
            }

            state.total += action.payload.price;
            state.totalProducts = state.products.length;
            state.totalQuantity += 1;
        }
    }
})

export const {
    addProduct,
    removeProduct,
    rollbackAddedProduct,
    rollbackRemovedProduct,
    resetCart,
    setCartData,
} = cartSlice.actions;
export default cartSlice.reducer;