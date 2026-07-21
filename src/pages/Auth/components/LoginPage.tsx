import { AuthForm } from '@/pages';

export const LoginPage = () => {

    return (
        <AuthForm
            title='Sign in'
            subtitle='Enter your username and password to access your account'
            buttonText='Log In'
            fields={[
                {
                    id: 'email',
                    type: 'email',
                    name: 'email',
                    placeholder: 'Enter your email',
                    label: 'Email Address',
                },
                {
                    id: 'password',
                    type: 'password',
                    name: 'password',
                    placeholder: 'Enter your password',
                    label: 'Password',
                },
            ]}
            transferText="Don't have an account?"
            transferLinkText='Sign Up'
            transferLinkPath='/account/register'
        />
    );
};