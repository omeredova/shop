export interface ProductResponse {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    rating: number;
    category?: string;
    images?: string[];
}

export interface ProductDetails extends ProductResponse {
    description: string;
}

export interface ProductsResponse {
    products: ProductResponse[];
    total: number;
    skip: number;
    limit: number;
}

export interface Category {
    name: string,
    slug?: string,
    url?: string,
}

export type CategoriesResponse = Category[];