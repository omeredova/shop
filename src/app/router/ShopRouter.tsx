import { Routes, Route, Navigate } from 'react-router-dom';
import { ProductsPage, CartPage, ProductPage, LoginPage, SignPage } from '@/pages';
import { ShopLayout } from '../layouts/ShopLayout';

export const ShopRouter = () => {
    return (
        <Routes>
            <Route path="/account/login" element={<LoginPage />} />
            <Route path="/account/register" element={<SignPage />} />

            <Route element={<ShopLayout />}>
                <Route path="/" element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Route>
        </Routes>
    );
};