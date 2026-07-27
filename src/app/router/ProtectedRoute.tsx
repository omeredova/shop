import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/shared';

export const ProtectedRoute = () => {
    const user = useAppSelector((state) => state.auth.user);
    const location = useLocation();

    if (!user) {
        return (
            <Navigate
                to="/account/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};