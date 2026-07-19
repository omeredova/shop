import { Routes, Route, Navigate } from 'react-router-dom';
import { ProductsPage, CartPage, ProductPage, LoginPage } from '@/pages';

export const ShopRouter = () => {
    return(
        <Routes>
            <Route path='/' element={<Navigate to="/products" replace />}/>
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:id' element={<ProductPage />} />
            <Route path='/account/login' element={<LoginPage/>}/>
            <Route path='/cart' element={<CartPage/>} />
        </Routes>
    )
}