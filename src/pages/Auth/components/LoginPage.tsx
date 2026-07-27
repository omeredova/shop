import { setCartData, setCredentials } from '@/app/store';
import { useLazyGetCartByUserQuery } from '@/pages/CartPage';
import { useAppDispatch } from '@/shared';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../AuthForm';
import { useLoginMutation } from '../api/authApi';
import type { LoginRequest } from '../types/auth.types';

export const LoginPage = () => {

    const [login, loginState] = useLoginMutation();
    const [getCartByUser, cartState] = useLazyGetCartByUserQuery();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogin = async (values: LoginRequest) => {
        try {
            const data = await login(values).unwrap();
            dispatch(setCredentials(data));

            const cart = await getCartByUser(data.id).unwrap();
            // console.log('cart', cart)
            if (cart) {
                dispatch(setCartData(cart))
            }

            navigate('/products');

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
            error={loginState.isError || cartState.isError}
            isLoading={loginState.isLoading || cartState.isFetching}
        />
    );
};