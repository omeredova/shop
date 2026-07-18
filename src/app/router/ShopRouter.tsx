import { Routes, Route } from 'react-router-dom';
import { ProductsPage, CartPage, ProductPage, LoginPage } from '@/pages';

export const ShopRouter = () => {
    return(
        <Routes>
            <Route path='/' element={<ProductsPage/>}/>
            <Route path='account/login' element={<LoginPage/>}/>
            <Route path='cart' element={<CartPage/>} />
            <Route path=':id' element={<ProductPage/>}/>
        </Routes>
    )
}