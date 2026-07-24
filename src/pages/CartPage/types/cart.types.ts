import type { ProductCartResponse } from '@/pages/ProductsPage';

export interface CartResponse {
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