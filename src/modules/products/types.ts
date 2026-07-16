export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    rating: number;
    category?: string;
    images?: string[];
}

export interface ProductDetails extends Product {
    description: string;
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}