export interface ProductResponse {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    rating: number;
    category?: string;
    images?: string[];
}

export interface ProductCartResponse extends ProductResponse {
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
}

export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export type AvailabilityStatus =
    | 'In Stock'
    | 'Low Stock'
    | 'Out of Stock';

export interface ProductDetails extends ProductResponse {
    description: string;
    stock: number;
    brand: string;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: AvailabilityStatus;
    returnPolicy: string;
    reviews: Review[];
}

export interface ProductsResponse {
    products: ProductResponse[];
    total: number;
    skip: number;
    limit: number;
}

export interface Category {
    name: string,
    slug: string,
    url?: string,
}

export type CategoriesResponse = Category[];