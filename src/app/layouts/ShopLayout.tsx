import { Outlet } from 'react-router-dom';
import { Header } from '@/modules';

export const ShopLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};