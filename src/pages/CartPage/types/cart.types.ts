import { ProductCartResponse } from '@/pages/index';

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