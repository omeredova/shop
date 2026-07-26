import type { ProductCartResponse } from '@/pages/ProductsPage';

export interface CartResponse {
    id: number,
    products: ProductCartResponse[],
    total: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number
}

export interface CartsByUserResponse {
    carts: CartResponse[],
    total: number,
    skip: number,
    limit: number
}

export interface AddCartRequest {
    userId: number;
    products: CartProductRequest[];
}

export interface UpdateCartRequest {
    cartId: number;
    userId: number;
    products: CartProductRequest[];
}

interface CartProductRequest {
    id: number;
    quantity: number;
}