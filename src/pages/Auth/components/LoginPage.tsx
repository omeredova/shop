import { setCredentials } from '@/app/store/slices/authSlice';
import { setCartData } from '@/app/store/slices/cartSlice';
import { AuthForm } from '@/pages';
import { LoginRequest, useLoginMutation } from '@/pages/Auth';
import { useLazyGetCartByUserQuery } from '@/pages/CartPage';
import { useAppDispatch } from '@/shared';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

    const [login ] = useLoginMutation();
    const [getCartByUser ] = useLazyGetCartByUserQuery();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState(false)

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
            setError(true)
            console.log(error)
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
            error={error}
        />
    );
};