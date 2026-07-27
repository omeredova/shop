import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
    MemoryRouter,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import authReducer, { setCredentials } from '../store/slices/authSlice';
import { ProtectedRoute } from './ProtectedRoute';

const CurrentLocation = () => {
    const location = useLocation();

    return (
        <p>
            {location.pathname}
            {location.state?.from?.pathname}
        </p>
    );
};

const renderRoutes = (authenticated = false) => {
    const store = configureStore({
        reducer: {
            auth: authReducer,
        },
    });

    if (authenticated) {
        store.dispatch(setCredentials({
            id: 1,
            username: 'test-user',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            gender: 'female',
            image: 'image.png',
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
        }));
    }

    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/profile']}>
                <Routes>
                    <Route
                        path="/account/login"
                        element={<CurrentLocation />}
                    />
                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/profile"
                            element={<p>Private profile</p>}
                        />
                    </Route>
                </Routes>
            </MemoryRouter>
        </Provider>
    );
};

describe('ProtectedRoute', () => {
    it('redirects a guest to login and preserves the destination', () => {
        renderRoutes();

        expect(screen.getByText('/account/login/profile')).toBeInTheDocument();
    });

    it('renders a private route for an authenticated user', () => {
        renderRoutes(true);

        expect(screen.getByText('Private profile')).toBeInTheDocument();
    });
});
