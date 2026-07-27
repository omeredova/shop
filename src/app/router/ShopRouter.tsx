import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from '@/shared/ui';
import { ShopLayout } from '../layouts/ShopLayout';
import { ProtectedRoute } from './ProtectedRoute';

const ProductsPage = lazy(() => import('@/pages/ProductsPage/ProductsPage').then(
    ({ ProductsPage: page }) => ({ default: page })
));
const ProductPage = lazy(() => import('@/pages/ProductPage/ProductPage').then(
    ({ ProductPage: page }) => ({ default: page })
));
const CartPage = lazy(() => import('@/pages/CartPage/CartPage').then(
    ({ CartPage: page }) => ({ default: page })
));
const LoginPage = lazy(() => import('@/pages/Auth/components/LoginPage').then(
    ({ LoginPage: page }) => ({ default: page })
));
const SignPage = lazy(() => import('@/pages/Auth/components/SignPage').then(
    ({ SignPage: page }) => ({ default: page })
));
const ProfilePage = lazy(() => import('@/pages/ProfilePage/ProfilePage').then(
    ({ ProfilePage: page }) => ({ default: page })
));

export const ShopRouter = () => {
    return (
        <Suspense fallback={<Loader text="Loading page..." fullPage />}>
            <Routes>
                <Route path="/account/login" element={<LoginPage />} />
                <Route path="/account/register" element={<SignPage />} />

                <Route element={<ShopLayout />}>
                    <Route path="/" element={<Navigate to="/products" replace />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
};