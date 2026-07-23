import { createSlice, PayloadAction } from "@reduxjs/toolkit" ;
import { ProductResponse } from '@/pages/index';

interface CartState {
    products: ProductResponse[] | null;
    total: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number,
}

const initialState: CartState = {
    products: null,
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
            state.products = action.payload.products;
            state.total = action.payload.total;
            state.userId = action.payload.userId;
            state.totalProducts = action.payload.totalProducts;
            state.totalQuantity = action.payload.totalQuantity;
        }
    }
})

export const { setCartData } = cartSlice.actions;
export default cartSlice.reducer;