import { setCartData, setCredentials, resetCart } from '@/app/store';
import { useLazyGetCartByUserQuery } from '@/pages/CartPage';
import { useAppDispatch } from '@/shared';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthForm } from '../AuthForm';
import { useLoginMutation } from '../api/authApi';
import type { LoginRequest } from '../types/auth.types';

interface LoginLocationState {
    from?: {
        pathname: string;
        search?: string;
        hash?: string;
    };
    registrationSuccess?: boolean;
}

export const LoginPage = () => {

    const [login, loginState] = useLoginMutation();
    const [getCartByUser, cartState] = useLazyGetCartByUserQuery();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state as LoginLocationState | null;
    const registrationSuccess = Boolean(
        locationState?.registrationSuccess
    );

    const handleLogin = async (values: LoginRequest) => {
        try {
            const data = await login(values).unwrap();
            dispatch(setCredentials(data));
            dispatch(resetCart());

            try {
                const cart = await getCartByUser(data.id).unwrap();

                if (cart) {
                    dispatch(setCartData(cart))
                }
            } catch (error) {
                console.error('Failed to load the cart.', error);
            }

            navigate(locationState?.from ?? '/products', {
                replace: true,
            });

        } catch (error) {
            console.error(error)
        }
    };

    return (
        <AuthForm
            title='Sign in'
            subtitle='Enter your username and password to access your account'
            buttonText='Log In'
            fields={[
                {
                    id: 'username',
                    type: 'text',
                    name: 'username',
                    placeholder: 'Enter your username',
                    label: 'Username',
                },
                {
                    id: 'password',
                    type: 'password',
                    name: 'password',
                    placeholder: 'Enter your password',
                    label: 'Password',
                },
            ]}
            initialValues={{
                username: 'emilys',
                password: 'emilyspass',
            }}
            transferText="Don't have an account?"
            transferLinkText='Sign Up'
            transferLinkPath='/account/register'
            onSubmit={handleLogin}
            error={loginState.isError}
            errorMessage="Please check your username and password."
            successMessage={
                registrationSuccess
                    ? 'Registration completed.'
                    : undefined
            }
            isLoading={loginState.isLoading || cartState.isFetching}
        />
    );
};
