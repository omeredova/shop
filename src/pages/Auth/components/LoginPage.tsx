import { AuthForm } from '@/pages';
import { LoginRequest, useLoginMutation } from '@/pages/Auth';

export const LoginPage = () => {

    const [login ] = useLoginMutation();

    const handleLogin = async (values: LoginRequest) => {
        console.log('values', values)
        const response = await login(values)
        console.log(response);
    }

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
        />
    );
};